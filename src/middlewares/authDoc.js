async function authDocProducao(req, res, next) {
  const { senhaDigitada } = req.body;

  // Verifica se está rodando localmente ou se a rota não é /doc/
  if (req.headers.host.includes("localhost") || req.originalUrl !== "/doc/") {
    return next();
  }

  // Verifica se a senha fornecida está correta
  if (senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
    return next();
  }

  // Se a senha foi fornecida, mas está incorreta
  if (senhaDigitada) {
    return res.status(401).send(`
      <form method="post">
        <p style="color: red;">Senha Errada!</p>
        <label for="senha">Senha da documentação:</label>
        <input type="password" name="senhaDigitada" id="senhaDigitada"/>
        <button type="submit">Entrar</button>
      </form>
    `);
  }

  // Se a senha não foi fornecida
  return res.status(200).send(`
    <form method="post">
      <label for="senha">Senha da documentação:</label>
      <input type="password" name="senhaDigitada" id="senhaDigitada"/>
      <button type="submit">Entrar</button>
    </form>
  `);
}

module.exports = authDocProducao;

