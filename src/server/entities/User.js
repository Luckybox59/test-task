export default class {
  constructor({ id, firstName, lastName, email, country, city, about, password, balance = 0, operations = [] }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.verifyEmail = false;
    this.country = country;
    this.city = city;
    this.about = about;
    this.password = password;
    this.id = id;
    this.balance = balance;
    this.operations = operations;
  }
}
