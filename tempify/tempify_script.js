function convertTemperature() {
    // Get the input temperature and units
    var temperature = parseFloat(document.getElementById("temperature-input").value);
    var inputUnit = document.getElementById("temperature-unit").value;
    var outputUnit = document.getElementById("output-unit").value;

    // Convert the temperature to the desired output unit
    var result;
    if (inputUnit == "kelvin" && outputUnit == "celsius") {
        result = temperature - 273.15;
    } else if (inputUnit == "kelvin" && outputUnit == "fahrenheit") {
        result = temperature * 1.8 - 459.67;
    } else if (inputUnit == "celsius" && outputUnit == "kelvin") {
        result = temperature + 273.15;
    } else if (inputUnit == "celsius" && outputUnit == "fahrenheit") {
        result = temperature * 1.8 + 32;
    } else if (inputUnit == "fahrenheit" && outputUnit == "kelvin") {
        result = ((temperature + 459.67) / 1.8);
    } else if (inputUnit == "fahrenheit" && outputUnit == "celsius") {
        result = (temperature - 32) / 1.8;
    } else if (inputUnit == "fahrenheit" && outputUnit == "fahrenheit") {
        result = temperature + 0;
    } else if (inputUnit == "celsius" && outputUnit == "celsius") {
        result = temperature + 0;
    } else if (inputUnit == "kelvin" && outputUnit == "kelvin") {
        result = temperature + 0;
    }


    // Display the result
    if (isNaN(result)) {
        document.getElementById("result").innerHTML = "---";
    } else {
        document.getElementById("result").innerHTML = result;
    }
}
