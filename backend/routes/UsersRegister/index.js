var usermodule=require("../../modules/users")
export default async (req, res,next) => {
    try {
        const { username, password, email } = req.body
        if (!username || !password || !email) {
            throw new Error("please complete all the details")
        }
        const existingUserName = await usermodule.findByQuery("username", username)
        if (existingUserName) {
            throw new Error("Name already taken")
        }
        const existingUserEmail = await usermodule.findByQuery("email", email)
        if (existingUserEmail) {
            throw new Error("Email already taken")
        }
        const token = await usermodule.createAccount(username, password, email)
        return res.status(200).send({ token })
    } catch (error){
        console.error(error);
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}