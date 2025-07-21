import { expect } from 'chai';
import { sequelize, database } from './setup.js';

describe('Consulta Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar uma Playlist válida', async () => {
    const Playlist = await database.Playlist.create({
        name: 'Playlist Teste',
        descripition: 'Qualquer descrição',
    });
    expect(Playlist).to.have.property('id');
  });


  it('Não deve um Playlist sem nome', async () => {
    try {
      await database.Playlist.create({});
      expect.fail('Deveria falhar');
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
    }
  });
});