// Function to calculate required mass based on user input
function calculateMass() {
  // Get user input
  const molarity = document.getElementById("molarity").value;
  const molarityUnits = document.getElementById("molarityUnits").value;
  const volume = document.getElementById("volume").value;
  const volumeUnits = document.getElementById("volumeUnits").value;
  const mw = document.getElementById("mw").value;

  // Convert molarity and volume to M and L, respectively
  const adjustedMolarity = molarity * molarityUnits;
  const adjustedVolume = volume * volumeUnits;

  // Calculate required mass
  let mass = adjustedMolarity * adjustedVolume * mw;
  let unit = "";

  // Check if mass is finite
  if (isFinite(mass)) {
    // Add appropriate unit based on mass value
    if (mass < 1e-15) {
      mass *= 1e18;
      unit = " ";
    } else if (mass < 1e-12) {
      mass *= 1e15;
      unit = " fg";
    } else if (mass < 1e-9) {
      mass *= 1e12;
      unit = " pg";
    } else if (mass < 1e-6) {
      mass *= 1e9;
      unit = " ng";
    } else if (mass < 1e-3) {
      mass *= 1e6;
      unit = " μg";
    } else if (mass < 1) {
      mass *= 1e3;
      unit = " mg";
    } else {
      unit = "g";
    }

    // Display result with unit
    document.getElementById("result1").innerHTML = mass + unit;
  } else {
    // Display "---" if mass is infinite
    document.getElementById("result1").innerHTML = "---";
  }
}