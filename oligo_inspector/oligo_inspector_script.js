function validateForm() {
    // Get the nucleotide type and sequence values from the form
    let nucleotideType = document.getElementById("nucleotide_type").value;
    let sequence = document.getElementById("sequence").value;
    const errorMessage = document.getElementById("error_message");
    
    // Hide the error message by default
    errorMessage.style.display = "none";
  
    // Check if the sequence is valid for the selected nucleotide type
  if (nucleotideType === "DNA") {
    // DNA consists of the nucleotides adenine, cytosine, guanine, and thymine
    const validNucleotides = /^[ACGTactg]+$/;
    if (!validNucleotides.test(sequence)) {
      // Display an error message
      errorMessage.innerHTML = "Please enter a valid DNA sequence.";
      errorMessage.style.display = "block"; // Show the error message
      errorMessage.style.color = "red"; // Set the color to red
      return false; // Prevent the form from being submitted
    }
  } else if (nucleotideType === "RNA") {
    // RNA consists of the nucleotides adenine, cytosine, guanine, and uracil
    const validNucleotides = /^[ACGUacgu]+$/;
    if (!validNucleotides.test(sequence)) {
      // Display an error message
      errorMessage.innerHTML = "Please enter a valid RNA sequence.";
      errorMessage.style.display = "block"; // Show the error message
      errorMessage.style.color = "red"; // Set the color to red
      return false; // Prevent the form from being submitted
    }
  }
  
    // Check if the sequence is empty
    if (sequence === "") {
      // Display an error message
      errorMessage.innerHTML = "Please enter a sequence.";
      errorMessage.style.display = "block"; // Show the error message
        errorMessage.style.color = "red"; // Set the color to red
   return false; // Prevent the form from being submitted
    }
    
    // Check if the sequence is too long
    if (sequence.length > 60) {
       // Display an error message
      errorMessage.innerHTML = "Please enter a sequence that is less than 60nt.";
      errorMessage.style.display = "block"; // Show the error message
         errorMessage.style.color = "red"; // Set the color to red
   return false; // Prevent the form from being submitted
    }
    
    // If no errors are detected, submit the form
    return true;
  }
  
  document.getElementById("submit_button").addEventListener("click", validateForm);
  
  
    // Get the nucleotide type select element and the sequence input element
  const nucleotideTypeSelect = document.getElementById('nucleotide_type');
  const sequenceInput = document.getElementById('sequence');
  
  // Add an event listener to the nucleotide type select element
  nucleotideTypeSelect.addEventListener('change', function() {
    // Get the selected nucleotide type
    const nucleotideType = nucleotideTypeSelect.value;
  
    // Update the placeholder text of the sequence input element based on the selected nucleotide type
  if (nucleotideType === 'Default') {
      sequenceInput.placeholder = 'Add Sequence...';
    } else if (nucleotideType === 'DNA') {
      sequenceInput.placeholder = 'Enter DNA sequence...';
    } else if (nucleotideType === 'RNA') {
      sequenceInput.placeholder = 'Enter RNA sequence...';
    }
  
    // Output the selected nucleotide type
    console.log(`Selected nucleotide type: ${nucleotideType}`);
  });
  
    
  document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
  
  const form = document.getElementById('oligoform');
  const sequenceResult = document.getElementById('sequence_result');
  
  function formatSequence(nucleotideType, sequence) {
    if (nucleotideType === 'DNA' && sequenceInput.placeholder === 'Enter DNA sequence...') {
      // Format the sequence as if it was a DNA strand
      sequence = sequence.replace(/[^ACTGactg]/g, '');
      sequence = sequence.replace(/(.{3})/g, '$1 ').trim();
      sequence = sequence.toUpperCase();
    } else if (nucleotideType === 'RNA' && sequenceInput.placeholder === 'Enter RNA sequence...') {
      // Format the sequence as if it was a RNA strand
      sequence = sequence.replace(/[^ACUGacug]/g, '');
      sequence = sequence.replace(/(.{3})/g, '$1 ').trim();
      sequence = sequence.toUpperCase();
    } else {
      // Do not format the sequence if the default option is selected
      return sequence;
    }
  
    return sequence;
  }
  
    const nucleotideType = nucleotideTypeSelect.value;
    let sequence = sequenceInput.value;
  
    sequence = formatSequence(nucleotideType, sequence);
  
    sequenceResult.innerHTML = sequence;
    });
  
  document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
  
    // Get the inputted sequence
    let sequence = document.getElementById("sequence_result").innerHTML;
  
    // Reverse the sequence
    function reverseSequence(sequence) {
      let reversedSequence = "";
      for (let i = sequence.length - 1; i >= 0; i--) {
        reversedSequence += sequence[i];
      }
      return reversedSequence;
    }
    let reversedSequence = reverseSequence(sequence);
  
    // Display the reversed sequence
    document.getElementById("reverse_sequence_result").innerHTML = reversedSequence;
  });
    
  document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
    
    // Get the input sequence
    let sequence = document.getElementById("sequence_result").innerHTML;
    
    // Remove spaces from the sequence
    sequence = sequence.replace(/ /g, '');
    
    // Get the nucleotide type
    const nucleotideType = nucleotideTypeSelect.value;
    
    // Calculate and display the total length of the sequence (excluding spaces)
    let totalLength = sequence.length;
    
    // Count the number of bases in the sequence depending on the nucleotide type
    if (nucleotideType === 'DNA') {
      let baseCounts = {
        'A': 0,
        'C': 0,
        'G': 0,
        'T': 0
      };
      for (let i = 0; i < sequence.length; i++) {
        let base = sequence[i];
        if (base in baseCounts) {
          baseCounts[base] += 1;
        }
      }
      console.log(baseCounts);
    } else if (nucleotideType === 'RNA') {
      let uCount = sequence.split('').filter(base => base === 'U').length;
      console.log(`Number of U bases: ${uCount}`);
    }
    
    document.getElementById('total_length_result').innerText = totalLength;
  });
  
  
    document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
  
    // Get the inputted sequence
    let sequence = document.getElementById("sequence_result").innerHTML;
    
  // Create a function to get the complement sequence of a nucleotide sequence
  function getComplementSequence(nucleotideType, sequence) {
    let complementSequence = "";
  
    for (let i = 0; i < sequence.length; i++) {
      let nucleotide = sequence[i];
      let complement;
  
      if (nucleotideType === 'DNA') {
        // Determine the complement of each nucleotide in the DNA sequence
        if (nucleotide === 'A') {
          complement = 'T';
        } else if (nucleotide === 'T') {
          complement = 'A';
        } else if (nucleotide === 'C') {
          complement = 'G';
        } else if (nucleotide === 'G') {
          complement = 'C';
        } else if (nucleotide === ' ') {
          complement = ' ';
        }
      } else if (nucleotideType === 'RNA') {
        // Determine the complement of each nucleotide in the RNA sequence
        if (nucleotide === 'A') {
          complement = 'U';
        } else if (nucleotide === 'U') {
          complement = 'A';
        } else if (nucleotide === 'C') {
          complement = 'G';
        } else if (nucleotide === 'G') {
          complement = 'C';
        } else if (nucleotide === ' ') {
          complement = ' ';
        }
      }
  
      complementSequence += complement;
    }
  
    return complementSequence;
  }
  
    // Format the sequence
    const nucleotideType = nucleotideTypeSelect.value;
    
    // Get the complement sequence
    let complementSequence = getComplementSequence(nucleotideType, sequence);
  
    // Display the complement sequence
    document.getElementById("complement_sequence_result").innerHTML = complementSequence;
  });
  
  document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
  
    // Get the inputted sequence
    let sequence = document.getElementById("reverse_sequence_result").innerHTML;
    
  // Create a function to get the complement sequence of the REVERSE sequence (when is also the reverse complement to the OG sequence)
  function getComplementSequence(nucleotideType, sequence) {
    let complementSequence = "";
  
    for (let i = 0; i < sequence.length; i++) {
      let nucleotide = sequence[i];
      let complement;
  
      if (nucleotideType === 'DNA') {
        // Determine the complement of each nucleotide in the DNA sequence
        if (nucleotide === 'A') {
          complement = 'T';
        } else if (nucleotide === 'T') {
          complement = 'A';
        } else if (nucleotide === 'C') {
          complement = 'G';
        } else if (nucleotide === 'G') {
          complement = 'C';
        } else if (nucleotide === ' ') {
          complement = ' ';
        }
      } else if (nucleotideType === 'RNA') {
        // Determine the complement of each nucleotide in the RNA sequence
        if (nucleotide === 'A') {
          complement = 'U';
        } else if (nucleotide === 'U') {
          complement = 'A';
        } else if (nucleotide === 'C') {
          complement = 'G';
        } else if (nucleotide === 'G') {
          complement = 'C';
        } else if (nucleotide === ' ') {
          complement = ' ';
        }
      }
  
      complementSequence += complement;
    }
  
    return complementSequence;
  }
  
    // Format the sequence
    const nucleotideType = nucleotideTypeSelect.value;
    
    // Get the complement sequence
    let complementSequence = getComplementSequence(nucleotideType, sequence);
  
    // Display the complement sequence
    document.getElementById("reverse_complement_result").innerHTML = complementSequence;
  });
  
  document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
    
    //Get the input sequence
        let sequence = document.getElementById("sequence_result").innerHTML;
  
  // Create Base Composition Function  
  function calculateBaseComposition(nucleotideType, sequence) {
    let baseCounts;
    if (nucleotideType === 'DNA') {
      baseCounts = {
        'A': 0,
        'C': 0,
        'G': 0,
        'T': 0
      };
    } else if (nucleotideType === 'RNA') {
      baseCounts = {
        'A': 0,
        'C': 0,
        'G': 0,
        'U': 0
      };
    }
  
    for (let i = 0; i < sequence.length; i++) {
      let base = sequence[i];
      if (base in baseCounts) {
        baseCounts[base] += 1;
      }
    }
  
    let baseComposition = '';
    for (const [base, count] of Object.entries(baseCounts)) {
      baseComposition += `${base}: ${count} `;
    }
  
    return baseComposition;
  }
  
      let nucleotideType = nucleotideTypeSelect.value;
      
      // Get Base composition
      let baseComposition = calculateBaseComposition(nucleotideType, sequence);
  
      // Display the base composition
      document.getElementById('base_composition_result').innerText = baseComposition;
  });
  
  document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
  
    //Get the input sequence
    let sequence = document.getElementById("sequence_result").innerHTML;
  
    // Remove spaces from the sequence
    let cleanedSequence = sequence.replace(/ /g,'');
  
    // Calculate GC Content Function
    function calculateGcContent(cleanedSequence) {
      let gcCount = 0;
      for (let i = 0; i < cleanedSequence.length; i++) {
        let base = cleanedSequence[i];
        if (base === 'G' || base === 'C') {
          gcCount++;
        }
      }
  
      let gcContent = ((gcCount / cleanedSequence.length) * 100).toFixed(2);
      return gcContent;
    }
  
    // Get GC Content
    let gcContent = calculateGcContent(cleanedSequence);
  
  // Check if Tm is NaN or undefined
  if (isNaN(gcContent) || gcContent === undefined) {
  
  // If Tm is NaN or undefined, set the result to '---'
  document.getElementById("gc_content_result").innerHTML = "---";
  
  } else {
  // If Tm is valid, display the Tm in the HTML
  document.getElementById('gc_content_result').innerText = gcContent + '%';
  }
  });
  
  document.getElementById("submit_button").addEventListener("click", function(event) {
    event.preventDefault();
    
    // Get the input sequence
    let sequence = document.getElementById("sequence_result").innerHTML;
    
    // Get the nucleotide type
    let nucleotideType = nucleotideTypeSelect.value;
    
    // Create a function to calculate the molecular weight of a nucleotide sequence
    function calculateMolecularWeight(nucleotideType, sequence) {
      let molecularWeight = 0;
      
      // Set the molecular weight of each nucleotide base based on the nucleotide type
      let baseMasses;
      if (nucleotideType === 'DNA') {
        baseMasses = {
          'A': 313.21,
          'C': 289.18,
          'G': 329.21,
          'T': 304.2
        };
      } else if (nucleotideType === 'RNA') {
        baseMasses = {
          'A': 313.21,
          'C': 289.18,
          'G': 329.21,
          'U': 306.17
        };
      }
      
      // Calculate the molecular weight by adding the molecular weights of each base
      for (let i = 0; i < sequence.length; i++) {
        let base = sequence[i];
        if (base in baseMasses) {
          molecularWeight += baseMasses[base];
        }
      }
      
      return molecularWeight;
    }
    
    // Calculate the molecular weight of the sequence
    let molecularWeight = calculateMolecularWeight(nucleotideType, sequence).toFixed(2);
    
    // Display the molecular weight
    document.getElementById('molecular_weight_result').innerText = molecularWeight;
  });