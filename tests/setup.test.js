import { expect } from 'chai';
import { sequelize, database } from './setup.js';

describe('Configuração do Ambiente de Testes - Wmtunes', () => {
  it('Deve conectar ao banco PostgreSQL', async () => {
    await sequelize.authenticate();
    expect(sequelize.config.database).to.equal('Wmtunes_test'); // substitua se seu banco tiver outro nome
  });

  it('Deve criar um usuário no banco PostgreSQL', async () => {
    const Usuario = await database.Usuario.create({
      nome: 'Usuário Teste',
      email: 'teste123@gmail.com',
      senha: 'senhaSegura123',
    });

    expect(Usuario).to.have.property('id');
    expect(Usuario.nome).to.equal('Usuário Teste');
    expect(Usuario.email).to.equal('teste123@gmail.com');
  });
});