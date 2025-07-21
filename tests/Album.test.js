    import { expect } from 'chai';
    import { sequelize, database } from './setup.js';

    
    describe('Consulta Model', () => {
    before(async () => {
        await sequelize.sync({ force: true });
    });

    it('Deve criar um album valido', async () => {
        const Album = await database.Album.create({
            name: 'Album Teste',
            artist: 'Artista Teste',
            release_year: 2023,
        });
        expect(Album).to.have.property('id');
    });


    it('Não deve um album sem nome', async () => {
        try {
        await database.Album.create({});
        expect.fail('Deveria falhar');
        } catch (err) {
        expect(err.name).to.equal('SequelizeValidationError');
        }
    });
    });