import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Registration } from "./registration.js";
import { Schedule } from "./schedule.js";

export const RegistrationDetail = sequelize.define(
    'RegistrationDetail',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        visitorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        clothingSize: {
            type: DataTypes.STRING,
            allowNull: true
        },
        registration_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Registration, 
                key: 'id'
            }  
        },
    },
    {
        sequelize,
        modelName: 'RegistrationDetail',
        timestamps: false,
        hooks: {
            afterCreate: async (registrationDetail) => {
              try {
                const registration = await Registration.findByPk(registrationDetail.registration_id);
                
                if (registration) {
                  const schedule = await Schedule.findByPk(registration.schedule_id);
      
                  if (schedule && schedule.placesLeft > 0) {
                    schedule.placesLeft -= 1;
                    await schedule.save();
                  }
                }
              } catch (error) {
                console.error("Error al actualizar placesLeft:", error);
              }
            }
          }    
    }
);

RegistrationDetail.belongsTo(Registration, { foreignKey: 'registration_id' });
Registration.hasMany(RegistrationDetail, { foreignKey: 'registration_id', hooks: true });