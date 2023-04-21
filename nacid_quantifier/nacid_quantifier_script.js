// Get a reference to the "type" dropdown menu and the "custom-sequence-container" div
var typeDropdown = document.getElementById("type");
var customSequenceContainer = document.getElementById("custom-sequence-container");

// Add an event listener that listens for a change in the "type" dropdown menu
typeDropdown.addEventListener("change", function () {
    // Get the selected value of the "type" dropdown menu
    var selectedType = typeDropdown.value;

    // If the selected value is "custom", show the "custom-sequence-container" div
    if (selectedType == "custom") {
        customSequenceContainer.style.display = "block";
    } else {
        // Otherwise, hide the "custom-sequence-container" div
        customSequenceContainer.style.display = "none";
    }
});


document.getElementById("button").onclick = function () {
    // Get the DNA sequence from the input field
    let sequence = document.getElementById("customSequence").value;

    // Convert the sequence to uppercase
    sequence = sequence.toUpperCase();

    // Remove any spaces or other non-alphabetic characters
    sequence = sequence.replace(/ /g, "");

    // Check that the sequence only contains the characters A, C, G, and T
    if (!/^[ACGT]*$/.test(sequence)) {
        alert("The DNA sequence contains invalid characters!");
        return;
    }

    // Remove any remaining non-alphabetic characters
    sequence = sequence.replace(/[^ACGT]/g, "");

    // The sequence is now properly formatted and can be used in the calculator
    // ...
}


function calculateNucleicAcidConcentration(absorbance, pathlength, dilutionFactor, type) {

    // Set the standard concentration of nucleic acids that produces an OD260 of 1
    // based on the type of nucleic acid
    let standardConcentration;
    if (type === 'ssDNA') {
        standardConcentration = 33; // ug/ml
    } else if (type === 'dsDNA') {
        standardConcentration = 50; // ug/ml
    } else if (type === 'ssRNA') {
        standardConcentration = 40; // ug/ml
    } else if (type === 'ssOLIGO') {
        standardConcentration = 20; // ug/ml
    } else {
        return 'Invalid nucleic acid type';
    }


    // Calculate the original concentration of the nucleic acid
    const concentration = (absorbance * dilutionFactor * standardConcentration) / pathlength;

    // Calculate the extinction coefficient of the nucleic acid
    const extinctionCoefficient = (absorbance * dilutionFactor) / (concentration * pathlength);

    // Return the original concentration and extinction coefficient of the nucleic acid
    return {
        concentration: concentration,
        extinctionCoefficient: extinctionCoefficient
    };
}

function calculateSequenceConcentration(absorbance, pathlength, dilutionFactor, customSequence, customSequenceType) {

    // Calculate the molecular weight of the nucleic acid
    let molecularWeight = 0;
    let A = 0;
    let C = 0;
    let G = 0;
    let T = 0;
    for (let i = 0; i < customSequence.length; i++) {
        let nucleotide = customSequence[i];
        if (nucleotide === 'A') {
            A++;
        } else if (nucleotide === 'C') {
            C++;
        } else if (nucleotide === 'G') {
            G++;
        } else if (nucleotide === 'T') {
            T++;
        } else if (nucleotide === 'U') {
            return 'Invalid nucleotide';
        } else {
            return 'Invalid nucleotide';
        }
    }

    // Calculate the molecular weight using the number of each nucleotide
    molecularWeight = (A * 313.2) + (T * 304.2) + (C * 289.2) + (G * 329.2);

    // Set the extinction coefficient based on the type of nucleic acid
    let extinctionCoefficient;
    if (customSequenceType === 'ssDNA') {
        extinctionCoefficient = 33; // M^-1 cm^-1
    } else if (customSequenceType === 'dsDNA') {
        extinctionCoefficient = 50; // M^-1 cm^-1
    } else if (customSequenceType === 'ssRNA') {
        extinctionCoefficient = 40; // M^-1 cm^-1
    } else if (customSequenceType === 'ssOLIGO') {
        extinctionCoefficient = 20; // ug/ml

        // Initialize the extinction coefficient to 0
        extinctionCoefficient = 0;

        // Sum the nearest-neighbor values for the extinction coefficient for each base in the oligo
        for (let i = 0; i < customSequence.length; i++) {
            let nucleotide = customSequence[i];
            if (i < customSequence.length - 1) {
                let nextNucleotide = customSequence[i + 1];
                if (nucleotide === 'A' && nextNucleotide === 'A') {
                    extinctionCoefficient += 27400;
                } else if (nucleotide === 'A' && nextNucleotide === 'C') {
                    extinctionCoefficient += 21200;
                } else if (nucleotide === 'A' && nextNucleotide === 'G') {
                    extinctionCoefficient += 25200;
                } else if (nucleotide === 'A' && nextNucleotide === 'T') {
                    extinctionCoefficient += 22400;
                } else if (nucleotide === 'C' && nextNucleotide === 'A') {
                    extinctionCoefficient += 21200;
                } else if (nucleotide === 'C' && nextNucleotide === 'C') {
                    extinctionCoefficient += 14600;
                } else if (nucleotide === 'C' && nextNucleotide === 'G') {
                    extinctionCoefficient += 17600;
                } else if (nucleotide === 'C' && nextNucleotide === 'T') {
                    extinctionCoefficient += 16200;
                } else if (nucleotide === 'G' && nextNucleotide === 'A') {
                    extinctionCoefficient += 25000;
                } else if (nucleotide === 'G' && nextNucleotide === 'C') {
                    extinctionCoefficient += 18000;
                } else if (nucleotide === 'G' && nextNucleotide === 'G') {
                    extinctionCoefficient += 21600;
                } else if (nucleotide === 'G' && nextNucleotide === 'T') {
                    extinctionCoefficient += 19000;
                } else if (nucleotide === 'T' && nextNucleotide === 'A') {
                    extinctionCoefficient += 22800;
                } else if (nucleotide === 'T' && nextNucleotide === 'C') {
                    extinctionCoefficient += 15200;
                } else if (nucleotide === 'T' && nextNucleotide === 'G') {
                    extinctionCoefficient += 20000;
                } else if (nucleotide === 'T' && nextNucleotide === 'T') {
                    extinctionCoefficient += 16800;
                }
            }
        }

        // Subtract the sum of the individual extinction coefficient values for each base, excluding the first and last base
        for (let i = 1; i < customSequence.length - 1; i++) {
            let nucleotide = customSequence[i];
            if (nucleotide === 'A') {
                extinctionCoefficient -= 15400;
            } else if (nucleotide === 'C') {
                extinctionCoefficient -= 7400;
            } else if (nucleotide === 'G') {
                extinctionCoefficient -= 11500;
            } else if (nucleotide === 'T') {
                extinctionCoefficient -= 8700;
            }
        }

        extinctionCoefficient = extinctionCoefficient;
    }

    // Calculate the concentration of the nucleic acid
    const concentration = (absorbance / (extinctionCoefficient * pathlength)) * molecularWeight * dilutionFactor;

    // Return an object with the concentration and extinction coefficient
    return { concentration, extinctionCoefficient };
}

// Calculate the concentration and extinction coefficient of the nucleic acid
const customSequence = document.getElementById('customSequence').value;
const customSequenceType = document.getElementById('customSequenceType').value;
const result = calculateSequenceConcentration(absorbance, pathlength, dilutionFactor, customSequence, customSequenceType);


function calculate() {
    // Get the values from the form inputs
    const absorbance = document.getElementById('absorbance').value;
    const pathlength = document.getElementById('pathlength').value;
    const dilutionFactor = document.getElementById('dilutionFactor').value;
    const type = document.getElementById('type').value;

    let result;
    if (type === 'custom') {
        const customSequence = document.getElementById('customSequence').value;
        const customSequenceType = document.getElementById('customSequenceType').value;
        result = calculateSequenceConcentration(absorbance, pathlength, dilutionFactor, customSequence, customSequenceType);
    } else {
        result = calculateNucleicAcidConcentration(absorbance, pathlength, dilutionFactor, type);
    }

    if (isNaN(result.concentration)) {
        result.concentration = "---";
    } else {
        result.concentration = result.concentration.toFixed(3);
    }

    if (isNaN(result.extinctionCoefficient)) {
        result.extinctionCoefficient = "---";
    }

    // Display the results
    document.getElementById('concentration').innerHTML = result.concentration + " ug/ul";
    document.getElementById('extinctionCoefficient').innerHTML = result.extinctionCoefficient + " M^-1 cm^-1";
}

// Refresh
const form = document.getElementById('form');
const button = document.getElementById('button');

button.addEventListener('click', function () {
    calculate();
    form.submit();
});
