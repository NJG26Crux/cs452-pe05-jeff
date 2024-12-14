import axios from 'axios';

// const API_URL = 'https://silver-train-77j56579w4j3xrxw.github.dev/';
// const API_URL = 'https://silver-train-77j56579w4j3xrxw-5000.app.github.dev/';
const API_URL = 'https://silver-train-77j56579w4j3xrxw-5000.app.github.dev';

export const getRecipes = () => axios.get(`${API_URL}/recipes`);
export const getRecipe = (id) => {
    console.log(`Requesting recipe with ID: ${id}`); // added this block of code to troubleshoot error on recipe details page
    return axios.get(`${API_URL}/recipes/${id}`)
        .then(response => {
            console.log('Response received:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error fetching recipe:', error);
            throw error;
        });
};
export const addRecipe = (recipe) => axios.post(`${API_URL}/recipes`, recipe);
export const updateRecipe = (id, recipe) => {
    console.log(`Updating recipe with ID: ${id}`, recipe); // added this block of code to troubleshoot updating recipie
    return axios.put(`${API_URL}/recipes/${id}`, recipe)
        .then(response => {
            console.log('Update response:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error updating recipe:', error);
            throw error;
        });
};
export const deleteRecipe = (id) => axios.delete(`${API_URL}/recipes/${id}`);
