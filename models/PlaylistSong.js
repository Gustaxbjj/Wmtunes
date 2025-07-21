import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const PlaylistSong = sequelize.define('PlaylistSong', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Playlists',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Songs',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    ordem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Ordem da música na playlist',
    },
    adicionada_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Data em que a música foi adicionada à playlist',
    },
  }, {
    tableName: 'playlist_songs',
    timestamps: false,
  });

  return PlaylistSong;
};