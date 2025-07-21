import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Playlist = sequelize.define('Playlist', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'playlists',
        timestamps: false, // altere para true se precisar de createdAt e updatedAt
    });

   Playlist.belongsToMany(models.Song, {
  through: 'playlist_songs', // 🔄 corrigido
  foreignKey: 'playlist_id',
  otherKey: 'song_id',
  as: 'songs',
});

    return Playlist
};