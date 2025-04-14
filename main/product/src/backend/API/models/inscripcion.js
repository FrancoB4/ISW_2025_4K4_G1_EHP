'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
    edad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inscripcion',
  });
  Inscripcion.associate = function(models) {
    Inscripcion.belongsTo(models.Horario, {
      foreignKey: 'horarioId'
    });
  };
  return Inscripcion;
};