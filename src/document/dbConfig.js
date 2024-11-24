import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
  // Cria uma variável para armazenar o cliente MongoDB.
  let mongoClient;

  try {
    // Cria um novo cliente MongoDB com a string de conexão fornecida.
    mongoClient = new MongoClient(stringConexao);
    console.log("Conectando ao cluster do banco de dados...");

    // Tenta estabelecer a conexão com o banco de dados.
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna o cliente MongoDB para uso em outras partes do código.
    return mongoClient;
  } catch (erro) {
    // Caso ocorra algum erro durante a conexão, exibe uma mensagem de erro no console
    // e encerra a aplicação.
    console.error("Falha na conexão com o banco!", erro);
    process.exit();
  }
}
