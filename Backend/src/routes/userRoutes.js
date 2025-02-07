// Importa o módulo express, que é um framework para construir aplicações web em Node.js
const express = require('express');
// Importa o modelo User do arquivo User.js
const User = require('../models/User');
// Importa o módulo jsonwebtoken para trabalhar com tokens JWT
const jwt = require('jsonwebtoken');

// Cria um roteador do express
const router = express.Router();

// Rota para registro de usuário
router.post('/register', async (req, res) => {
  try {
    // Cria um novo usuário com os dados do corpo da requisição
    const user = new User(req.body);
    // Salva o usuário no banco de dados
    await user.save();
    // Envia o usuário criado como resposta com status 201 (Criado)
    res.status(201).send({ user });
  } catch (error) {
    // Em caso de erro, envia uma resposta com status 400 e o erro
    res.status(400).send(error);
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  try {
    // Busca o usuário pelo email fornecido no corpo da requisição
    const user = await User.findOne({ email: req.body.email });
    // Verifica se o usuário existe e se a senha está correta
    if (!user || !(await user.checkPassword(req.body.password))) {
      // Se o login falhar, envia uma resposta com status 401 (Não autorizado) e uma mensagem de erro
      return res.status(401).send({ error: 'Login failed' });
    }
    // Gera um token JWT com o ID do usuário
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    // Envia o usuário e o token como resposta
    res.send({ user, token });
  } catch (error) {
    // Em caso de erro, envia uma resposta com status 400 e o erro
    res.status(400).send(error);
  }
});

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
