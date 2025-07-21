import { expect } from 'chai';
import { sequelize, database } from './setup.js';

describe('PlaylistSong', () => {
  before(async () => {
    await sequelize.sync({ force: true });

    // Criar Playlists e Songs fictícios, já que PlaylistSong depende deles
    await database.Playlists.create({ id: 1, nome: 'Favoritas' });
    await database.Songs.create({ id: 1, titulo: 'Música 1' });
  });

  it('Deve criar um vínculo válido entre playlist e música', async () => {
    const item = await database.PlaylistSong.create({
      playlist_id: 1,
      song_id: 1,
      ordem: 1
    });

    expect(item).to.have.property('id');
    expect(item.playlist_id).to.equal(1);
    expect(item.song_id).to.equal(1);
    expect(item.ordem).to.equal(1);
    expect(item.adicionada_em).to.be.instanceOf(Date);
  });

  it('Não deve criar sem playlist_id', async () => {
    try {
      await database.PlaylistSong.create({
        song_id: 1
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