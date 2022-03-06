export const getCategoryByName = ( categories, name) =>{
    return categories.find(category=>category.name.toLowerCase()===name.toLowerCase());
}