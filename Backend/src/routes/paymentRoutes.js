// Importa o módulo express, que é um framework para construir aplicações web em Node.js
const express = require('express');
// Importa o modelo Transaction do arquivo Transaction.js
const Transaction = require('../models/Transaction');
// Importa o módulo stripe e inicializa com a chave secreta
const stripe = require('stripe')('your-stripe-secret-key');
// Importa o middleware de autenticação
const auth = require('../middleware/auth');

// Cria um roteador do express
const router = express.Router();

// Rota para criar uma transação
router.post('/create', auth, async (req, res) => {
  try {
    // Extrai o valor e a moeda do corpo da requisição
    const { amount, currency } = req.body;
    // Cria uma nova transação com o status 'pending'
    const transaction = new Transaction({
      userId: req.user._id,
      amount,
      currency,
      status: 'pending',
    });
    // Salva a transação no banco de dados
    await transaction.save();

    // Cria uma intenção de pagamento no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos
      currency,
      metadata: { transactionId: transaction._id.toString() },
    });

    // Envia o clientSecret da intenção de pagamento como resposta
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Em caso de erro, envia uma resposta com status 400 e o erro
    res.status(400).send(error);
  }
});

// Rota para listar transações
router.get('/', auth, async (req, res) => {
  try {
    // Busca todas as transações do usuário autenticado
    const transactions = await Transaction.find({ userId: req.user._id });
    // Envia as transações como resposta
    res.send(transactions);
  } catch (error) {
    // Em caso de erro, envia uma resposta com status 400 e o erro
    res.status(400).send(error);
  }
});

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
