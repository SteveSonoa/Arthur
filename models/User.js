module.exports = function(sequelize, DataTypes) {

    let User = sequelize.define("User", {

        fname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notEmpty: { msg: 'The first name is required' }
            }       
        },

        lname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notEmpty: { msg: 'The last name is required' }
            } 
        },

        linkedin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notEmpty: { msg: 'The LinkedIn URL is required' }
            } 
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: { msg: 'The username is required' },
            unique: {
                args: true,
                msg: 'Sorry, that email is already in use.',
                fields: [sequelize.fn('lower', sequelize.col('username'))]
            },
            validate: {
                max: {
                    args: 15,
                    msg: 'The username you entered is invalid or more than 20 characters.'
                }
                
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // No validation; this will be a hash value
            notEmpty: { msg: 'The password is required' },
            validate: {
                len: {
                    args: [8],
                    msg: 'The password needs to be at least 8 characters.'
                }
                
            }
        }
    }); 
    
  //   User.associate = function(models) {
  //   // Associating User with Contacts
  //   // When a User is deleted, also delete any associated Posts
  //   User.hasMany(models.Contact, {

  //   });
  // };
  
    return User;
};
    
        