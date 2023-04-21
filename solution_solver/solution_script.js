// Function to calculate required stock solution based on user input
function calculateStock() {
    // Get user input
    var finalConc = document.getElementById("finalConc").value;
    var finalConcUnits = document.getElementById("finalConcUnits").value;
    var stockConc = document.getElementById("stockConc").value;
    var stockConcUnits = document.getElementById("stockConcUnits").value;
    var finalVol = document.getElementById("finalVol").value;
    var finalVolUnits = document.getElementById("finalVolUnits").value;
  
    // Convert final concentration, stock concentration, and final volume to M, M, and L, respectively
    finalConc = finalConc * finalConcUnits;
    stockConc = stockConc * stockConcUnits;
    finalVol = finalVol * finalVolUnits;
    
    // Check if final concentration is equal to or higher than stock concentration
    if (finalConc > stockConc) {
      // Display error message if final concentration is equal to or higher than stock concentration
      document.getElementById("errorfinalConc").innerHTML = "Final concentration must be lower than stock concentration";
      errorfinalConc.style.color = "red"; // Set the color to red
    } else {
      // Clear error message if final concentration is lower than stock concentration
      document.getElementById("errorfinalConc").innerHTML = "";
  
      // Calculate required stock solution
      var stock = finalConc / stockConc * finalVol;
    
      // Check if mass is infinite
      if (isFinite(stock)) {
        // Add appropriate unit based on mass value
        if (stock < 1e-15) {
          stock = stock * 1e18;
          var unit = " ";
        } else if (stock < 1e-12) {
          stock = stock * 1e15;
          var unit = " fl";
        } else if (stock < 1e-9) {
          stock = stock * 1e12;
          var unit = " pl";
        } else if (stock < 1e-6) {
          stock = stock * 1e9;
          var unit = " nl";
        } else if (stock < 1e-3) {
          stock = stock * 1e6;
          var unit = " μl";
        } else if (stock < 1) {
          stock = stock * 1e3;
          var unit = " ml";
        } else {
          var unit = "L";
        }
        // Display result
        document.getElementById("result3").innerHTML = stock + unit;
      } else {
        document.getElementById("result3").innerHTML = "---";
      }
    }
  }
  