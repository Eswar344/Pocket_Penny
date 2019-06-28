var usermodule=require("../../modules/users")

export default async (req, res,next) => {
    try {
        let limit=await usermodule.updateLimit(req.body,req.user.id)
         res.status(200).send({maxlimit:limit})
    } catch (error) {
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}