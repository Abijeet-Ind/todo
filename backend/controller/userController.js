const sequalize = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('./../model/index');

const user = db.user;

const statusFuction = (res, status, message) => {
    res.status(200).json({
        status: status,
        message: message
    })
}

exports.signup = async (req, res) => {
    try {
        console.log(req.body)
        const findInsertedEmail = await user.findOne(({ where: { email: req.body.email } }));

        if (findInsertedEmail) {
            statusFuction(res, 'Failed', "email id already registered");
        }

        if (req.body.password.localeCompare(req.body.passwordConfirm) === 0) {
            const signinData = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 12),
            })

            statusFuction(res, 'success', "user created successfully");
        } else {
            statusFuction(res, 'Failed', "please insert the correct password");

        }
    } catch (err) {
        console.log("error found", err);
    }

    // BELOW CODE IS RAW QUERY

    // connection.connect(function (error, data) {
    //     connection.query(`SELECT * FROM userss WHERE email = "${req.body.email}"`, function (error, data) {
    //         if (error) console.log(error);

    //         if (!(data[0] === undefined)) {
    //             statusFuction(res, "Failed", "already registed with this email please insert another one");

    //         } else {
    //             if (req.body.password.localeCompare(req.body.passwordConfirm) === 0) {
    //                 connection.connect(async function (error) {
    //                     if (error) console.log(error);

    //                     connection.query("INSERT INTO userss SET ?", {
    //                         name: req.body.name,
    //                         email: req.body.email,
    //                         password: await bcrypt.hash(req.body.password, 12), // decrypt the password
    //                     }, function (error, data) {
    //                         if (error) throw error;

    //                         statusFuction(res, "success", "user created successfully");
    //                     })
    //                 })

    //             } else {
    //                 statusFuction(res, "Failed", "password and password confirm does not match");
    //             }
    //         }
    //     })
    // })

}

exports.delete = (req, res) => {
    connection.connect("DELETE FROM userss WHERE name='abijeet'", function (error, data) {
        connection.query(`DELETE FROM userss WHERE name='manish'`, (error, data) => {
            error ? console.log("cannot find the data with the assined string") : console.log(data);

            statusFuction(res, "success", "user successfully removed");
        })
    })
}



exports.login = async (req, res) => {

    console.log(req.body)
    try{
        // const findInsertedEmail = await user.findOne(({ where: { email: req.body.email } }));
        const findUser = await user.findOne(({ where: { email: req.body.email } }));
        
        if(await bcrypt.compare(req.body.password, findUser.password)){
            statusFuction(res, "success", "logged in successfully");
        }else {
            statusFuction(res, "FAILED", "NOT MATCHED");
        }

    } catch(err){
        console.log("error found", err);
    }





    // BELOW CODE IS RAW QUERY
    // connection.connect(function (error, data) {
    //     if (error) console.log(error);

    //     connection.query(`SELECT * FROM userss WHERE email = "${req.body.email}"`, async function (error, data) {
    //         if (error) console.log(error);
    //         console.log(data)
    //         if (data[0] === undefined) {
    //             message = "cannot find user";
    //             status = "Failed";

    //             statusFuction(res, status, message);
    //         } else {
    //             if (await bcrypt.compare(req.body.password, data[0].password)) {
    //                 console.log('user login');
    //                 message = "successfully logged in";
    //                 status = "success";

    //                 statusFuction(res, status, message);
    //             } else {
    //                 status = "Failed";
    //                 message = "you ented wrong email and password";

    //                 statusFuction(res, status, message);
    //             }
    //         }
    //     })
    // })
}