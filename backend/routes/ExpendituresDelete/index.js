var Expendituremodule=require("../../modules/expenditure")
export default async (req, res,next) => {
    try{
        const {id} = req.user
        const expenditure = await Expendituremodule.createExpenditure(req.body,id) 
        return res.status(200).send({expenditure})
     }
     catch (error) {
        console.error(error);
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}