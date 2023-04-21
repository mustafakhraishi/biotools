function formatPrimer1() {
    // Get the input value
    var primer1 = document.getElementById("primer-1").value;

    // Remove spaces and invalid characters
    primer1 = primer1.replace(/[^ATCG]/gi, '');

    // Convert to uppercase
    primer1 = primer1.toUpperCase();

    // Update the input value
    document.getElementById("primer-1").value = primer1;
}


function formatPrimer2() {
    // Get the input value
    var primer2 = document.getElementById("primer-2").value;

    // Remove spaces and invalid characters
    primer2 = primer2.replace(/[^ATCG]/gi, '');

    // Convert to uppercase
    primer2 = primer2.toUpperCase();

    // Update the input value
    document.getElementById("primer-2").value = primer2;
}


function calculatePrimer1() {
    // Get the input values
    var primer1 = document.getElementById("primer-1").value;
    var concPrimer = document.getElementById("concPrimer").value;
    var concSalt = document.getElementById("concSalt").value;
    var concMg = document.getElementById("concMg").value;

    // Calculate the length of the primer
    var primer1Length = primer1.length;

    var primer1 = document.getElementById("primer-1").value;

    // Calculate the GC content of the primer
    var gcCount = 0;
    for (var i = 0; i < primer1.length; i++) {
        if (primer1[i] === 'G' || primer1[i] === 'C') {
            gcCount++;
        }
    }
    var primer1GcContent = (gcCount / primer1Length) * 100;

    // Calculate the number of Gs, Cs, As, and Ts in the primer
    const numGs = (primer1.match(/G/g) || []).length;
    const numCs = (primer1.match(/C/g) || []).length;
    const numAs = (primer1.match(/A/g) || []).length;
    const numTs = (primer1.match(/T/g) || []).length;

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
    for (let i = 0; i < primer1.length - 1; i++) {
        const subc = primer1.slice(i, i + 2);
        h += arrayH[subc];
        s += arrayS[subc];
    }

    // effect on entropy by salt correction; von Ahsen et al 1999
    // Increase of stability due to presence of Mg;
    const saltEffect = (concSalt / 1000) + ((concMg / 1000) * 140);
    // effect on entropy
    s += 0.368 * (primer1.length - 1) * Math.log(saltEffect);

    // terminal corrections. Santalucia 1998
    const firstNucleotide = primer1[0];
    if (firstNucleotide === "G" || firstNucleotide === "C") { h += 0.1; s += -2.8; }
    if (firstNucleotide === "A" || firstNucleotide === "T") { h += 2.3; s += 4.1; }

    const lastNucleotide = primer1[primer1.length - 1];
    if (lastNucleotide === "G" || lastNucleotide === "C") { h += 0.1; s += -2.8; }
    if (lastNucleotide === "A" || lastNucleotide === "T") { h += 2.3; s += 4.1; }

    // Calculate the Tm of the primer using the nearest neighbor model
    const primer1Tm = ((1000 * h) / (s + (1.987 * Math.log(concPrimer / 2000000000)))) - 273.15;


    // Check if the result for primer 1 length is NaN or 0
    if (isNaN(primer1Length) || primer1Length == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-1-length").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-1-length").value = primer1Length + ' nt';
    }

    // Check if the LENGTH is less than 7
    if (primer1Length < 7) {
        // Display the error message
        document.getElementById("primer-1-error-2").innerHTML = "Length should be more than 7nt";
    } else {
        // Hide the error message
        document.getElementById("primer-1-error-2").innerHTML = "";
    }

    // Check if the result for primer 1 GC is NaN or 0
    if (isNaN(primer1GcContent) || primer1GcContent == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-1-gc-content").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-1-gc-content").value = primer1GcContent.toFixed(2) + ' %';
    }

    // Check if the result for primer 1 GC is NaN or 0
    if (isNaN(primer1Tm) || primer1Tm == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-1-tm").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-1-tm").value = primer1Tm.toFixed(2) + ' °C';
    }
}



function calculatePrimer2() {
    // Get the input values
    var primer2 = document.getElementById("primer-2").value;
    var concPrimer = document.getElementById("concPrimer").value;
    var concSalt = document.getElementById("concSalt").value;
    var concMg = document.getElementById("concMg").value;

    // Calculate the length of the primer
    var primer2Length = primer2.length;

    // Calculate the GC content of the primer
    var gcCount2 = 0;
    for (var i = 0; i < primer2.length; i++) {
        if (primer2[i] === 'G' || primer2[i] === 'C') {
            gcCount2++;
        }
    }
    var primer2GcContent = (gcCount2 / primer2Length) * 100;

    // Calculate the number of Gs, Cs, As, and Ts in the primer
    const numGs = (primer2.match(/G/g) || []).length;
    const numCs = (primer2.match(/C/g) || []).length;
    const numAs = (primer2.match(/A/g) || []).length;
    const numTs = (primer2.match(/T/g) || []).length;

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
    for (let i = 0; i < primer2.length - 1; i++) {
        const subc = primer2.slice(i, i + 2);
        h += arrayH[subc];
        s += arrayS[subc];
    }

    // effect on entropy by salt correction; von Ahsen et al 1999
    // Increase of stability due to presence of Mg;
    const saltEffect = (concSalt / 1000) + ((concMg / 1000) * 140);
    // effect on entropy
    s += 0.368 * (primer2.length - 1) * Math.log(saltEffect);

    // terminal corrections. Santalucia 1998
    const firstNucleotide = primer2[0];
    if (firstNucleotide === "G" || firstNucleotide === "C") { h += 0.1; s += -2.8; }
    if (firstNucleotide === "A" || firstNucleotide === "T") { h += 2.3; s += 4.1; }

    const lastNucleotide = primer2[primer2.length - 1];
    if (lastNucleotide === "G" || lastNucleotide === "C") { h += 0.1; s += -2.8; }
    if (lastNucleotide === "A" || lastNucleotide === "T") { h += 2.3; s += 4.1; }

    // Calculate the Tm of the primer using the nearest neighbor model
    const primer2Tm = ((1000 * h) / (s + (1.987 * Math.log(concPrimer / 2000000000)))) - 273.15;


    // Check if the result for primer 2 length is NaN or 0
    if (isNaN(primer2Length) || primer2Length == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-2-length").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-2-length").value = primer2Length + ' nt';
    }
    // Check if the LENGTH is less than 7
    if (primer2Length < 7) {
        // Display the error message
        document.getElementById("primer-2-error-2").innerHTML = "Length should be more than 7nt";
    } else {
        // Hide the error message
        document.getElementById("primer-2-error-2").innerHTML = "";
    }


    // Check if the result for primer 2 GC is NaN or 0
    if (isNaN(primer2GcContent) || primer2GcContent == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-2-gc-content").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-2-gc-content").value = primer2GcContent.toFixed(2) + ' %';
    }

    // Check if the result for primer 2 GC is NaN or 0
    if (isNaN(primer2Tm) || primer2Tm == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-2-tm").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-2-tm").value = primer2Tm.toFixed(2) + ' °C';
    }
}


function calculateTa() {
    // Get the Tm values for primer 1 and primer 2
    const primer1Tm = parseFloat(document.getElementById("primer-1-tm").value);
    const primer2Tm = parseFloat(document.getElementById("primer-2-tm").value);

    // Set the Tm of the primer to the lowest Tm between primer 1 and primer 2
    var tmOfPrimer = Math.min(primer1Tm, primer2Tm);

    // Get the DNA melt temperature
    const dnaMeltTemp = parseFloat(document.getElementById("dna-melt-temp").value);

    // Calculate the annealing temperature
    var ta = (0.3 * tmOfPrimer) + (0.7 * dnaMeltTemp) - 14.9;

    if (isNaN(ta)) {
        ta = "---";
    } else {
        ta = ta.toFixed(2) + ' °C';
    }
    // Set the value of the output element to the result
    document.getElementById("dna-annealing-temp").value = ta;

}