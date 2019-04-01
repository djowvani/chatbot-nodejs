const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const speechToText = new SpeechToTextV1({
      version: '2019-18-03',
      username: 'SEU USUARIO',
      password: 'SUA SENHA',
      url: 'https://stream.watsonplatform.net/speech-to-text/api',
  });
 module.exports = speechToText;