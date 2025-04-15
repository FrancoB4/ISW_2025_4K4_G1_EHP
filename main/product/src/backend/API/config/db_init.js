import { sequelize } from "./db.js";

export async function db_init() {
    try {
        await sequelize.sync({ alter: true })
    } catch (error) {
        console.log(error)
    }
}