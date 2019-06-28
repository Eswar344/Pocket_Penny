var usermodule=require("../../modules/users")
export default async (req, res,next) => {
    try {
        const { email, password } = req.body
        const token = await usermodule.login(email, password);
        let maxlimit= await usermodule.constantLimit(email)
        return res.status(200).send({ token,maxlimit});
    } catch (error) {
        console.error(error);
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}