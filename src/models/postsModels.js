import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../document/dbConfig.js";

// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão obtida da variável de ambiente STRING_CONEXAO.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Executa uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array.
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabyte".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Insere um novo documento na coleção e retorna um objeto com informações sobre a inserção.
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados "imersao-instabyte".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Insere um novo documento na coleção e retorna um objeto com informações sobre a inserção.
  const objId = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: novoPost });
}
