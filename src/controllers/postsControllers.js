// Importa as funções para manipular os posts do banco de dados e o módulo fs para lidar com o sistema de arquivos.
import {
  getTodosPosts,
  criarPost,
  atualizarPost,
} from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts.
export async function listarPosts(req, res) {
  // Chama a função para buscar todos os posts do banco de dados.
  const posts = await getTodosPosts();
  // Envia os posts como resposta com status 200 (OK).
  res.status(200).send(posts);
}

// Função para criar um novo post.
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição.
  const novoPost = req.body;
  // Tenta criar o novo post.
  try {
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta com status 200 (OK).
    res.status(200).send(postCriado);
    // Caso ocorra algum erro, envia uma mensagem de erro com status 500 (Erro interno do servidor).
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Função para fazer upload de uma imagem e criar um novo post.
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem.
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };
  // Tenta criar o novo post e renomear a imagem.
  try {
    const postCriado = await criarPost(novoPost);
    // Constrói o novo nome da imagem com o ID do post criado.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia a imagem para o novo nome.
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta com status 200 (OK).
    res.status(200).send(postCriado);
    // Caso ocorra algum erro, envia uma mensagem de erro com status 500 (Erro interno do servidor).
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Erro na requisição" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const imagemUrl = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: imagemUrl,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado = await atualizarPost(id, post);
    // Envia o post criado como resposta com status 200 (OK).
    res.status(200).send(postCriado);
    // Caso ocorra algum erro, envia uma mensagem de erro com status 500 (Erro interno do servidor).
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
