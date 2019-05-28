const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const speechToText = new SpeechToTextV1({
      version: '2019-18-03',
      iam_apikey: 'tW6LFXalQe0hdoO2Xlb7Mz1jJQxby79GN2_dkUMgrbxz',
      url: 'https://gateway.watsonplatform.net/assistant/api',
  });
 module.exports = speechToText;