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

function formatpcrSequence1() {
    // Get the input value
    var pcrSequence1 = document.getElementById("pcrSequence-1").value;

    // Remove spaces and invalid characters
    pcrSequence1 = pcrSequence1.replace(/[^ATCG]/gi, '');

    // Convert to uppercase
    pcrSequence1 = pcrSequence1.toUpperCase();

    // Update the input value
    document.getElementById("pcrSequence-1").value = pcrSequence1;
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

function formatpcrSequence2() {
    // Get the input value
    var pcrSequence2 = document.getElementById("pcrSequence-2").value;

    // Remove spaces and invalid characters
    pcrSequence2 = pcrSequence2.replace(/[^ATCG]/gi, '');

    // Convert to uppercase
    pcrSequence2 = pcrSequence2.toUpperCase();

    // Update the input value
    document.getElementById("pcrSequence-2").value = pcrSequence2;
}



function calculatePrimer1() {
    // Get the input values
    var pcrSequence1 = document.getElementById("pcrSequence-1").value;
    var primer1 = document.getElementById("primer-1").value;

    // Calculate the length of the primer
    var primer1Length = primer1.length;

    var pcrSequence1 = document.getElementById("pcrSequence-1").value;
    var primer1 = document.getElementById("primer-1").value;

    // Initialize the mismatch count to 0
    var mismatchCount = 0;

    // Loop through each nucleotide in pcrSequence-1 and check for a mismatch
    for (var i = 0; i < pcrSequence1.length; i++) {
        var pcrNucleotide = pcrSequence1[i];
        var primerNucleotide = primer1[i];

        // Check if the nucleotides are a valid base pair (A-T or G-C)
        if ((pcrNucleotide === "A" && primerNucleotide !== "T") ||
            (pcrNucleotide === "T" && primerNucleotide !== "A") ||
            (pcrNucleotide === "G" && primerNucleotide !== "C") ||
            (pcrNucleotide === "C" && primerNucleotide !== "G")) {
            // If the nucleotides are not a valid base pair, increment the mismatch count
            mismatchCount++;
        }
    }

    // Calculate the percentage of mismatches
    let primer1Mismatch = (mismatchCount / primer1.length) * 100;


    // Calculate the GC content of the primer
    var gcCount = 0;
    for (var i = 0; i < primer1.length; i++) {
        if (primer1[i] === 'G' || primer1[i] === 'C') {
            gcCount++;
        }
    }
    var primer1GcContent = (gcCount / primer1Length) * 100;

    // Calculate the melting temperature of the primer
    var primer1Tm = 81.5 + (0.41 * primer1GcContent) - (675 / primer1Length) - primer1Mismatch;

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
        document.getElementById("primer-1-gc-content").value = primer1GcContent + ' %';
    }

    // Check if the GC content is less than 40%
    if (primer1GcContent < 40) {
        // Display the error message
        document.getElementById("primer-1-error").innerHTML = "GC content should be at least 40%";
    } else {
        // Hide the error message
        document.getElementById("primer-1-error").innerHTML = "";
    }

    // Check if the result for primer 1 GC is NaN or 0
    if (isNaN(primer1Mismatch) || primer1Mismatch == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-1-Mismatch").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-1-Mismatch").value = primer1Mismatch + ' %';
    }

    // Check if the result for primer 1 GC is NaN or 0
    if (isNaN(primer1Tm) || primer1Tm == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-1-tm").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-1-tm").value = primer1Tm + ' °C';
    }
}


function calculatePrimer2() {
    // Get the input values
    var pcrSequence2 = document.getElementById("pcrSequence-2").value;
    var primer2 = document.getElementById("primer-2").value;

    // Calculate the length of the primer
    var primer2Length = primer2.length;

    // Initialize the mismatch count to 0
    var mismatchCount = 0;

    // Loop through each nucleotide in pcrSequence-1 and check for a mismatch
    for (var i = 0; i < pcrSequence2.length; i++) {
        var pcrNucleotide = pcrSequence2[i];
        var primerNucleotide = primer2[i];

        // Check if the nucleotides are a valid base pair (A-T or G-C)
        if ((pcrNucleotide === "A" && primerNucleotide !== "T") ||
            (pcrNucleotide === "T" && primerNucleotide !== "A") ||
            (pcrNucleotide === "G" && primerNucleotide !== "C") ||
            (pcrNucleotide === "C" && primerNucleotide !== "G")) {
            // If the nucleotides are not a valid base pair, increment the mismatch count
            mismatchCount++;
        }
    }

    // Calculate the percentage of mismatches
    let primer2Mismatch = (mismatchCount / primer2.length) * 100;


    // Calculate the GC content of the primer
    var gcCount2 = 0;
    for (var i = 0; i < primer2.length; i++) {
        if (primer2[i] === 'G' || primer2[i] === 'C') {
            gcCount2++;
        }
    }
    var primer2GcContent = (gcCount2 / primer2Length) * 100;

    // Calculate the melting temperature of the primer
    var primer2Tm = 81.5 + 0.41 * primer2GcContent - 675 / primer2Length - primer2Mismatch;

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
        document.getElementById("primer-2-gc-content").value = primer2GcContent + ' %';
    }

    // Check if the GC content is less than 40%
    if (primer2GcContent < 40) {
        // Display the error message
        document.getElementById("primer-2-error").innerHTML = "GC content should be at least 40%";
    } else {
        // Hide the error message
        document.getElementById("primer-2-error").innerHTML = "";
    }

    // Check if the result for primer 2 GC is NaN or 0
    if (isNaN(primer2Mismatch) || primer2Mismatch == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-2-Mismatch").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-2-Mismatch").value = primer2Mismatch + ' %';
    }

    // Check if the result for primer 2 GC is NaN or 0
    if (isNaN(primer2Tm) || primer2Tm == 0) {
        // Set the value of the output element to "---"
        document.getElementById("primer-2-tm").value = "---";
    } else {
        // Set the value of the output element to the result
        document.getElementById("primer-2-tm").value = primer2Tm + ' °C';
    }
}