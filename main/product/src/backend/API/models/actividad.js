import { Model, DataTypes } from 'sequelize';
export default (sequelize) => {
  class Actividad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Actividad.init({
    name: DataTypes.STRING,
    places: DataTypes.INTEGER,
    requirements:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Actividad',
    tableName: 'Actividades'
  });
  Actividad.associate = function(models) {
    Actividad.hasMany(models.Horario, {
      foreignKey: 'actividadId'
    });
  };
  return Actividad;
};