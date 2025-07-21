import { expect } from 'chai';
import { sequelize, database } from './setup.js';

describe('PlaylistSong', () => {
  // Sincroniza o banco antes de todos os testes
  before(async () => {
    await sequelize.sync({ force: true });
  });

  // Cria playlist e música antes de cada teste
  beforeEach(async () => {
    await database.Playlist.create({ id: 1, name: 'Favoritas' });
    await database.Song.create({ 
      id: 1, 
      title: 'Música 1',
      artist: 'Artista 1'
    });
  });

  it('Não deve criar sem playlist_id', async () => {
    try {
      await database.PlaylistSong.create({
        song_id: 1,
      });
      expect.fail('Deveria falhar');
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
    }
  });

  it('Não deve criar sem song_id', async () => {
    try {
      await database.PlaylistSong.create({
        playlist_id: 1
      });
      expect.fail('Deveria falhar');
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
    }
  });

  it('Deve aceitar ordem nula', async () => {
    const item = await database.PlaylistSong.create({
      playlist_id: 1,
      song_id: 1,
      ordem: null
    });

    expect(item.ordem).to.be.null;
  });
});