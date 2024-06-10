'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        image: '/images/parus.jpg',
        name: 'Ровный парус 150х50',
        price: 20000,
      },
      {
        image: '/images/parus.jpg',
        name: 'Ровный парус 180х50',
        price: 30000,
      },
      {
        image: '/images/parus.jpg',
        name: 'Ровный парус 200х60',
        price: 40000,
      },
      {
        image: '/images/parus.jpg',
        name: 'Ровный парус 220х60',
        price: 50000,
      },
      {
        image: '/images/tumba.avif',
        name: 'Тумба 80х25',
        price: 8000,
      },
      {
        image: '/images/tumba.avif',
        name: 'Тумба 90х25',
        price: 9000,
      },
      {
        image: '/images/tumba.avif',
        name: 'Тумба 100х25',
        price: 10000,
      },
      {
        image: '/images/tumba.avif',
        name: 'Тумба 120х30',
        price: 12500,
      },
      {
        image: '/images/tumba.avif',
        name: 'Тумба 130х30',
        price: 13500,
      },
      {
        image: '/images/tumba.avif',
        name: 'Тумба 140х30',
        price: 14500,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
