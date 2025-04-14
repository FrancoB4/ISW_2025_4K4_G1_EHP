import { Model, DataTypes } from "sequelize";
export default (sequelize) => {
  class Horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Horario.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Horario',
    tableName: 'Horarios'
  });
  Horario.associate = function(models) {
    Horario.belongsTo(models.Actividad, {
      foreignKey: 'actividadId'
    });
    Horario.hasMany(models.Inscripcion,{
      foreignKey: 'horarioId'
    });
  };
  return Horario;
};