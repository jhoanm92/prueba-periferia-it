const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    // Crear usuarios con contraseña hasheada
    const users = [];
    for (let i = 1; i <= 3; i++) {
      users.push({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: await bcrypt.hash('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Users', users, {});

    // Obtener los usuarios ya insertados para usar sus IDs
    // Lamentablemente, no podemos hacer un SELECT con queryInterface, así que insertamos posts directamente asumiendo IDs 1,2,3
    const posts = [];
    for (let i = 1; i <= 3; i++) {
      posts.push({
        title: 'First Post',
        content: `Post from user${i}`,
        userId: i, // asumimos ids 1,2,3 de usuarios
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Posts', posts, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
