function sanitizeInput(input) {
    input = input.toUpperCase();
    input = input.replace(/[0-9]/g, '');
    input = input.replace(/[^A-Z ]/g, '');
    return input;
  }
  
  function calculateBasicTm() {
    const input = document.getElementById("sequence").value;
    const sanitizedInput = sanitizeInput(input);
    let sequence = sanitizedInput;
  
    const wA = (sequence.match(/A/g) || []).length;
    const xT = (sequence.match(/T/g) || []).length;
    const yG = (sequence.match(/G/g) || []).length;
    const zC = (sequence.match(/C/g) || []).length;
  
    let tm;
    if (sequence.length < 14) {
      tm = (wA + xT) * 2 + (yG + zC) * 4;
    } else {
      tm = 64.9 + 41 * (yG + zC - 16.4) / (wA + xT + yG + zC);
    }
  
    if (isNaN(tm) || !isFinite(tm)) {
      document.getElementById("tm").innerHTML = "---";
    } else {
      document.getElementById("tm").innerHTML = tm.toFixed(2) + " °C";
    }
    document.getElementById("length").innerHTML = sequence.length;
  }
  
  function calculateTm() {
    const input = document.getElementById("sequence").value;
    const sanitizedInput = sanitizeInput(input);
    let sequence = sanitizedInput;
    const sodiumConcentration = document.getElementById("sodiumConcentration").value;
  
    const wA = (sequence.match(/A/g) || []).length;
    const xT = (sequence.match(/T/g) || []).length;
    const yG = (sequence.match(/G/g) || []).length;
    const zC = (sequence.match(/C/g) || []).length;
  
    let tm;
    if (sequence.length < 14) {
      tm = (wA + xT) * 2 + (yG + zC) * 4 - 16.6 * Math.log10(0.050) + 16.6 * Math.log10(sodiumConcentration);
    } else {
      tm = 100.5 + (41 * (yG + zC) / (wA + xT + yG + zC)) - (820 / (wA + xT + yG + zC)) + 16.6 * Math.log10(sodiumConcentration);
    }
  
    if (isNaN(tm) || !isFinite(tm)) {
      document.getElementById("saTm").innerHTML = "---";
    } else {
      document.getElementById("saTm").innerHTML = tm.toFixed(2) + " °C";
    }
    document.getElementById("length").innerHTML = sequence.length;
  }  