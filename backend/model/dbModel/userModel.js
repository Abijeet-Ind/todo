const database = require('../index');

module.exports = (sequalize, DataTypes) => {
    const listItems = sequalize.define("users", {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        }

    })
    return listItems;
}

