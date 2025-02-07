// Importa o módulo express, que é um framework para construir aplicações web em Node.js
const express = require('express');

// Importa o módulo mongoose, que é uma biblioteca para modelar dados do MongoDB
const mongoose = require('mongoose');

// Importa as rotas de usuário do arquivo userRoutes.js
const userRoutes = require('./routes/userRoutes');

// Importa as rotas de pagamento do arquivo paymentRoutes.js
const paymentRoutes = require('./routes/paymentRoutes');

// Cria uma instância do aplicativo express
const app = express();

// Define a porta em que o servidor irá escutar
const port = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Conecta ao banco de dados MongoDB usando mongoose
mongoose.connect('mongodb://localhost/payment-system', {
  useNewUrlParser: true, // Usa o novo analisador de URL do MongoDB
  useUnifiedTopology: true, // Usa o novo mecanismo de gerenciamento de conexões do MongoDB
});

// Define as rotas para usuários e pagamentos
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
