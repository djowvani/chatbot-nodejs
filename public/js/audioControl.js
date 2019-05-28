//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

// check recording or stopping
function controlRecording(element) {
    if (element.classList.contains("recording"))
        stopRecording(element);         //stop recording
    else
        startRecording(element);        //start recording;
}

// start recording
function startRecording(element) {
    var constraints = {
        audio: true,
        video: false
    }
    // getting microphone permission
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        audioContext = new AudioContext();
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        rec.record();
        // change element class to spinning
        element.classList.add("recording");
        element.classList.remove("fa-microphone-alt");
        element.classList.add("fa-spinner");
        element.classList.add("fa-pulse");
    }).catch(function (err) {
        console.log("Erro:" + err);
    });
}

// stop recording
function stopRecording(element) {
    // change element class to mic
    element.classList.remove("recording");
    element.classList.remove("fa-spinner");
    element.classList.remove("fa-pulse");
    element.classList.add("fa-microphone-alt");
    rec.stop();
    // removing mic access
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(createDownloadLink);
    rec.exportWAV(converterVozParaTexto);
}

// create link to listen and download audio
function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');

    //name of .wav file to use during upload and download (without extendion)
    var filename = new Date().toISOString();

    //add controls to the <audio> element
    au.controls = true;
    au.src = url;

    //save to disk link
    link.href = url;
    link.download = filename + ".wav"; //download forces the browser to donwload the file using the  filename
    link.innerHTML = "Save to disk";

    //add the new audio element to li
    li.appendChild(au);

    //add the filename to the li
    li.appendChild(document.createTextNode(filename + ".wav "))

    //add the save to disk link to li
    li.appendChild(link);

    //add a space in between
    li.appendChild(document.createTextNode(" "))

    //add the li element to the ol
    recordingsList.appendChild(li);
} 