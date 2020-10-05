(function (window, document, orderTotal, shippingTotal) {
  window.twb = {};
  function getDonateAmount(shippingTotal) {
    return Math.max(2, shippingTotal / 2);
  }

  function isSaviour() {
    return Boolean(document.querySelector("#tims-wonder-button input:checked"));
  }

  function removeButton(docuemnt) {
    document.querySelector("#tims-wonder-button").remove();
  }

  window.twb.donateAmount = getDonateAmount(shippingTotal);
  const buttonHtml = `
  <div id="tims-wonder-button">
  <style>
    .tims-button__container {
      position: fixed;
      bottom: 3%;
      right: 3%;
      background: darkgreen;
      max-width: 10rem;
      padding: 0.5rem;
      margin: 1rem;
      transition: height 1s;
      z-index: 10;
    }
    .tims-button__label {
      font-weight: 700;
    }

    .tims-button__explainer {
      height: 0;
      overflow-y: hidden;
      font-style: italic;
      font-size: 0.8rem;
      font-weight: 300;
      transition: height 1s;
    }

    .tims-button__container:hover .tims-button__explainer {
      height: auto;
    }
  </style>
  <div class="tims-button__container">
    <div class="tims-button__explainer">
      I want to give away my right for free shipping. Instead this website will
      donate ${window.twb.donateAmount} EUR to a good cause.
    </div>
    <label for="freeReturnCheckbox" class="tims-button__label"
      >Save the world !!1!</label
    >
    <input type="checkbox" id="freeReturnCheckbox" />
  </div>
</div>
  `;

  window.twb.buttonNode = document.createElement("div");
  window.twb.buttonNode.innerHTML = buttonHtml;
  document.body.appendChild(window.twb.buttonNode);

  window.twb.trackSaviour = function (transactionId) {
    twb.isSaviour = isSaviour();
    removeButton(document);

    if (!twb.isSaviour) {
      console.log("visitor is not saviour");
      return;
    }

    const saviourEndpoint = "https://postb.in/b/1601880544004-6507184333167";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", saviourEndpoint);
    xhr.send({
      tid: transactionId,
      ot: orderTotal,
      st: shippingTotal,
      da: window.twb.donateAmount,
    });
  };
})(window, document, 10, 0);
