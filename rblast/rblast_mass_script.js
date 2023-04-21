// Function to calculate the moles of dsDNA
function calculateMoles() {
    // Get the input values
    var sequence = document.getElementById('sequence').value;
    var length = document.getElementById('length').value;
    var units = document.getElementById('units').value;
    var mass = document.getElementById('mass').value;
    var massUnits = document.getElementById('mass_units').value;
    
    // Convert the DNA length to base pairs if needed
    if (units == 'kb') {
      length *= 1000;
    }
  
  // Convert the mass to grams if needed
    switch (massUnits) {
      case "mg":
        mass *= 0.001;
        break;
      case "ug":
        mass *= 0.000001;
        break;
      case "ng":
        mass *= 0.000000001;
        break;
      case "pg":
        mass *= 0.000000000001;
        break;
      case "fg":
        mass *= 0.000000000000001;
        break;
    }
  
  
    // Calculate the molecular weight of the DNA
    var molecularWeight;
    if (sequence == '') {
      // If no sequence is provided, use the average molecular weight of a base pair
      molecularWeight = (length * 321.47) + 18.02;
    } else {
      // If a sequence is provided, calculate the exact molecular weight
      molecularWeight = 0;
      for (var i = 0; i < sequence.length; i++) {
        var base = sequence[i];
        if (base == 'A') {
          molecularWeight += 313.23;
        } else if (base == 'U') {
          molecularWeight += 306.16;
        } else if (base == 'G') {
          molecularWeight += 329.23;
        } else if (base == 'C') {
          molecularWeight += 289.20;
        }
      }
      // Add the molecular weight of the 2 -OH and 2 -H groups at the ends
      molecularWeight += 18.02;
    }
  
  // Calculate the number of moles of DNA
    var moles = mass / molecularWeight;
    
    var unit;
    
      // Check if mass is infinite
    if (isFinite(moles)) {
  
  // Check the size of the moles and assign the appropriate unit
  
    } if (moles < 1e-15) {
      moles = moles * 1e18;
      var unit = " amol";    
    } else if (moles < 1e-12) {
      moles = moles* 1e15;
      var unit = " fmol";    
    } else if (moles < 1e-9) {
      moles = moles* 1e12;
      var unit = " pmol";    
    } else if (moles < 1e-6) {
      moles = moles* 1e9;
      var unit = " nmol";        
    } else if (moles < 1e-3) {
      moles = moles* 1e6;
      var unit = " umol";    
    } else if (moles < 1) {
      moles = moles* 1e3;
      var unit = " mmol";        
  } else {
      var unit = "mol";
      }
      
  
    
  // Update the output field with the result
  if (!isFinite(molecularWeight) || molecularWeight == 0) {
    document.getElementById('molecular_weight').innerHTML = '---';
  } else {
    document.getElementById('molecular_weight').innerHTML = molecularWeight.toFixed(2) + ' g/mol';
  }
    
  if (!isFinite(moles) || moles == 0) {
    document.getElementById('moles_result').innerHTML = '---';
    return;
  }
  
  document.getElementById('moles_result').innerHTML = moles.toFixed(2) + ' ' + unit;
  }
  
  
  function calculateResults() {
    // Get the input values
    var sequence = document.getElementById('sequence').value;
    var length = document.getElementById('length').value;
    var units = document.getElementById('units').value;
    var mass = document.getElementById('mass').value;
    var massUnits = document.getElementById('mass_units').value;
  
    // Convert the DNA length to base pairs if needed
    if (units == 'kb') {
      length *= 1000;
    }
  
    // Convert the mass to grams if needed
    switch (massUnits) {
      case "mg":
        mass *= 0.001;
        break;
      case "ug":
        mass *= 0.000001;
        break;
      case "ng":
        mass *= 0.000000001;
        break;
      case "pg":
        mass *= 0.000000000001;
        break;
      case "fg":
        mass *= 0.000000000000001;
        break;
    }
  
    // Calculate the molecular weight of the DNA
    var molecularWeight;
    if (sequence == '') {
      // If no sequence is provided, use the average molecular weight of a base pair
      molecularWeight = (length * 321.47) + 18.02;
    } else {
      // If a sequence is provided, calculate the exact molecular weight
      molecularWeight = 0;
      for (var i = 0; i < sequence.length; i++) {
        var base = sequence[i];
        if (base == 'A') {
          molecularWeight += 313.23;
        } else if (base == 'U') {
          molecularWeight += 306.16;
        } else if (base == 'G') {
          molecularWeight += 329.23;
        } else if (base == 'C') {
          molecularWeight += 289.20;
        }
      }
      // Add the molecular weight of the 2 -OH and 2 -H groups at the ends
      molecularWeight += 18.02;
    }
  
    // Recalculate the number of moles of DNA
    var moles = mass / molecularWeight;
  
    // Calculate the number of moles of DNA 3'/5' ends
    var ends = moles;
    
    var endUnits;
    
        // Check if mass is infinite
    if (isFinite(moles)) {
    
    // Check the size of the moles and assign the appropriate unit
  
        } if (ends < 1e-15) {
        ends = ends * 1e18;
        var endUnits = " amol";    
        } else if (ends < 1e-12) {
        ends = ends* 1e15;
        var endUnits = " fmol";    
        } else if (ends < 1e-9) {
        ends = ends* 1e12;
        var endUnits = " pmol";    
        } else if (ends < 1e-6) {
        ends = ends* 1e9;
        var endUnits = " nmol";        
        } else if (ends < 1e-3) {
        ends = ends* 1e6;
        var ends = " umol";    
        } else if (ends < 1) {
        ends = ends* 1e3;
        var endUnits = " mmol";        
    } else {
        var endUnits = "mol";
        }
  
    // Calculate the DNA copy number
    var copyNumber = moles * 6.022e23;
  
        // Update the results on the page
    if (!isFinite(copyNumber) || copyNumber == 0) {
        document.getElementById('copy_number').innerHTML = '---';
    } else {
        document.getElementById('copy_number').innerHTML = copyNumber.toExponential(2);
    }
    
        if (!isFinite(ends) || moles == 0) {
        document.getElementById('ends').innerHTML = '---';
        return;
    }
        
        document.getElementById('ends').innerHTML = ends.toFixed(4) + endUnits;
    
    }  
  
  
    // Get the input element for the DNA sequence
    var sequenceInput = document.getElementById('sequence');
    
    sequenceInput.addEventListener('input', function() {
        // Get the input value
        var value = sequenceInput.value;
        
        // Remove spaces and make characters uppercase
        value = value.replace(/\s/g, '').toUpperCase();
        
        // Remove invalid characters and numbers using a regular expression
        value = value.replace(/[^ACGU]/g, '');
        
        // Update the input value
        sequenceInput.value = value;
    });
    
    
    // Add an event listener to the input element that updates the DNA length when the value changes
    sequenceInput.addEventListener('input', function() {
        // Get the DNA length input element
        var lengthInput = document.getElementById('length');
    
        // Set the DNA length to the number of nucleotides in the sequence
        lengthInput.value = sequenceInput.value.length;
    
        // Run the calculateMoles() and calculateMolesEnds() functions to update the results
        calculateMoles();
        calculateResults();
    });
    
    // Get the input element for the DNA sequence
    var sequenceInput = document.getElementById('sequence');
    
    // Add an event listener to the input element that updates the molecular weight when the value changes
    sequenceInput.addEventListener('input', function() {
        // Get the molecular weight input element
        var molecularWeightInput = document.getElementById('molecular_weight');
    
        // Set the molecular weight input element to the calculated molecular weight
        molecularWeightInput.value = molecularWeight.toFixed(2) + ' g/mol';
    
        // Run the calculateMoles() and calculateResults() functions to update the results
        calculateMoles();
        calculateResults();
    });
    
    // Get the input elements for the DNA length and mass
    var lengthInput = document.getElementById('length');
    var massInput = document.getElementById('mass');
    
    // Add event listeners to the input elements that run the calculateMoles() and calculateMolesEnds() functions when the values change
    lengthInput.addEventListener('input', calculateMoles);
    lengthInput.addEventListener('input', calculateResults);
    massInput.addEventListener('input', calculateMoles);
    massInput.addEventListener('input', calculateResults);
    
    // Get the select elements for the units and mass units
    var unitsSelect = document.getElementById('units');
    var massUnitsSelect = document.getElementById('mass_units');
    
    // Add event listeners to the select elements that run the calculateMoles() and calculateMolesEnds() functions when the values change
    unitsSelect.addEventListener('input', calculateMoles);
    unitsSelect.addEventListener('input', calculateResults);
    massUnitsSelect.addEventListener('input', calculateMoles);
    massUnitsSelect.addEventListener('input', calculateResults);  