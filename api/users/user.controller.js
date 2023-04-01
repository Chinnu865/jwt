//used to handle all services

const { create, getUsers, getUsersByID, updateUsers, deleteUsers, getUsersByEmail} = require('./user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { compareSync } = require('bcrypt')

module.exports = {
    createUser: async (req,res) => {
        const body = req.body;

        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password,salt);

        create( body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(401).json({
                    success:0,
                    message:'database connection error'
                });
            }
            return res.status(200).json({
                success:1,
                message:results
            });
        });
    },
    getUser: (req,res) => {
        getUsers((err, results) => {
                if(err){
                    return res.status(500).json({
                        success:0,
                        message:'Database error'
                    });
                }
                if(!results){
                    return res.status(404).json({
                        success:0,
                        message:'No users found'
                    });
                }
                return res.status(200).json({
                    success:1,
                    message:results
                });
            }
        )
    },
    getUserById: (req,res) => {
        const id = req.params.id;
        //console.log(id);
        getUsersByID(id, (error, results) => {
            if(error){
                console.log(err);
                return res.status(401).json({
                    success:0,
                    message:'database connection error'
                });
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message:'No users found'
                });
            }
            return res.status(200).json({
                success:1,
                message:results
            });
        })
    },
    updateUser: async (req,res) => {
        const body = req.body;
        //console.log(body);
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password,salt);
        //console.log(body.password);
        updateUsers(body, (error, results) => {
            if(error){
                console.log(error);
                return res.status(401).json({
                    success:0,
                    message:'updation error'
                });
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message:'Updation failed'
                });
            }
            return res.status(200).json({
                success:1,
                message:results
            });
        })
    },
    deleteUser: (req,res) => {
        const data = req.body;
        deleteUsers(data, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message:'no records found'
                });
            }
            return res.status(200).json({
                success:1,
                message:'users deleted successfully'
            });
        })
    },
    getUserByEmail: (req,res) => {
        const data = req.body;
        console.log(data)
        getUsersByEmail(data, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message:'user not found'
                });
            }
            // return res.status(200).json({
            //     success:1,
            //     message:results
            // });
            console.log('hello')
            console.log(results)
            const result = compareSync(data.password, results.password);
            console.log(results);
            if(result){
                results.password = undefined;
                console.log(results);
                const jsonToken = jwt.sign({result : results}, process.env.ACCESS_SECRET_KEY, {expiresIn: '1h'});
                
                return res.json({
                    success: 1,
                    message: 'login successfully',
                    token: jsonToken
                });
            }else{
                return res.json({
                    success:0,
                    message:'invalid username or password'
                });
            }
        })
    }
}