'use strict'
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Restaurants', Array.from({ length: 50 }, () => ({
      name: faker.name.firstName(),
      tel: faker.phone.number('0#-####-####'),
      address: faker.address.city(),
      opening_hours: '08:00',
      image: `https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}`,
      description: faker.lorem.paragraph(),
      created_at: new Date(),
      updated_at: new Date(),
      category_id: categories[Math.floor(Math.random() * categories.length)].id
    })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
