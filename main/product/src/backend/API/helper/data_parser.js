import { Registration } from "../models/registration.js";

export const parseDataForRegistrationEmail = (registrations) => {
    var parsedRegistrations = [];
    for (let i = 0; i < registrations.lenght; i++) {
        const registration = registrations[i];
        let parsedRegistration = {
            name: registration.visitorName,
            dni: registration.dni,
            clothing_size: registration.clothingSize,
            age: (Date.now().getFullYear() - registration.birthdate.getFullYear())
        };
        parsedRegistrations.push(parsedRegistration);
    };
    return parsedRegistrations;
}