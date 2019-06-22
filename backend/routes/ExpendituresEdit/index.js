var Expendituremodule=require("../../modules/expenditure")
export default async (req, res,next) => {
    try {
        let {id} = req.query
        if(!id){
            throw new Error("Need id to edit details")
        }
        else{
        const editExpenditurelist = await Expendituremodule.editlist(req.body,id)
        return res.status(200).send(editExpenditurelist)
        }
    }
     catch (error) {
        console.error(error);
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}