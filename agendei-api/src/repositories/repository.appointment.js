import { query } from "../database/db.js"; // Importando a função de consulta do PostgreSQL

async function Listar(id_user) {
    // Definindo a consulta SQL para listar os agendamentos
    let sql = `
        SELECT a.id_appointment, s.description AS service, 
               d.name AS doctor, d.specialty,
               a.booking_date, a.booking_hour, u.name AS user, ds.price
        FROM appointments a
        JOIN services s ON (s.id_service = a.id_service)
        JOIN doctors d ON (d.id_doctor = a.id_doctor)
        JOIN users u ON (u.id_user = a.id_user)
        JOIN doctors_services ds ON (ds.id_doctor = a.id_doctor AND 
                                      ds.id_service = a.id_service)
        WHERE a.id_user = $1
        ORDER BY a.booking_date, a.booking_hour;
    `;

    // Executando a consulta passando o id_user como parâmetro
    const appointments = await query(sql, [id_user]);

    return appointments;
}

async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {
    // Definindo a consulta SQL para inserir um novo agendamento
    let sql = `
        INSERT INTO appointments(id_user, id_doctor, id_service, booking_date, booking_hour) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING id_appointment;
    `;

    // Executando a consulta e passando os parâmetros como um array
    const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);

    return appointment[0];
}

export default { Listar, Inserir };
