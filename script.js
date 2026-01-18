const incomer = document.getElementById("incomer");
const busbar = document.getElementById("busbar");
const meter = document.getElementById("meter");
const enclosure = document.getElementById("enclosure");

const subTotalEl = document.getElementById("subTotal");
const gstEl = document.getElementById("gstAmount");
const totalEl = document.getElementById("totalPrice");

const canvas = document.getElementById("liveCanvas");
const ctx = canvas.getContext("2d");

function price(sel) {
  return Number(sel.selectedOptions[0].dataset.price);
}

function generateQuoteNo() {
  return "PCC-" + Date.now().toString().slice(-6);
}

function drawPanel(ctxRef) {
  ctxRef.clearRect(0, 0, 300, 500);

  ctxRef.fillStyle = "#f2f2f2";
  ctxRef.fillRect(0, 0, 300, 500);

  ctxRef.fillStyle = "#fff";
  ctxRef.strokeStyle = "#000";
  ctxRef.lineWidth = 2;
  ctxRef.fillRect(30, 20, 240, 460);
  ctxRef.strokeRect(30, 20, 240, 460);

  // Busbar
  ctxRef.fillStyle = busbar.value === "CU" ? "#b87333" : "#999";
  ctxRef.fillRect(50, 40, 200, 18);

  // Incomer
  ctxRef.fillStyle = "#555";
  if (incomer.value === "ACB") {
    ctxRef.fillRect(80, 80, 140, 60);
    ctxRef.fillStyle = "#fff";
    ctxRef.fillText("ACB", 135, 115);
  } else {
    ctxRef.fillRect(100, 90, 100, 40);
    ctxRef.fillStyle = "#fff";
    ctxRef.fillText("MCCB", 125, 115);
  }

  // Meter
  ctxRef.fillStyle = "#2fa4a9";
  ctxRef.fillRect(100, 170, 100, 60);
  ctxRef.fillStyle = "#fff";
  ctxRef.fillText(meter.value === "SMART" ? "Smart Meter" : "Energy Meter", 95, 205);

  // Company Logo (text placeholder)
  ctxRef.fillStyle = "#000";
  ctxRef.font = "10px Arial";
  ctxRef.fillText("AlphaLoop Solar LLP", 170, 470);
}

function update() {
  const subTotal =
    price(incomer) +
    price(busbar) +
    price(meter) +
    price(enclosure);

  const gst = Math.round(subTotal * 0.18);
  const total = subTotal + gst;

  subTotalEl.textContent = "₹" + subTotal.toLocaleString("en-IN");
  gstEl.textContent = "₹" + gst.toLocaleString("en-IN");
  totalEl.textContent = "₹" + total.toLocaleString("en-IN");

  drawPanel(ctx);
}

[incomer, busbar, meter, enclosure].forEach(el =>
  el.addEventListener("change", update)
);

update();

/* PDF */
document.getElementById("pdfBtn").addEventListener("click", () => {
  const quoteNo = generateQuoteNo();

  document.getElementById("pdfDate").textContent =
    new Date().toLocaleDateString("en-IN");
  document.getElementById("pdfQuoteNo").textContent = quoteNo;

  document.getElementById("pdfSubTotal").textContent = subTotalEl.textContent;
  document.getElementById("pdfGST").textContent = gstEl.textContent;
  document.getElementById("pdfTotal").textContent = totalEl.textContent;

  document.getElementById("pdfBom").innerHTML = `
    <tr><td>Incomer</td><td>${incomer.selectedOptions[0].text}</td><td>₹${price(incomer)}</td></tr>
    <tr><td>Busbar</td><td>${busbar.selectedOptions[0].text}</td><td>₹${price(busbar)}</td></tr>
    <tr><td>Metering</td><td>${meter.selectedOptions[0].text}</td><td>₹${price(meter)}</td></tr>
    <tr><td>Enclosure</td><td>${enclosure.selectedOptions[0].text}</td><td>₹${price(enclosure)}</td></tr>
  `;

  document.getElementById("pdfSection").style.display = "block";
  drawPanel(document.getElementById("pdfCanvas").getContext("2d"));
  window.print();
  document.getElementById("pdfSection").style.display = "none";
});

/* Redirect */
document.getElementById("quoteBtn").addEventListener("click", () => {
  window.location.href = "https://dhruvnitdelhi.github.io/Smart-LT-Panel/";
});
