function calculateMolarity() {
    const massInput = document.getElementById("mass");
    const massUnitsInput = document.getElementById("massUnits");
    const volumeInput = document.getElementById("volume2");
    const volumeUnitsInput = document.getElementById("volumeUnits2");
    const mwInput = document.getElementById("mw2");
    const resultElement = document.getElementById("result2");
  
    let mass = massInput.value * massUnitsInput.value;
    let volume = volumeInput.value * volumeUnitsInput.value;
    let mw = mwInput.value;
    let molarity = mass / (volume * mw);
  
    let unit;
    if (molarity < 1e-15) {
      molarity *= 1e18;
      unit = " ";
    } else if (molarity < 1e-12) {
      molarity *= 1e15;
      unit = " fM";
    } else if (molarity < 1e-9) {
      molarity *= 1e12;
      unit = " pM";
    } else if (molarity < 1e-6) {
      molarity *= 1e9;
      unit = " nM";
    } else if (molarity < 1e-3) {
      molarity *= 1e6;
      unit = " μM";
    } else if (molarity < 1) {
      molarity *= 1e3;
      unit = " mM";
    } else {
      unit = "M";
    }
  
    if (isFinite(molarity)) {
      resultElement.innerHTML = molarity + unit;
    } else {
      resultElement.innerHTML = "---";
    }
  }
  
  document.getElementById("mass").addEventListener("input", calculateMolarity);
  document.getElementById("massUnits").addEventListener("input", calculateMolarity);
  document.getElementById("volume2").addEventListener("input", calculateMolarity);
  document.getElementById("volumeUnits2").addEventListener("input", calculateMolarity);
  document.getElementById("mw2").addEventListener("input", calculateMolarity);  