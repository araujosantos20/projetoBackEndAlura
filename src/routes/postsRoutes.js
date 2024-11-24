import express from "express"; // Importa o framework Express para criar a API.
import multer from "multer"; // Importa o módulo Multer para lidar com uploads de arquivos.
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postsControllers.js"; // Importa as funções controladoras de posts.
import cors from "cors";

const optionsCors = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const storage = multer.diskStorage({
  // Define as configurações de armazenamento para uploads.
  destination: function (req, file, cb) {
    // Define o diretório para salvar os arquivos.
    cb(null, "uploads/"); // Callback para informar o diretório de destino ("uploads/").
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo salvo.
    cb(null, file.originalname); // Callback para manter o nome original do arquivo.
  },
});

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com as configurações de armazenamento.

const routes = (app) => {
  // Função que define as rotas da API.
  app.use(express.json()); // Habilita o middleware para interpretar requisições JSON (analisar o corpo da requisição).
  app.use(cors(optionsCors));
  // Rota GET para listar todos os posts. Chama a função `listarPosts` do arquivo `postsControllers.js` para obter e retornar os posts.
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post. Chama a função `postarNovoPost` do arquivo `postsControllers.js` para receber e salvar o novo post.
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem.
  //  * Utiliza upload.single("imagem") para processar o upload de um único arquivo chamado "imagem".
  //  * Chama a função `uploadImagem` do arquivo `postsControllers.js` para salvar a imagem e o post.
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função `routes` para ser utilizada em outros arquivos.
