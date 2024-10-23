import repoAppointment from "../repositories/repository.appointment.js"; // Importa o repositório

async function Listar(id_user) {
    try {
        const appointments = await repoAppointment.Listar(id_user); // Chama a função de listar do repositório
        return appointments; // Retorna os agendamentos encontrados
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error); // Log de erro
        throw error; // Propaga o erro para o controlador
    }
}

async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
    try {
        const appointment = await repoAppointment.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour); // Chama a função de inserir do repositório
        return appointment; // Retorna o agendamento criado
    } catch (error) {
        console.error('Erro ao inserir agendamento:', error); // Log de erro
        throw error; // Propaga o erro para o controlador
    }
}

export default { Listar, Inserir }; // Exporta as funções
