import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Inscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inscripcion.init({
    email: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inscripcion',
    tableName: 'Inscripciones'
  });
  Inscripcion.associate = function(models) {
    Inscripcion.belongsTo(models.Horario, {
      foreignKey: 'horarioId'
    });
  };
  return Inscripcion;
};