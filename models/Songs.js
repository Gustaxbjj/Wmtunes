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

  Song.associate = (models) => {
    Song.belongsTo(models.Album, {
      foreignKey: 'album_id',
      as: 'album',
    });

    Song.belongsToMany(models.Playlist, {
      through: 'PlaylistSongs',
      foreignKey: 'song_id',
      otherKey: 'playlist_id', // sempre bom explicitar
      as: 'playlists',
    });
  };

  return Song;
};