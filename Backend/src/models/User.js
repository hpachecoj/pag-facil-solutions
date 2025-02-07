// Importa o módulo mongoose, que é uma biblioteca para modelar dados do MongoDB
const mongoose = require('mongoose');

// Importa o módulo bcryptjs, que é uma biblioteca para hashing de senhas
const bcrypt = require('bcryptjs');

// Define o esquema do usuário com os campos email, password e name
const userSchema = new mongoose.Schema({
  email: {
    type: String, // O tipo do campo é String
    required: true, // O campo é obrigatório
    unique: true, // O campo deve ser único no banco de dados
  },
  password: {
    type: String, // O tipo do campo é String
    required: true, // O campo é obrigatório
  },
  name: {
    type: String, // O tipo do campo é String
    required: true, // O campo é obrigatório
  },
});

// Middleware que é executado antes de salvar um documento no banco de dados
userSchema.pre('save', async function (next) {
  const user = this;
  // Se a senha do usuário foi modificada, faz o hash da nova senha
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next(); // Chama a próxima função middleware
});

// Método para verificar se a senha fornecida é igual à senha armazenada no banco de dados
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Exporta o modelo User baseado no esquema userSchema
module.exports = mongoose.model('User', userSchema);
