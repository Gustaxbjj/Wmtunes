import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Song = sequelize.define(
    'Song',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      release_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'songs',
      timestamps: false, // ajuste se quiser createdAt/updatedAt
    }
  );

Song.belongsToMany(models.Playlist, {
  through: 'playlist_songs', // 🔄 corrigido
  foreignKey: 'song_id',
  otherKey: 'playlist_id',
  as: 'playlists',
});

  return Song;
};