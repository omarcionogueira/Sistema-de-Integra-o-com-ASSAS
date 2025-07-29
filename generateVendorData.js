const faker = require('faker');

module.exports = () => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    password,
    company: faker.company.companyName()
  };
};
