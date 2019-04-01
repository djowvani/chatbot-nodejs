const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const textToSpeech = new TextToSpeechV1({
    version: '2019-18-03',
    username: "SEU USUARIO",
    password: "SUA SENHA",
    url: 'https://stream.watsonplatform.net/text-to-speech/api'
});
module.exports = textToSpeech;