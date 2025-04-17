import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Activity } from "./activity.js";

export const Schedule = sequelize.define(
    'Schedule',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        placesLeft: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        activity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Activity, 
                key: 'id'
            }  
        },
    },
    {
        sequelize,
        modelName: 'Schedule',
        timestamps: false    
    }
);

Schedule.belongsTo(Activity, { foreignKey: 'activity_id' });
Activity.hasMany(Schedule, { foreignKey: 'activity_id', hooks: true, as: 'schedules' });