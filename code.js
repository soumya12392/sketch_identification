function setup() {
    var canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw() {
    strokeWeight(15);
    stroke(25, 43, 75);

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clearCanvas() {
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);

    document.getElementById("label").innerHTML = "Label: " + results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";

    var utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}