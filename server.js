import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Servidor rodando...");
});

app.get("/api", (req, res) => {
  res.status(200).send("Mensagem de boas vindas ao servidor");
});
