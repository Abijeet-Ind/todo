const {
    DataTypes
} = require('sequelize');
const db = require('./../model/index');

const todo = db.todo;

const statusFuction = (res, status, message) => {
    res.status(200).json({
        status: status,
        message: message
    })
}

// when user create a todo list
exports.create = async (req, res) => {
    console.log(req.body);
    const create = await todo.create({
        heading: req.body.heading,
        description: req.body.description,
        isCompleted: false,
        userEmail: req.body.email
    })

    statusFuction(res, 'successfull', create)
}

// when user update a todo
exports.update = async (req, res) => {
    console.log(req.params)
    const updateData = await todo.findOne({
        where: {
            heading: req.params.todo,
            userEmail: req.params.email
        }
    });
    console.log(updateData)
    // const updateData = await todo.find({
    //     where: {
    //         heading: req.params.todo
    //     }
    // })
    if ((updateData.isCompleted * 1)) {
        updateData.isCompleted = '0';
    } else {
        updateData.isCompleted = '1';
    }

    await updateData.save();
    // console.log(updateData)
    statusFuction(res, 'Successfull', updateData);

}

// export api
exports.DisplayAll = async (req, res) => {
    // console.log(req.params)
    const data = await todo.findAll({
        where: {
            userEmail: req.params.email
        }
    });
    // console.log(data)
    statusFuction(res, 'Successfull', data);
}

// delete
exports.deleteTodo = async (req, res) => {
    console.log(req.params)
    const item = await todo.findOne({
        where: {
            heading: req.params.deleteItem,
            userEmail: req.params.email
        }
    });
    await item.destroy()
    statusFuction(res, 'Successfull', "data deleted");
}

exports.displayOne = async(req, res) => {

    console.log(req.params.email, req.params.query)
    const extdata = await todo.findOne({where: {
        userEmail: req.params.email,
        heading: req.params.query,
    }})
    statusFuction(res, 'successfull', extdata);

}