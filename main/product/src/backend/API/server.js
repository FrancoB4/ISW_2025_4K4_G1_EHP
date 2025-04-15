import { db_init } from "./config/db_init.js";
import app from "./app.js";
import { sequelize } from "./config/db.js";

import { Activity } from "./models/activity.js";
const Actividad = new Activity(sequelize);

// Inicia el servidor
db_init().then(() => {
    app.listen(3001, () => console.log('Servidor corriendo en http://localhost:3001'));
});