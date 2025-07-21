

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER
    },
    release_year: {
      type: DataTypes.INTEGER
    }
  });

  Song.associate = models => {
    Song.belongsTo(models.Album, {
      foreignKey: 'album_id',
      as: 'album'
    });

    Song.belongsToMany(models.Playlist, {
      through: 'PlaylistSongs',
      foreignKey: 'song_id',
      as: 'playlists'
    });
  };

  return Song;
};
