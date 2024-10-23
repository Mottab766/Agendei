import serviceDoctor from "../services/service.doctor.js"; // Inclua a extensão .js

async function Listar(req, res) {
    try {
        const name = req.query.name;
        console.log('Parâmetro recebido no controlador:', name);
        const doctors = await serviceDoctor.Listar(name);

        console.log('Resultados obtidos no controlador:', doctors);

        if (doctors && doctors.length > 0) {
            res.status(200).json(doctors);
        } else {
            res.status(200).json({ message: 'Nenhum médico encontrado' });
        }
    } catch (error) {
        console.error('Erro ao listar médicos:', error.message);
        res.status(500).json({ error: 'Erro ao listar médicos', details: error.message });
    }
}


async function InserirDoc(req, res) {
    console.log('Corpo da requisição:', req.body); // Log do corpo da requisição
    if (!req.body) {
        console.error('O corpo da requisição está indefinido');
        return res.status(400).json({ message: 'Corpo da requisição está indefinido' });
    }

    const { name, specialty, icon } = req.body;

    if (!name || !specialty || !icon) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
    }

    try {
        const doctor = await serviceDoctor.Inserir(name, specialty, icon);
        res.status(201).json(doctor); // Retorna o novo médico inserido
    } catch (error) {
        console.error('Erro ao inserir médico:', error.message); // Log de erro
        res.status(500).json({ message: 'Erro ao inserir médico', error: error.message });
    }
}

async function Editar(req, res) {

    const id_doctor = req.params.id_doctor;
    const { name, specialty, icon } = req.body;

    const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);

    res.status(200).json(doctor);
}

async function Excluir(req, res) {

    const id_doctor = req.params.id_doctor;

    const doctor = await serviceDoctor.Excluir(id_doctor);

    res.status(200).json(doctor);
}

async function ListarServicos(req, res) {

    const id_doctor = req.params.id_doctor;
    const serv = await serviceDoctor.ListarServicos(id_doctor);

    res.status(200).json(serv);
}

export default { Listar, InserirDoc, Editar, Excluir, ListarServicos }