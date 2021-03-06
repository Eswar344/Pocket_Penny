// var UserModel = require("./model")
var jsonwebtoken = require("jsonwebtoken")
const JIRO = require('@madewithjiro/jiro-sdk');
const uuid = require('uuid');
const { Store } = new JIRO.default();
const UsersCollection = "users";

const createAccount = async (username, password, email, phone) => {
    const id = uuid.v4();
    await Store.set(UsersCollection, id, { id, username, password, email,maxlimit:0});
    const token = encode(id, username, email)
    return token;
}

const findByQuery = async (queryKey, queryValue) => {

    const data = await Store.search(UsersCollection, queryKey, queryValue);
    if (data.length) { return true }
    return false;
}

const encode = function encode(id, name, email) {
    return jsonwebtoken.sign({ id, name, email }, process.env.JWT_SECRET, {
        expiresIn: "10 days"
    });
}
const decode = function decode(token) {
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return payload;
}
const getUserById = async (userId) => {
    return Store.search(UsersCollection,"id", userId);
    // return UserModel.findById(userId).exec();
}

const login = async (email, password) => {
    if (!email || !password) {
        throw new Error(`Email and password are required for login`);
    }
    const [user] = await Store.search(UsersCollection,"email", email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (user.password !== password) {
        throw new Error("Invalid email or password");
    }
    return encode(user.id, user.username, user.email);
}
const constantLimit = async(email)=>{
    let [user] = await Store.search(UsersCollection,"email", email);
    if(!user.hasOwnProperty('maxlimit'))
    {   var userdata=await Store.update(UsersCollection,user.id,{maxlimit:0})
       return 0
    }
    else{
        return user.maxlimit
    }
}
const updateLimit=async(body,id)=>{
    var  limit = body.maxlimit
    var userdata=await Store.update(UsersCollection,id,{maxlimit:limit})
    if(userdata)
    {
        return limit
    }
}

module.exports = {
    createAccount,
    encode,
    decode,
    getUserById,
    findByQuery,
    login,
    constantLimit,
    updateLimit
}