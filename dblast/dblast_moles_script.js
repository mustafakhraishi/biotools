function calculateMass() {

    // Get the input values
    var sequence = document.getElementById('dna-sequence').value;
    var length = document.getElementById('dna-length').value;
    var lengthUnits = document.querySelector('input[name="length-units"]:checked').value;
    var moles = document.getElementById('dna-moles').value;
  var moleUnits = document.getElementById('moles-units').value;
  
    // Convert the DNA length to base pairs if needed
    if (lengthUnits === 'kb') {
      length *= 1000;
    }
  
    // Convert the DNA moles to moles if needed
    switch (moleUnits) {
      case "mmol":
        moles *= 0.001;
        break;
      case "umol":
        moles *= 0.000001;
        break;
      case "nmol":
        moles *= 0.000000001;
        break;
      case "pmol":
        moles *= 0.000000000001;
        break;
      case "fmol":
        moles *= 0.000000000000001;
        break;
    }
  
    // Calculate the molecular weight of the dsDNA
    var molecularWeight;
    if (sequence) {
      // Calculate the exact molecular weight using the individual nucleotide weights
      molecularWeight = (sequence.length * 36.04) + 
        sequence.split('').reduce((total, nucleotide) => {
          switch (nucleotide) {
            case 'A':
              return total + 313.23;
            case 'T':
              return total + 304.21;
            case 'G':
              return total + 329.23;
            case 'C':
              return total + 289.20;
            default:
              return total;
          }
        }, 0);
    } else {
      // Calculate the average molecular weight using the base pair weight
      molecularWeight = (length * 617.96) + 36.04;
    }
  
    // Calculate the mass of the dsDNA
    var mass = moles * molecularWeight;
    var massUnits;
  
    if (mass < 1e-15) {
      mass = mass * 1e18;
      massUnits = " ag";    
    } else if (mass < 1e-12) {
      mass = mass* 1e15;
      massUnits = " fg";    
    } else if (mass < 1e-9) {
      mass = mass* 1e12;
      massUnits = " pg";    
    } else if (mass < 1e-6) {
      mass = mass* 1e9;
      massUnits = " ng";    
    } else if (mass < 1e-3) {
      mass = mass* 1e6;
      massUnits = " ug";    
    } else if (mass < 1) {
      mass = mass* 1e3;
      massUnits = " mg";    
    } else {
      massUnits = " g";
    }
  
    // Update the output elements with thecalculated values
  document.getElementById('dna-mass').innerHTML = mass.toFixed(2) + massUnits;
  document.getElementById('dna-molecular-weight').innerHTML = molecularWeight.toFixed(2) + " g/mol";
  }
  

  // Get the input element for the DNA sequence
  var sequenceInput = document.getElementById('dna-sequence');
  
  sequenceInput.addEventListener('input', function() {
    // Get the input value
    var value = sequenceInput.value;
    
    // Remove spaces and make characters uppercase
    value = value.replace(/\s/g, '').toUpperCase();
    
    // Remove invalid characters and numbers using a regular expression
    value = value.replace(/[^ACGT]/g, '');
    
    // Update the input value
    sequenceInput.value = value;
  });
  
  
  // Add an event listener to the input element that updates the DNA length when the value changes
  sequenceInput.addEventListener('input', function() {
    // Get the DNA length input element
    var lengthInput = document.getElementById('dna-length');
  
    // Set the DNA length to the number of nucleotides in the sequence
    lengthInput.value = sequenceInput.value.length;
  
    // Run the calculateMoles() and calculateMolesEnds() functions to update the results
    calculateMass();
    calculateResults();
  });
  
  // Get the input element for the DNA sequence
  var sequenceInput = document.getElementById('dna-sequence');
  
  // Add an event listener to the input element that updates the molecular weight when the value changes
  sequenceInput.addEventListener('input', function() {
    // Get the molecular weight input element
    var molecularWeightInput = document.getElementById('dna-molecular-weight');
  
    // Set the molecular weight input element to the calculated molecular weight
    molecularWeightInput.value = molecularWeight.toFixed(2) + ' g/mol';
  
    // Run the calculateMoles() and calculateResults() functions to update the results
    calculateMass();
  });
  
  // Get the input elements for the DNA length and mass
  var lengthInput = document.getElementById('dna-length');
  var massInput = document.getElementById('dna-moles');
  
  // Add event listeners to the input elements that run the calculateMoles() and calculateMolesEnds() functions when the values change
  lengthInput.addEventListener('input', calculateMass);
  massInput.addEventListener('input', calculateMass);
  
  // Get the select elements for the units and mass units
  var unitsSelect = document.getElementById('length-units');
  var massUnitsSelect = document.getElementById('moles-units');
  
  // Add event listeners to the select elements that run the calculateMoles() and calculateMolesEnds() functions when the values change
  unitsSelect.addEventListener('input', calculateMass);
  massUnitsSelect.addEventListener('input', calculateMass);  