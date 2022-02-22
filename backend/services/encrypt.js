const bcrypt = require('bcrypt');

const cryptPassword = async (password)=>{
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err){
                return reject(err);
            }
            bcrypt.hash(password, salt, function(err, hash) {
            return resolve(hash);
            });
        });
    })
};

const comparePassword = async (plainPass, hashword, callback)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
            return err == null ?
                resolve(isPasswordMatch) :
                reject(err);
        });
    })
};

module.exports.cryptPassword = cryptPassword;
module.exports.comparePassword = comparePassword;