import  {query}  from "../database/db.js"; // Certifique-se de que está importando corretamente

// Função para listar médicos com filtro por nome
async function listarDoctors(name) {
    let filtro = [];
    let sql = "SELECT * FROM doctors ";

    if (name) {
        sql += "WHERE name ILIKE $1 ";
        filtro.push('%' + name + '%');
    }

    sql += "ORDER BY name";

    try {
        console.log('Executando SQL no repositório:', sql, 'com filtro:', filtro);
        const result = await query(sql, filtro);
        console.log('Resultado no repositório:', result); // Log para depuração
        return result;
    } catch (error) {
        console.error('Erro ao listar médicos no repositório:', error.message);
        throw error;
    }
}

// Função para inserir um novo médico
async function InserirDoctors(name, specialty, icon) {

    let sql = `INSERT INTO doctors(name, specialty, icon) 
               VALUES($1, $2, $3)
               RETURNING id_doctor`;

        // Chamada para a função query
        const doctor = await query(sql, [name, specialty, icon]);
        return doctor; // Retorna o ID do médico inserido
    }


// Função para editar um médico existente
async function EditarDoctors(id_doctor, name, specialty, icon) {
    let sql = `UPDATE doctors 
               SET name=$1, specialty=$2, icon=$3
               WHERE id_doctor = $4`;
    try {
        await query(sql, [name, specialty, icon, id_doctor]);
        return { id_doctor }; // Retorna o id do médico editado
    } catch (error) {
        console.error('Erro ao editar médico:', error);
        throw error; // Lança o erro
    }
}

// Função para excluir um médico
async function ExcluirDoctors (id_doctor) {
    let sql = `DELETE FROM doctors WHERE id_doctor = $1`;

    try {
        await query(sql, [id_doctor]);
        return { id_doctor }; // Retorna o id do médico excluído
    } catch (error) {
        console.error('Erro ao excluir médico:', error);
        throw error; // Lança o erro
    }
}

// Função para listar serviços de um médico
async function ListarServicos(id_doctor) {
    let sql = `SELECT d.id_service, s.description, d.price
               FROM doctors_services d
               JOIN services s ON (s.id_service = d.id_service)
               WHERE d.id_doctor = $1
               ORDER BY s.description`;

    try {
        const serv = await query(sql, [id_doctor]);
        return serv.rows; // Certifique-se de retornar os dados da propriedade 'rows'
    } catch (error) {
        console.error('Erro ao listar serviços do médico:', error);
        throw error; // Lança o erro
    }
}

// Exporta todas as funções necessárias
export default { listarDoctors, InserirDoctors, EditarDoctors, ExcluirDoctors, ListarServicos };
