module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_year: {
      type: DataTypes.INTEGER
    }
  });

  Album.associate = models => {
    Album.hasMany(models.Song, {
      foreignKey: 'album_id',
      as: 'songs'
    });
  };

  return Album;
};