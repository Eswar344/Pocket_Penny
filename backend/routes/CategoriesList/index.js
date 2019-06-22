var categorymodule=require("../../modules/category")
export default async (req, res,next) => {
    try {
        const categories = await categorymodule.getCategories()
        res.status(200).send({ categories })
    } catch (error) {
        console.error(error);
        res.status(400).send({ errors : [{ error : error.message}]});
    }
}