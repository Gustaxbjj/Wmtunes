import { expect } from 'chai';
import { sequelize, database } from './setup.js';

describe('Usuario Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {

    await database.Usuario.destroy({ where: {} });
  });

  it('Deve criar um usuário válido', async () => {
    const usuario = await database.Usuario.create({
      nome: 'Matheus',
      email: 'matheus@example.com',
      senha: 'senhaSegura123'
    });

    expect(usuario).to.have.property('id');
    expect(usuario.nome).to.equal('Matheus');
    expect(usuario.email).to.equal('matheus@example.com');
  });

  it('Não deve criar usuário sem nome', async () => {
    try {
      await database.Usuario.create({
        email: 'semnome@example.com',
        senha: 'senha123'
      });
      expect.fail('Deveria falhar por ausência de nome');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Não deve criar usuário com e-mail inválido', async () => {
    try {
      await database.Usuario.create({
        nome: 'Invalido',
        email: 'email_invalido',
        senha: 'senha123'
      });
      expect.fail('Deveria falhar por e-mail inválido');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Não deve criar usuário sem senha', async () => {
    try {
      await database.Usuario.create({
        nome: 'SemSenha',
        email: 'semsenha@example.com'
      });
      expect.fail('Deveria falhar por ausência de senha');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Não deve permitir duplicação de nome', async () => {
    await database.Usuario.create({
      nome: 'Duplicado',
      email: 'um@example.com',
      senha: '123456'
    });

    try {
      await database.Usuario.create({
        nome: 'Duplicado',
        email: 'outro@example.com',
        senha: '654321'
      });
      expect.fail('Deveria falhar por nome duplicado');
    } catch (error) {
      expect(error.name).to.equal('SequelizeUniqueConstraintError');
    }
  });

  it('Não deve permitir duplicação de e-mail', async () => {
    await database.Usuario.create({
      nome: 'Usuario1',
      email: 'repetido@example.com',
      senha: 'senha123'
    });

    try {
      await database.Usuario.create({
        nome: 'Usuario2',
        email: 'repetido@example.com',
        senha: 'outrasenha'
      });
      expect.fail('Deveria falhar por e-mail duplicado');
    } catch (error) {
      expect(error.name).to.equal('SequelizeUniqueConstraintError');
    }
  });
});