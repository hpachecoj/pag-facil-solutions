// Importa o módulo mongoose, que é uma biblioteca para modelar dados do MongoDB
const mongoose = require('mongoose');

// Define o esquema da transação com os campos userId, amount, currency, status e createdAt
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // O tipo do campo é ObjectId, que referencia o modelo User
    required: true, // O campo é obrigatório
    ref: 'User', // Referencia o modelo User
  },
  amount: {
    type: Number, // O tipo do campo é Number
    required: true, // O campo é obrigatório
  },
  currency: {
    type: String, // O tipo do campo é String
    required: true, // O campo é obrigatório
  },
  status: {
    type: String, // O tipo do campo é String
    enum: ['pending', 'completed', 'failed'], // O campo deve ser um desses valores
    default: 'pending', // O valor padrão é 'pending'
  },
  createdAt: {
    type: Date, // O tipo do campo é Date
    default: Date.now, // O valor padrão é a data e hora atual
  },
});

// Exporta o modelo Transaction baseado no esquema transactionSchema
module.exports = mongoose.model('Transaction', transactionSchema);
