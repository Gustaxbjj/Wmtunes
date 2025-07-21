import sequelize from '../config/database.js'; // conexão com banco
import Album from '../models/Album.js';
import Song from '../models/Songs.js';
import Playlist from '../models/Playlist.js';
import PlaylistSong from '../models/PlaylistSong.js';
import Usuario from '../models/Usuario.js';
import Songs from '../models/Songs.js';
// adicione aqui todos os modelos individualmente

// Inicialização dos modelos
const database = {
    Album: Album(sequelize),
    Song: Songs(sequelize),
    Playlist: Playlist(sequelize),
    PlaylistSong: PlaylistSong(sequelize),
    Usuario: Usuario(sequelize),

};

// Sincroniza o banco antes dos testes
before(async () => {
    await sequelize.sync({ force: true }); // Recria as tabelas
});

// Limpa todas as tabelas após cada teste
afterEach(async () => {
    await sequelize.truncate({ cascade: true, restartIdentity: true });
});

// Fecha a conexão após todos os testes
after(async () => {
    await sequelize.close();
});

export { sequelize, database };