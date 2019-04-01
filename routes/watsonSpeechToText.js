var express = require('express');
var router = express.Router();
var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' });
var upload = multer();
var speechToText = require('../config/watsonSpeechToText');

router.post('/', upload.single('audioFile'), function (req, res, next) {
    var audioStream = req.file;
    console.log(JSON.stringify(audioStream));
    
    var recognizeParams = {
        audio: audioStream.buffer,
        content_type: 'audio/wav',
        interim_results: true,
        model: 'pt-BR_BroadbandModel'
    };

    speechToText.recognize(recognizeParams, function (err, response) {
        if (err) 
            res.json({ status: 'ERRO', data: err });
        else 
            res.json({ status: 'OK', data: response });    
    });
    
});

module.exports = router;