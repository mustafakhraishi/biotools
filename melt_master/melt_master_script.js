// Calculate the Tm of a DNA primer using the nearest neighbor model
function calculateTm() {
    // Get the values of the form inputs
    const c = document.getElementById("c").value.toUpperCase();
    const concPrimer = document.getElementById("concPrimer").value;
    const concSalt = document.getElementById("concSalt").value;
    const concMg = document.getElementById("concMg").value;
  
    // Calculate the number of Gs, Cs, As, and Ts in the primer
    const numGs = (c.match(/G/g) || []).length;
    const numCs = (c.match(/C/g) || []).length;
    const numAs = (c.match(/A/g) || []).length;
    const numTs = (c.match(/T/g) || []).length;
  
    // Calculate the percentage of Gs and Cs in the primer
    const percGsCs = (numGs + numCs) / c.length;
  
    // Calculate the enthalpy (H) and entropy (S) of the primer using the nearest neighbor model
    let h = 0;
    let s = 0;
  
    // from table at http://www.ncbi.nlm.nih.gov/pmc/articles/PMC19045/table/T2/ (SantaLucia, 1998)
    // enthalpy values
    const arrayH = {
        AA: -7.9,
        AC: -8.4,
        AG: -7.8,
        AT: -7.2,
        CA: -8.5,
        CC: -8.0,
        CG: -10.6,
        CT: -7.8,
        GA: -8.2,
        GC: -9.8,
        GG: -8.0,
        GT: -8.4,
        TA: -7.2,
        TC: -8.2,
        TG: -8.5,
        TT: -7.9
    };
    // entropy values
    const arrayS = {
        AA: -22.2,
        AC: -22.4,
        AG: -21.0,
        AT: -20.4,
        CA: -22.7,
        CC: -19.9,
        CG: -27.2,
        CT: -21.0,
        GA: -22.2,
        GC: -24.4,
        GG: -19.9,
        GT: -22.4,
        TA: -21.3,
        TC: -22.2,
        TG: -22.7,
        TT: -22.2
    };
  
    // compute new H and s based on sequence. Santalucia 1998
    for (let i = 0; i < c.length - 1; i++) {
        const subc = c.slice(i, i + 2);
        h += arrayH[subc];
        s += arrayS[subc];
      }
    
      // effect on entropy by salt correction; von Ahsen et al 1999
      // Increase of stability due to presence of Mg;
      const saltEffect = (concSalt / 1000) + ((concMg / 1000) * 140);
      // effect on entropy
      s += 0.368 * (c.length - 1) * Math.log(saltEffect);
    
      // terminal corrections. Santalucia 1998
      const firstNucleotide = c[0];
      if (firstNucleotide === "G" || firstNucleotide === "C") { h += 0.1; s += -2.8; }
      if (firstNucleotide === "A" || firstNucleotide === "T") { h += 2.3; s += 4.1; }
    
      const lastNucleotide = c[c.length - 1];
      if (lastNucleotide === "G" || lastNucleotide === "C") { h += 0.1; s += -2.8; }
      if (lastNucleotide === "A" || lastNucleotide === "T") { h += 2.3; s += 4.1; }
    
      // Calculate the Tm of the primer using the nearest neighbor model
      const tm = ((1000 * h) / (s + (1.987 * Math.log(concPrimer / 2000000000)))) - 273.15;
    
      // Return the Tm in degrees Celsius
      return tm.toFixed(2);
    }
    
    // Calculate the Tm and display it in the HTML when the submit button is clicked
    document.getElementById("submit_button").addEventListener("click", function(event) {
      event.preventDefault();
    
      // Calculate the Tm
      const tm = calculateTm();
    
      // Check if Tm is NaN or undefined
      if (isNaN(tm) || tm === undefined) {
        // If Tm is NaN or undefined, set the result to '---'
        document.getElementById("tmResult").innerHTML = "---";
      } else {
        // If Tm is valid, display the Tm in the HTML
        document.getElementById("tmResult").innerHTML = "Tm: " + tm + " °C";
      }
    });    