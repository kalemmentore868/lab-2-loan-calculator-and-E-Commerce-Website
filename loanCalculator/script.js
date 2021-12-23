const calculateLoan = (loanTerm, loanAmount, annualInterestRate) => {
  const numberOfPayments = loanTerm * 12;
  const monthlyInterest = annualInterestRate / 100 / 12;
  const sum = monthlyInterest + 1;
  const sumPower = Math.pow(sum, -numberOfPayments);
  const toDivide = 1 - sumPower;
  const monthlyInterestOnLoan = monthlyInterest * loanAmount;
  const monthlyInstallment = monthlyInterestOnLoan / toDivide;
  return monthlyInstallment.toFixed(2);
};

const showModal = (modal, message) => {
  const modalContent = modal.children[0];
  modalContent.innerText = message;
  modal.classList.remove("hide");
};

const validateFields = (loanAmount, loanTerm) => {
  let amountMessage = "";
  if (loanAmount == "") {
    amountMessage = "Loan Amount cannot be empty";
  } else if (loanAmount <= 0) {
    amountMessage = "Loan Amount cannot be less than or equal to 0";
  } else if (isNaN(loanAmount)) {
    amountMessage = "Loan Amount must be a valid number";
  }

  let termMessage = "";
  if (loanTerm == "") {
    termMessage = "Loan Term cannot be empty";
  } else if (loanTerm <= 0) {
    termMessage = "Loan Term cannot be less than or equal to 0";
  } else if (isNaN(loanTerm)) {
    termMessage = "Loan Term must be a valid number";
  }

  if (termMessage == "" && amountMessage != "") {
    return amountMessage;
  } else if (amountMessage == "" && termMessage != "") {
    return termMessage;
  } else if (amountMessage != "" && termMessage != "") {
    return `${amountMessage}
        ${termMessage}`;
  } else {
    return "valid";
  }
};

const main = () => {
  const loanAmountBox = document.querySelector("input[name='loan-amount']");
  const loanTermBox = document.querySelector("input[name='years']");
  const calcButton = document.querySelector("button");
  const modal = document.querySelector(".modal");

  calcButton.addEventListener("click", () => {
    const loanAmount = parseInt(loanAmountBox.value);
    const loanTerm = parseInt(loanTermBox.value);
    let message = validateFields(loanAmount, loanTerm);

    if (message == "valid") {
      const annualInterestRate = 5;

      const monthlyInstallment = calculateLoan(
        loanTerm,
        loanAmount,
        annualInterestRate
      );

      const answer = `loan amount: ${loanAmount}
        loan term: ${loanTerm}
        Annual Interest Rate: ${annualInterestRate}
        monthly Installment: ${monthlyInstallment}
        `;
      showModal(modal, answer);
    } else {
      showModal(modal, message);
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.classList.add("hide");
    }
  });
};

main();
