module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  });

  Playlist.associate = models => {
    Playlist.belongsToMany(models.Song, {
      through: 'PlaylistSongs',
      foreignKey: 'playlist_id',
      as: 'songs'
    });
  };

  return Playlist;
};

    