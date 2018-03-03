var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/config.json");
module.exports = function(sequelize) {
    let Contact = sequelize.define("contact", {
        // contact first name saved as a string
        contact_fname: Sequelize.STRING,
        // contact last name saved as a string
        contact_lname: Sequelize.STRING,
        // contact email saved as a string
        contact_email: Sequelize.STRING,
        // contact company (a string)
        contact_linkedIn: Sequelize.STRING,
        // contact Twitter url (a string)
        contact_twitter: Sequelize.STRING
        // contact work address (a string)

    }, {

        timestamps: false
    });

    // Contact.associate = function(models) {
    //     // We're saying that a Contact should belong to a User
    //     // A contact can't be created without a user due to the foreign key constraint
    //     Contact.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Contact;
};