//var category_model = require("./category_model")
var mongoose = require("mongoose")
const JIRO = require('@madewithjiro/jiro-sdk');
const uuid = require('uuid');
const { Store } = new JIRO.default();
const CategoryCollection="category"

async function getCategories() {
    return await Store.get(CategoryCollection);
}

async function createDefaultCategories() {
    const checkExistingCategories = await getCategories();
    if (checkExistingCategories.length) {
        return
    }
    console.log("No default existis creating default")
    const arr=[
        { name: "Dress" },
        { name: "Food" },
        { name: "Rent" },
        { name: "Petrol" },
        { name: "makeup kit" }
    ]
    arr.forEach(async(el) => { 
        let id = uuid.v4();
        const result = await Store.set(CategoryCollection,id, { id, ...el});
        console.log("Created new category", el);
    });
   
}
createDefaultCategories()

async function removeAllCategories() {
    const categories = await Store.get(CategoryCollection);
    await Promise.all(categories.map(category => Store.delete(CategoryCollection, category.id)));
    console.log(`Removed ${categories.length} categories`);
}
// removeAllCategories();
module.exports = {
    getCategories
}