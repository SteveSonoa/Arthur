module.exports = function(sequelize, DataTypes) {

    let User = sequelize.define("User", {

        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        linkedin: {
            type: DataTypes.STRING,
            allowNull: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
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
        }
    }); 

    return User;
};
    
        