var express = require('express');
var router = express.Router();
const watsonAssistant = require('../config/watsonConfig');

router.post('/', function (req, res, next) {
    var { text, context } = req.body;
    context = JSON.parse(context);
   
    const params = {
        input: { text } ,
        workspace_id: '365cd98a-c82b-4af1-b03b-b26216d5237e',

        context
    };
    
    watsonAssistant.message(
        params,
        function (err, response) {
            if (err) 
                res.json({ status: 'ERRO', data: err });
            else {
                //console.log(response);
                res.json({ status: 'OK', data: response });
            }
        }
    );
});

module.exports = router;