const jwt = require("jsonwebtoken");

const generatetoken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const verifytoken = (token) =>{
    try{
        const decode = jwt.verify( token , process.env.JWT_SECRET);
        return decode;
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {generatetoken,verifytoken};