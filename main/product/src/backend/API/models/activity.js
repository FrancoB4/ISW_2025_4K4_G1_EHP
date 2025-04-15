import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Activity = sequelize.define(
    'Activity',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        places: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        terms: {
          type: DataTypes.STRING,
          allowNull: true
        },
        clothingRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Activity',
        timestamps: false    
    }
)