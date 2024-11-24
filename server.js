import express from "express"; // Importa o framework Express para criar o servidor web.
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do Express para iniciar o servidor.
routes(app);

app.use(express.static("uploads"));

app.listen(3000, () => {
  // Inicia o servidor na porta 3000 e exibe uma mensagem no console.
  console.log("Servidor rodando...");
});
