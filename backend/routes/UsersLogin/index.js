var usermodule=require("../../modules/users")
export default async (req, res,next) => {
    try {
        const { email, password } = req.body
        const token = await usermodule.login(email, password);
        return res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}