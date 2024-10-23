import express from "express";
import cors from "cors";
import router from "./routes.js"; // Certifique-se de que suas rotas estão prontas para usar PostgreSQL
import { db } from "./database/db.js"; // Importa a conexão com o banco de dados PostgreSQL

const app = express();

app.use(express.json()); // Permite o parsing de JSON no body das requisições

// Middleware
app.use(cors());

// Middleware para logging
app.use((req, res, next) => {
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Cabeçalhos:', req.headers);
  console.log('Corpo da requisição:', req.body); // Log do corpo da requisição

  if (req.body === undefined) {
      console.log('O corpo da requisição está indefinido. Verifique o formato do JSON enviado.');
  } else {
      console.log('Corpo da requisição recebido:', JSON.stringify(req.body));
  }

  next(); // Chama o próximo middleware
});

// Usando as rotas
app.use(router);

// Testar a conexão ao banco de dados PostgreSQL ao iniciar o servidor
db.connect()
  .then(() => {
    console.log("Conectado ao banco de dados PostgreSQL");
    
    // Inicializar o servidor apenas após a conexão com o banco de dados
    app.listen(3001, () => {
      console.log("Servidor rodando na porta: 3001");
    });
  })
  .catch(err => {
    console.error("Erro ao conectar com o banco de dados:", err.message);
  });