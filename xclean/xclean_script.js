/**
 * Formats a DNA/RNA sequence and displays it in the formatted-sequence-box element.
 * */
function formatSequence() {
    // Get the DNA sequence from the input field
    let dnaSequence = document.getElementById('dna-sequence').value;

    // Remove any characters that are not guanine, cytosine, adenine, or thymine/uracil
    let formattedSequence = dnaSequence.replace(/[^gcatu]/gi, '');

    // Add spaces every 5 nucleotides
    formattedSequence = formattedSequence.replace(/(.{5})/g, '$1 ').trim();

    // Convert the formatted sequence to uppercase
    formattedSequence = formattedSequence.toUpperCase();

    // Display the formatted sequence in the result box
    document.getElementById('formatted-sequence').innerHTML = formattedSequence;

    // Show the result box
    document.getElementById('formatted-sequence-box').style.display = 'block';
}

// Add an event listener to the "Format" button to call the formatSequence() function when the button is clicked
document.getElementById('format-button').addEventListener('click', formatSequence);
