import { Registration } from "../models/registration.js";

export const parseDataForRegistrationEmail = (registrations) => {
    let parsedRegistrations = [];
    for (let i = 0; i < registrations.length; i++) {
        const registration = registrations[i];
        const parsedRegistration = {
            name: registration.visitorName,
            dni: registration.dni,
            clothing_size: registration.clothingSize,
            age: (new Date().getFullYear() - new Date(registration.birthdate).getFullYear())
        };
        parsedRegistrations.push(parsedRegistration);
    };
    return parsedRegistrations;
}