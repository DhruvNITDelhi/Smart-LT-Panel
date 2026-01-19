/***********************
 * DOM REFERENCES
 ***********************/
const inverterRating = document.getElementById("inverterRating");
const inverterCount = document.getElementById("inverterCount");
const outputVoltage = document.getElementById("outputVoltage");
const suggestedConfig = document.getElementById("suggestedConfig");
const attachmentLink = document.getElementById("attachmentLink");

const canvas = document.getElementById("pccCanvas");
const ctx = canvas.getContext("2d");

/***********************
 * PCC LAYOUT DRAWING
 ***********************/
function drawPCCLayout(totalKW, feederCount, incomerType) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.fillRect(30, 20, 260, 470);
  ctx.strokeRect(30, 20, 260, 470);

  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText("PCC PANEL", 160, 12);

  ctx.fillStyle = "#999";
  ctx.fillRect(60, 45, 200, 16);
  ctx.fillStyle = "#000";
  ctx.fillText("MAIN BUSBAR", 160, 35);

  ctx.fillStyle = "#555";
  ctx.fillRect(90, 80, 140, 55);
  ctx.fillStyle = "#fff";
  ctx.fillText(incomerType, 160, 108);

  const startY = 160;
  const feederHeight = 35;
  const spacing = 10;

  for (let i = 0; i < Math.min(feederCount, 6); i++) {
    ctx.fillStyle = "#2fa4a9";
    ctx.fillRect(
      80,
      startY + i * (feederHeight + spacing),
      160,
      feederHeight
    );
    ctx.fillStyle = "#fff";
    ctx.fillText(
      `Inverter Feeder ${i + 1}`,
      160,
      startY + i * (feederHeight + spacing) + feederHeight / 2
    );
  }

  ctx.font = "10px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("LOOP SOLAR | Indicative Layout", 160, 485);
}

/***********************
 * CONFIGURATION LOGIC
 ***********************/
function suggestConfiguration() {
  const rating = Number(inverterRating.value);
  const count = Number(inverterCount.value);
  const voltage = Number(outputVoltage.value);

  if (!rating || !count || !voltage) {
    suggestedConfig.innerHTML =
      "<p><b>Note:</b> Please choose inverter configuration.</p>";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const totalKW = rating * count;
  const current = (totalKW * 1000) / (Math.sqrt(3) * voltage);

  const incomer =
    current < 630 ? "MCCB" :
    current < 1000 ? "ACB" :
    "ACB (High Rating)";

  suggestedConfig.innerHTML = `
    <p><b>Total Inverter Capacity:</b> ${totalKW} kW</p>
    <p><b>System Voltage:</b> ${voltage} V</p>
    <p><b>Indicative AC Current:</b> ~${Math.round(current)} A</p>
    <hr>
    <p><b>Suggested Incomer:</b> ${incomer}</p>
    <p><b>Outgoing Feeders:</b> ${count} × inverter feeders</p>
    <p style="font-size:12px;">*Indicative only</p>
  `;

  drawPCCLayout(totalKW, count, incomer);
}

[inverterRating, inverterCount, outputVoltage]
  .forEach(el => el.addEventListener("input", suggestConfiguration));

/***********************
 * FORM SUBMIT HANDLER
 ***********************/
function prepareAndSubmit() {

  // Validation
  if (!customerName.value || !customerEmail.value || !customerPhone.value) {
    alert("Please fill customer contact details.");
    return false;
  }

  // Copy values to hidden form fields
  f_customerName.value = customerName.value;
  f_customerEmail.value = customerEmail.value;
  f_customerPhone.value = customerPhone.value;
  f_customerCompany.value = customerCompany.value;

  f_projectType.value = projectType.value;
  f_plantCapacity.value = plantCapacity.value;
  f_inverterBrand.value = inverterBrand.value;
  f_inverterRating.value = inverterRating.value;
  f_inverterCount.value = inverterCount.value;
  f_voltage.value = outputVoltage.value;
  f_gridType.value = gridType.value;
  f_metering.value = metering.value;
  f_equipmentBrand.value = equipmentBrand.value;

  f_suggestedConfig.value = suggestedConfig.innerText;
  f_customNotes.value = customNotes.value;

  // ⭐ Attachment link
  f_attachmentLink.value = attachmentLink.value;

  return true; // ✅ VERY IMPORTANT
}


function handleSubmit() {
  // pehle wala kaam karwao
  const ok = prepareAndSubmit();
  if (!ok) return false;

  // success message dikhao
  document.getElementById("successBox").style.display = "block";

  // button disable (optional)
  document.getElementById("requestQuoteBtn").disabled = true;

  return true; // form iframe me submit hoga
}

