import pkg from 'pg'; // Importação padrão
const { Pool } = pkg; // Extraindo Pool do pacote

// Configuração da pool de conexões para o PostgreSQL
const pool = new Pool({
  user: 'postgres',         // Nome de usuário do seu PostgreSQL
  host: 'localhost',        // Host do PostgreSQL
  database: 'AGENDEI_BI',   // Nome do seu banco de dados
  password: 'abc,123',      // Senha do seu PostgreSQL
  port: 5432,               // Porta padrão do PostgreSQL
});

// Testar conexão ao banco de dados
pool.connect()
  .then(() => console.log("Conectado ao banco de dados PostgreSQL"))
  .catch(err => console.error("Erro ao conectar com banco:", err.message));

// Função genérica para consultas
function query(command, params, method = 'query') {
  console.log('Executando consulta:', command, 'com parâmetros:', params);
  return new Promise((resolve, reject) => {
      pool[method](command, params)
          .then((result) => {
              // Retorna todas as linhas em caso de query
              if (method === 'query') {
                  resolve(result.rows); // Retorna todas as linhas
              } else {
                  resolve(result); // Para outros métodos, retorne o resultado completo
              }
          })
          .catch((error) => {
              console.error('Erro ao executar consulta:', error);
              reject(error);
          });
  });
}

// Exporta a pool de conexões e a função de consulta
export { pool as db, query };
