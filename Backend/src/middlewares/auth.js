// Importa o módulo jsonwebtoken para trabalhar com tokens JWT
const jwt = require('jsonwebtoken');
// Importa o modelo User do arquivo User.js
const User = require('../models/User');

// Middleware de autenticação
const auth = async (req, res, next) => {
  try {
    // Obtém o token do cabeçalho da requisição e remove o prefixo 'Bearer '
    const token = req.header('Authorization').replace('Bearer ', '');
    // Decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, 'secretkey');
    // Busca o usuário no banco de dados pelo ID decodificado do token
    const user = await User.findById(decoded.userId);
    // Se o usuário não for encontrado, lança um erro
    if (!user) {
      throw new Error();
    }
    // Adiciona o usuário à requisição para que possa ser acessado em outras partes do código
    req.user = user;
    // Chama a próxima função middleware
    next();
  } catch (error) {
    // Em caso de erro, envia uma resposta com status 401 e uma mensagem de erro
    res.status(401).send({ error: 'Please authenticate' });
  }
};

// Exporta o middleware de autenticação para ser usado em outros arquivos
module.exports = auth;
