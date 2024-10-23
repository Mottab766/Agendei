import repoDoctor from "../repositories/repository.doctor.js"; // Certifique-se de que está importando corretamente

const { listarDoctors, InserirDoctors, ExcluirDoctors, EditarDoctors } = repoDoctor;


async function Listar(name) {
    try {
        const doctors = await listarDoctors(name);
        console.log('Resultado no serviço:', doctors); // Log para depuração
        return doctors;
    } catch (error) {
        console.error('Erro no serviço de listar médicos:', error);
        throw error;
    }
}

async function Inserir(req, res) {
    console.log('Corpo da requisição:', req.body); // Log do corpo da requisição
    const { name, specialty, icon } = req.body; // Extraindo os dados do corpo

    try {
        // Chama a função para inserir o médico
        const doctor = await InserirDoctors(name, specialty, icon); // Certifique-se de usar a função correta
        
        // Envia a resposta com o novo médico inserido
        res.status(201).json(doctor); 
    } catch (error) {
        console.error('Erro ao inserir médico:', error.message); // Log de erro
        res.status(500).json({ message: 'Erro ao inserir médico', error: error.message }); // Resposta de erro
    }
}


async function Editar(id_doctor, name, specialty, icon) {
    const doctor = await EditarDoctors(id_doctor, name, specialty, icon); // Chama a função de editar do repositório
    return doctor;
}

async function Excluir(id_doctor) {
    const doctor = await ExcluirDoctors(id_doctor); // Chama a função de excluir do repositório
    return doctor;
}


async function ListarServico(id_doctor) {
    try {
        const servicos = await repoDoctor.ListarServicos(id_doctor); // Chama a função do repositório
        return servicos; // Retorna os serviços
    } catch (error) {
        console.error('Erro ao listar serviços do médico:', error);
        throw error; // Propaga o erro
    }
}

export default { Listar, Inserir, Editar, Excluir, ListarServico };
