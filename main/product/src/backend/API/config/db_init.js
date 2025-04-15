import { sequelize } from "./db.js";

export async function db_init() {
    try {
        await sequelize.sync()
    } catch (error) {
        console.log(error)
    }
}