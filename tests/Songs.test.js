import { expect } from 'chai';
import { sequelize, database } from './setup.js';

describe('Song Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar uma música válida', async () => {
    const song = await database.Song.create({
      title: 'Let it be',
      artist: 'The Beatles',
      duration: 243,
      release_year: 1970
    });

    expect(song).to.have.property('id');
    expect(song.title).to.equal('Let it be');
    expect(song.artist).to.equal('The Beatles');
    expect(song.duration).to.equal(243);
    expect(song.release_year).to.equal(1970);
  });

  it('Não deve criar música sem título', async () => {
    try {
      await database.Song.create({
        artist: 'The Beatles',
        duration: 243,
        release_year: 1970
      });
      expect.fail('Deveria falhar por falta de título');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Não deve criar música sem artista', async () => {
    try {
      await database.Song.create({
        title: 'Let it be',
        duration: 243,
        release_year: 1970
      });
      expect.fail('Deveria falhar por falta de artista');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Deve criar música mesmo sem duração e ano de lançamento', async () => {
    const song = await database.Song.create({
      title: 'Yesterday',
      artist: 'The Beatles'

    });

    expect(song).to.have.property('id');
    expect(song.duration).to.be.null;
    expect(song.release_year).to.be.null;
  });
});