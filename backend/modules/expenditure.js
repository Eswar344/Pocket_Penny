//var expenditure_model = require("./model")
const JIRO = require('@madewithjiro/jiro-sdk');
const uuid = require('uuid');
const { Store } = new JIRO.default();
const ExpenditureColletion = "expenditures";
const CategoryCollection = "category";
const categoriesModule = require('./category');

const createExpenditure = async (body,user) => {
    const {cost,date,category,description} = body
    if(!category){
        throw new Error("Please provide category Field")
    }
   if(!cost){
       throw new Error("Fill the cost Field")
   }
   else if(!date){
       throw new Error("Please Select Date")
   } 
   const [categoryObject] = await Store.getAll(CategoryCollection, [category]);
   if (categoryObject.length == 0) {
       throw new Error("Please provide a valid category");
    }
    const id = uuid.v4();
    const created = await Store.set(ExpenditureColletion, id, { id, cost, date, category, description, user });
    if ( created ) {
        return {
            id,
            cost,
            date,
            user,
            category : categoryObject,
            description
        }
    }
    throw new Error("Could not create expenditure. Please try again");    
}

const displaylist = async (query) => {
    const categories = await categoriesModule.getCategories();
    const expenditures = await Store.search(ExpenditureColletion, "user", query.user);
    let filteredExpenditures = expenditures;
    if ( query.categoryId) {
        filteredExpenditures = filteredExpenditures.filter(expenditure => expenditure.category == query.categoryId);
    }
    if(query.date)
    {
        filteredExpenditures.sort((a, b) => a.date - b.date);
    }
    return filteredExpenditures.map(exp =>{
        const { category, ...rest} = exp;
        const selectedCategory = categories.find(cat => cat.id == category);
        return { ...rest, category : { id : selectedCategory.id, name: selectedCategory.name }};
    });
}

const editlist = async(query,id)=>{
   const edited= await Store.update(ExpenditureColletion,id,query)
    if(edited)
    {   const [ans]=await Store.search(ExpenditureColletion,"id",id)
        return ans
    }
}

const removelist=async(id)=>{
    const [expenditure] = await Store.search(ExpenditureColletion,"id",id);
    if(!expenditure){
        throw new Error("Invalid id")
    }
    const checked=await Store.delete(ExpenditureColletion,id);
    if(checked)
    { return id}

}

async function cleanUpExpenditures() {
    const expenditures = await Store.get(ExpenditureColletion);
    const expendituresWithoutUserId = expenditures.filter(expenditure => !expenditure.user)
    const removedRecords = await Promise.all(expendituresWithoutUserId.map(expenditure => Store.delete(ExpenditureColletion, expenditure.id)));
    console.log(`Cleaned up ${removedRecords.length} expenditures without userId`);
}

cleanUpExpenditures();

module.exports = {
    createExpenditure,
    displaylist,
    editlist,
    removelist
}