const incomer = document.getElementById("incomer");
const busbar = document.getElementById("busbar");
const meter = document.getElementById("meter");
const enclosure = document.getElementById("enclosure");
const totalPriceEl = document.getElementById("totalPrice");
const quoteBtn = document.getElementById("quoteBtn");

function calculatePrice() {
  const incomerPrice = Number(incomer.selectedOptions[0].dataset.price);
  const busbarPrice = Number(busbar.selectedOptions[0].dataset.price);
  const meterPrice = Number(meter.selectedOptions[0].dataset.price);
  const enclosurePrice = Number(enclosure.selectedOptions[0].dataset.price);

  const total = incomerPrice + busbarPrice + meterPrice + enclosurePrice;
  totalPriceEl.textContent = "₹" + total.toLocaleString("en-IN");
}

incomer.addEventListener("change", calculatePrice);
busbar.addEventListener("change", calculatePrice);
meter.addEventListener("change", calculatePrice);
enclosure.addEventListener("change", calculatePrice);

quoteBtn.addEventListener("click", () => {
  const message = `
PCC Panel Configuration:

Incomer: ${incomer.value}
Busbar: ${busbar.value}
Metering: ${meter.value}
Enclosure: ${enclosure.value}

Estimated Price: ${totalPriceEl.textContent}
`;

  alert(message);
});

// initial calculation
calculatePrice();
