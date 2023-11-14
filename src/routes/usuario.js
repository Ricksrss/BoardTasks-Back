const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const bcrypt = require('bcrypt');
const EsquemaUsuario = require('../models/usuario');
const router = express.Router();

router.post('/criar', conectarBancoDados, async function(req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { nome, email, senha } = req.body;
    
    // Criar um hash da senha
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);

    // Criar usuário no banco de dados usando o modelo EsquemaUsuario
    const respostaBD = await EsquemaUsuario.create({ nome, email, senha: senhaHash });

    res.status(200).json({
      status: 'OK',
      statusMensagem: "Usuário criado com sucesso.",
      resposta: respostaBD
    });

  } catch (error) {
    if(String(error).includes("email_1 dup key")){
      return tratarErrosEsperados(res, "Error: Já existe uma conta com este email!")
    }
    // Adicionar tratamento de erro específico para o bcrypt, se necessário
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
