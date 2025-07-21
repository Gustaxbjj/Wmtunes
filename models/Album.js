import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Album = sequelize.define(
    'Album',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      release_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'albums',
      timestamps: false, // altere para true se quiser usar createdAt/updatedAt
    }
  );

  Album.associate = (models) => {
    Album.hasMany(models.Song, {
      foreignKey: 'album_id',
      as: 'songs',
    });
  };

  return Album;
};