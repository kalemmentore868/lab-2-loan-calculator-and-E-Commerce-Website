const main = () => {
  const pantsDiv = document.querySelector("#pants-quantity");
  const shirtDiv = document.querySelector("#shirt-quantity");
  const pantsPrice = document.querySelector("#pants-price");
  const shirtPrice = document.querySelector("#shirt-price");
  const pantsQuantity = document.querySelector("#pants-quantity span");
  const shirtQuantity = document.querySelector("#shirt-quantity span");
  let pantsCount = 0;
  let shirtCount = 0;

  const calculateButton = document.querySelector("#calculate");
  const resultDivs = document.querySelectorAll(".result");

  const promoButton = document.querySelector("#promo-code");
  const modal = document.querySelector(".modal");

  pantsDiv.addEventListener("click", (event) => {
    const unitPantsPrice = 40.99;
    if (event.target.tagName == "BUTTON" && event.target.innerText == "+") {
      pantsCount++;
    } else if (
      event.target.tagName == "BUTTON" &&
      event.target.innerText == "-" &&
      pantsCount > 0
    ) {
      pantsCount--;
    }
    pantsPrice.innerText = (unitPantsPrice * pantsCount).toFixed(2);
    pantsQuantity.innerText = pantsCount;
  });

  shirtDiv.addEventListener("click", (event) => {
    const unitShirtPrice = 10.99;
    if (event.target.tagName == "BUTTON" && event.target.innerText == "+") {
      shirtCount++;
    } else if (
      event.target.tagName == "BUTTON" &&
      event.target.innerText == "-" &&
      shirtCount > 0
    ) {
      shirtCount--;
    }
    shirtPrice.innerText = (unitShirtPrice * shirtCount).toFixed(2);
    shirtQuantity.innerText = shirtCount;
  });

  calculateButton.addEventListener("click", () => {
    console.log(shirtPrice.innerText, pantsPrice.innerText);
    const subTotal =
      parseFloat(shirtPrice.innerText) + parseFloat(pantsPrice.innerText);
    const tax = subTotal * 0.13;
    total = subTotal + tax;

    resultDivs[0].innerText = `Subtotal: ${subTotal.toFixed(2)}`;
    resultDivs[1].innerText = `tax: ${tax.toFixed(2)}`;
    resultDivs[2].innerText = `total: ${total.toFixed(2)}`;
  });

  promoButton.addEventListener("click", () => {
    modal.classList.remove("hide");

    const enterCodeButton = document.querySelector("#enter-code");
    const codeField = document.querySelector("input[name='code']");
    enterCodeButton.addEventListener("click", () => {
      const codeEntered = codeField.value;
      if (codeEntered == "NOTAX") {
        const subTotal =
          parseFloat(shirtPrice.innerText) + parseFloat(pantsPrice.innerText);
        const tax = 0;
        total = subTotal + tax;
        resultDivs[0].innerText = `Subtotal: ${subTotal.toFixed(2)}`;
        resultDivs[1].innerText = `tax: ${tax.toFixed(2)}`;
        resultDivs[2].innerText = `total: ${total.toFixed(2)}`;
        modal.classList.add("hide");
      } else if (codeEntered == "FIFTYFIFTY") {
        const subTotal =
          (parseFloat(shirtPrice.innerText) +
            parseFloat(pantsPrice.innerText)) /
          2;
        const tax = subTotal * 0.13;
        total = subTotal + tax;

        resultDivs[0].innerText = `Subtotal: ${subTotal.toFixed(2)}`;
        resultDivs[1].innerText = `tax: ${tax.toFixed(2)}`;
        resultDivs[2].innerText = `total: ${total.toFixed(2)}`;
        modal.classList.add("hide");
      }
    });
  });
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.classList.add("hide");
    }
  });
};

main();
