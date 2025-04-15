import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Schedule } from "./schedule.js";

export const Registration = sequelize.define(
    'Registration',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Schedule, 
                key: 'id'
            }  
        },
    },
    {
        sequelize,
        modelName: 'Registration',
        timestamps: false    
    }
);

Registration.belongsTo(Schedule, { foreignKey: 'schedule_id' });
Schedule.hasMany(Registration, { foreignKey: 'schedule_id', hooks: true });