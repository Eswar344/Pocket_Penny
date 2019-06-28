var Expendituremodule=require("../../modules/expenditure")
export default async (req, res,next) => {
    try{
        let {id}=req.query
        const deletedlist=await Expendituremodule.removelist(id)
        return res.status(200).send({deletedlist})
    }
    catch(err){
        next(err)
    }
}