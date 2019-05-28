                // exibe retorno da API e recupera o contexto para o próximo diálogo
                chat.innerHTML += dados.data.output.text + '<br>';
                watsonAssistantContext = JSON.stringify(dados.data.context);

                // post para o serviço watsonTextToSpeech
                $.ajax({
                    url: 'watsonTextToSpeech',
                    type: 'post',
                    data: { texto: JSON.stringify(dados.data.output.text) },
                    // tratamento de erro do post
                    error: function (dados) {
                        console.log('Erro: ' + dados.responseText);
                        alert('Erro no processamento da API watsonTextToSpeech');
                    },
                    // tratamento de sucesso de processamento do post
                    success: function (dados) {
                        // se ocorreu algum erro no processamento da API
                        if (dados.status === 'ERRO')
                            alert('Erro: ' + dados.data);
                        // caso os dados tenham retornado com sucesso
                        else {
                            // play no audio retornado
                            var audioElement = document.createElement('audio');
                            audioElement.setAttribute('src', 'audio/audioWatson.wav');
                            audioElement.play();
                            // ao finalizar o audio, seta o atributo para vazio (evita cache)
                            audioElement.addEventListener('ended', function () {
                                audioElement.currentTime = 0;
                                audioElement.setAttribute('src', '');
                            });
                        }
                    }
                });
            }
        }
    });
}

// envia audio do usuário e converte para texto
function converterVozParaTexto(blob) {
    // criar um formulário para enviar o arquivo de audio
    var fd = new FormData();
    fd.append('audioFile', blob);
    // post para o serviço watsonSpeechToText
    $.ajax({
        url: 'watsonSpeechToText',
        type: 'post',
        data: fd,
        processData: false,
        contentType: false,
        // tratamento de erro do post
        error: function (dados) {
            alert('Erro: ' + dados.responseText);
        },
        // tratamento de sucesso de processamento do post
        success: function (dados) {
            // se ocorreu algum erro no processamento da API
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            // caso os dados tenham retornado com sucesso
            else {
                // recupera a conversão do audio em texto
                var retorno = JSON.stringify(dados.data.results[0].alternatives[0].transcript).replace(/"/g, '');
                // envia o texto do audio para obter o retorno do chat
                enviarMensagem(retorno);
            }
        }
    });