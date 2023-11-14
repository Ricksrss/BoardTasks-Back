const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const EsquemaTarefa = require('../models/tarefa');
const authUser = require('../middlewares/authUser');
const router = express.Router();

router.post('/criar',authUser,conectarBancoDados, async function(req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    let {posicao, titulo, descricao, status, dataEntrega } = req.body;
    
    // Criar usuário no banco de dados usando o modelo EsquemaUsuario
    const usuarioCriador = req.usuarioJwt.id;
    const respostaBD = await EsquemaTarefa.create({posicao, titulo, descricao, status, dataEntrega, usuarioCriador});

    res.status(200).json({
      status: 'OK',
      statusMensagem: "Tarefa criada com sucesso.",
      resposta: respostaBD
    });

  } catch (error) {
    // Adicionar tratamento de erro específico para o bcrypt, se necessário
    return tratarErrosEsperados(res, error);
  }
});


module.exports = router;
