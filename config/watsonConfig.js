const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const watsonAssistant = new AssistantV1({
    version: '2019-18-03',
    username: 'apikey',
    password: 'tW6LFXalQe0hdoO2Xlb7Mz1jJQxby79GN2_dkUMgrbxz',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});
module.exports = watsonAssistant;