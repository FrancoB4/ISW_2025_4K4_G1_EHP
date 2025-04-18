import axios from "axios";
import { formToJSON } from "axios";
import { response } from "express";

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
    axios.post
}

/**
 * 
 * @param {String} email: El email del usuario que registró las inscripciones
 * @param {Number} inscripcionId: El id de la primer inscripción de las realizadas por el usuario
 * @param {Array<D>} inscripciones: Una lista de objetos, donde cada objeto representa una inscirpción. Cada inscripción debe tener los datos: name (nombre de la persona inscripta), actividad, horario.
 * @returns la respuesta a la petición de envío de mail. Si es 200 el mail se envió correctamente, en cualquier otro caso el mail no se envió.
 */

export const sendInscriptionConfirmatioEmail = async (email, inscripcionId, inscripciones) => {
    if (!inscripciones || !email || !inscripcionId || inscripciones?.length == 0) {
        console.log('[Servicio email | Inscripciones] Error: Faltan datos obligatorios.');
        return ;
    };
    const templateParams = {
        email: email,
        inscripciones: inscripciones,
        inscripcion_id: inscripcionId
    };
    
    const response = await sendEmail(API_INSCRIPTION_TEMPLATE_ID, templateParams);
    return response;
}

const a = sendInscriptionConfirmatioEmail("francobonfigliovazquez@gmail.com", 3, [
    {name: "Franco B", actividad: "Football", horario: "10:30"},
    {name: "Franco B",actividad: "Tenis",horario: "11:30"}
]);