const { sequelize, User, Profile, Post, Comment, Like } = require('./index');

describe('Database Connection and Associations', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync({ force: true });
      console.log('Database synchronized successfully');
    } catch (error) {
      console.error('Error during database sync:', error);
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Database connection works', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });
});
