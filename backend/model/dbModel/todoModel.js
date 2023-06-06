const database = require('../index');

module.exports = (sequalize, DataTypes) => {
    const listItems = sequalize.define("todoList", {
        heading: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        isCompleted: {
            type: DataTypes.STRING,
        },
        userEmail: {
            type: DataTypes.STRING,
        }
    })
    return listItems;
}

