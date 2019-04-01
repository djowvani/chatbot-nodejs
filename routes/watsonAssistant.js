var express = require('express');
var router = express.Router();
const watsonAssistant = require('../config/watsonAssistant');

router.post('/', function (req, res, next) {
    var { text, watsonAssistantContext } = req.body;
    context = JSON.parse(watsonAssistantContext);
   
    const params = {
        input: { text } ,
        workspace_id: 'SEU WORKSPACE',
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