prediction = ""

Webcam.set({
    width: 350,
    height: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result"). innerHTML = '<img id = "captured_img" src = "' + data_uri + '">' ;
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1BYfjhnog/model.json", modelLoaded);

function modelLoaded()
{
    console.log("model loaded");
}

function speak()
{
    synth = window.speechSynthesis;
    speak_data = "The prediction is" + prediction ;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result)
{
    if (error)
    {
      console.error(error);    
    } 
    else 
    {
      console.log(result);
      document.getElementById("result_emotion_name").innerHTML = result[0].label;
      prediction = result[0].label;
      speak();

      if (result[0].label == "Nice")
      {
      document.getElementById("emoji").innerHTML = "&#128077;" ;  
      }
      
      if (result[0].label == "Victory")
      {
          document.getElementById("emoji").innerHTML = "&#9996;" ; 
      }

      if (result[0].label == "Amazing")
      {
          document.getElementById("emoji").innerHTML = "&#128076;" ;
      }
    }
}