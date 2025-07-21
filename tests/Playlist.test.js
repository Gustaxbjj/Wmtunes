import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Consulta Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar uma Playlist válida', async () => {
    const Album = await db.Album.create({
        name: 'Test Album',
        artist: 'Test Artist',
        release_year: 2023,
    });
    expect(Album).to.have.property('id');
  });


  it('Não deve um album sem nome', async () => {
    try {
      await db.Especialidade.create({});
      expect.fail('Deveria falhar');
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
    }
  });
});