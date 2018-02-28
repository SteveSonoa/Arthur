var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/config.json");
module.exports = function(sequelize) {
    let Contact = sequelize.define("contact", {
  // contact first name saved as a string
  contact_fname: Sequelize.STRING,
  // contact last name saved as a string
  contact_fname: Sequelize.STRING,
  // contact email saved as a string
  contact_email: Sequelize.STRING,
  // contact company (a string)
  contact_company: Sequelize.STRING,
  // contact LinkedIn url (a string)
  contact_linkedIn: Sequelize.STRING,
 // contact Twitter url (a string)
  contact_twitter: Sequelize.STRING, 
  // contact work address (a string)
  contact_workAddress: Sequelize.STRING, 
  // contact work city (a string)
  contact_workCity: Sequelize.STRING, 
  // contact work state (a string)
  contact_workState: Sequelize.STRING, 
  // cont_workPhone: Sequelize.STRING, 
  contact_workPhone: Sequelize.STRING, 
  // contact company web url (a string)
  contact_companyWeb: Sequelize.STRING, 
  // contact workZip (a string)
  contact_workZip: Sequelize.STRING, 
  // contact_date of birth (a string)
  contact_dob: Sequelize.DATE, 
  //contact cell (a string)
  contact_cell: Sequelize.STRING
}, {
  timestamps: false
});
return Contact;
};