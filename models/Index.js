import sequelize from './../config/database.js';

import AlbumModel from './Album.js'
import SongModel from './Songs.js';
import PlaylistModel from './Playlist.js';
import PlaylistSongModel from './PlaylistSong.js';
import UsuarioModel from './Usuario.js';


// Instanciação dos models
const Album = AlbumModel(sequelize)
const Song = SongModel(sequelize);
const Playlist = PlaylistModel(sequelize);
const PlaylistSong = PlaylistSongModel(sequelize);
const Usuario = UsuarioModel(sequelize)
// RELACIONAMENTOS

// Album -> Song
Album.hasMany(Song, { foreignKey: 'album_id', as: 'songs' });
Song.belongsTo(Album, { foreignKey: 'album_id', as: 'album' });

// Playlist <-> Song (Many-to-Many via PlaylistSong)
Playlist.belongsToMany(Song, {
  through: PlaylistSong,
  foreignKey: 'playlist_id',
  otherKey: 'song_id',
  as: 'songs',
});

Song.belongsToMany(Playlist, {
  through: PlaylistSong,
  foreignKey: 'song_id',
  otherKey: 'playlist_id',
  as: 'playlists',
});

// Playlist has many PlaylistSong
Playlist.hasMany(PlaylistSong, { foreignKey: 'playlist_id' });
PlaylistSong.belongsTo(Playlist, { foreignKey: 'playlist_id' });

// Song has many PlaylistSong
Song.hasMany(PlaylistSong, { foreignKey: 'song_id' });
PlaylistSong.belongsTo(Song, { foreignKey: 'song_id' });

// Exportação
export {
  sequelize,
  Album,
  Song,
  Playlist,
  PlaylistSong,
  Usuario
};
