var Expendituremodule=require("../../modules/expenditure")
export default async (req, res,next) => {
    try {
        const {id}=req.user
        const {date,categoryId} = req.query
        let query = {user:id}
        if(date){
            query = {...query,date}
        }
        if(categoryId){
            query = {...query,categoryId}
        }
        const list = await Expendituremodule.displaylist(query)
        return res.status(200).send({list})
    } 
     catch (error) {
        console.error(error);
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}