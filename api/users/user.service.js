const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {               //createmethod takes 2 parameters
        pool.query(`INSERT INTO registrations(first_name, last_name, email, password, gender, number)
                    VALUES(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.gender,
                data.number
            ],
            (error, results, fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUsers: (callback) => {                   //takes only 1 as we are getting the data
        pool.query(
            `SELECT * FROM registrations`,
            [],
            (error, results, fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )    
    },
    getUsersByID: (id, callback) => {           //takes 2 as we find users by id
        pool.query(`
            SELECT * FROM registrations WHERE id=?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    updateUsers: (data, callback) => {            //takes 2 and query takes 3
        pool.query(`
            UPDATE registrations SET first_name=?, last_name=?, email=?, password=?, gender=?, number=? WHERE id=?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.gender,
                data.number,
                data.id
            ],  
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    deleteUsers: (data, callback) => {
        pool.query(
            `DELETE FROM registrations WHERE id=?`,
            [data.id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUsersByEmail: (data, callback) => {
        pool.query(
            `SELECT * FROM registrations WHERE email=?`,
            [data.email],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        ); 
    }
}