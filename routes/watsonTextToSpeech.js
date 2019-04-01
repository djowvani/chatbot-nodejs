var express = require('express');
var router = express.Router();
var textToSpeech = require('../config/watsonTextToSpeech');
var fs = require('fs');

router.post('/', function (req, res, next) {
    var texto = req.body.texto;

    var synthesizeParams = {
        text: texto,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaVoice'
    };

    textToSpeech.synthesize(
        synthesizeParams,
        function (err, audio) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            else {
                textToSpeech.repairWavHeader(audio);
                fs.writeFileSync('public/audio/' + 'audioWatson.wav', audio);
                res.json({ status: 'OK', data: audio });
            }
        }
    );
});

module.exports = router;