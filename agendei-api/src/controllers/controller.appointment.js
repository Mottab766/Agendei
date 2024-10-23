import serviceAppointment from "../services/service.appointment.js";

async function ListarByUser(req, res) {
    const id_user = req.id_user; // Obtendo o id do usuário do request
    try {
        const appointments = await serviceAppointment.Listar(id_user); // Chamando o serviço para listar os agendamentos
        res.status(200).json(appointments); // Respondendo com os agendamentos encontrados
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao listar agendamentos' }); // Tratamento de erro
    }
}

async function Inserir(req, res) {
    const id_user = req.id_user; // Obtendo o id do usuário do request
    const { id_doctor, id_service, booking_date, booking_hour } = req.body; // Extraindo dados do corpo da requisição

    try {
        const appointment = await serviceAppointment.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour); // Chamando o serviço para inserir o agendamento
        res.status(201).json(appointment); // Respondendo com o agendamento criado
    } catch (error) {
        console.error('Erro ao inserir agendamento:', error);
        res.status(500).json({ error: 'Erro ao inserir agendamento' }); // Tratamento de erro
    }
}

export default { ListarByUser, Inserir };
