import axios from "axios";

const API_URL = "https://api.emailjs.com/api/v1.0/email/send";
const API_SERVICE_ID = "service_kc78l0c";
const API_USER_ID = "v_Q2jdm6r7xolhlW1";
const API_INSCRIPTION_TEMPLATE_ID = "template_1hqoc9n";
const API_ACCESS_TOKEN = "8KtMzzlODd6laFJiPJye-";

export const sendEmail = async (templateId, templateParams) => {
    const response = await axios.post(API_URL, {
        service_id: API_SERVICE_ID,
        template_id: templateId,
        user_id: API_USER_ID,
        accessToken: API_ACCESS_TOKEN,
        template_params: templateParams
    });
    return response;
}

/**
 * 
 * @param {String} email: El email del usuario que registró las inscripciones
 * @param {Number} registrationId: El id de la primer inscripción de las realizadas por el usuario.
 * @param {String} activity: El nombre de la actividad para la que se registra la inscripcion.
 * @param {Date} scheduleStartdate: La fecha de inicio del shcedule seleccionado para las inscripciones.
 * @param {Array<D>} registrations: Una lista de objetos, donde cada objeto representa una inscirpción. Cada inscripción debe tener los datos: name (nombre de la persona inscripta), actividad, horario.
 * @returns la respuesta a la petición de envío de mail. Si es 200 el mail se envió correctamente, en cualquier otro caso el mail no se envió.
 */

export const sendRegistrationConfirmationEmail = async (email, registrationId, activity, scheduleStartdate, registrations) => {
    if (!registrations || !email || !registrationId || registrations?.length == 0 || !activity || !scheduleStartdate) {
        console.log('[Servicio email | Inscripciones] Error: Faltan datos obligatorios.');
        return;
    };
    const templateParams = {
        email: email,
        activity: activity,
        schedule: (new Date(scheduleStartdate)).toLocaleString(),
        registrations: registrations,
        registration_id: registrationId
    };
    const response = await sendEmail(API_INSCRIPTION_TEMPLATE_ID, templateParams);
    return response;
}

// const a = sendRegistrationConfirmationEmail("francobonfigliovazquez@gmail.com", 1, "Polo", Date.now(), [
//     { name: "Ejemplo", dni: 12345678, clothing_size: "M", age: 19 },
//     { name: "Ejemplo 2", dni: 87654321, clothing_size: "L", age: 25 }
// ]);