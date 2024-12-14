import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, updateRecipe, deleteRecipe } from '../api';
import './RecipeList.css'; // Import the CSS file for styling

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [editingRecipeId, setEditingRecipeId] = useState(null);
    const [currentRecipe, setCurrentRecipe] = useState(null);

    useEffect(() => {
        getRecipes().then(response => setRecipes(response.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateRecipe(editingRecipeId, currentRecipe);
        setEditingRecipeId(null);
        setCurrentRecipe(null);
        getRecipes().then(response => setRecipes(response.data));
    };

    const handleDelete = async (id) => {
        await deleteRecipe(id);
        getRecipes().then(response => setRecipes(response.data));
    };

    const handleEdit = (recipe) => {
        setEditingRecipeId(recipe._id);
        setCurrentRecipe(recipe);
    };

    const handleSelectRecipe = (id) => {
        setSelectedRecipeId(selectedRecipeId === id ? null : id);
        setEditingRecipeId(null);
    };

    const handleCloseDetails = () => {
        setSelectedRecipeId(null);
    };

    return (
        <div className="recipe-list-container">
            <h1>Recipe List</h1>
            <Link to="/add" className="add-recipe-button">Add Recipe</Link>
            <ul className="recipe-list">
                {recipes.map(recipe => (
                    <li key={recipe._id} className="recipe-item">
                        <h2 onClick={() => handleSelectRecipe(recipe._id)} className="recipe-title">{recipe.name}</h2>
                        {selectedRecipeId === recipe._id && (
                            <div className="recipe-details">
                                <button onClick={handleCloseDetails} className="hide-button">Hide</button>
                                {editingRecipeId === recipe._id ? (
                                    <form onSubmit={handleUpdate} className="recipe-form">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={currentRecipe.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Ingredients</label>
                                            <textarea
                                                name="ingredients"
                                                value={currentRecipe.ingredients}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Instructions</label>
                                            <textarea
                                                name="instructions"
                                                value={currentRecipe.instructions}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button type="submit" className="update-button">Update Recipe</button>
                                        <button type="button" onClick={() => setEditingRecipeId(null)} className="cancel-button">Cancel</button>
                                    </form>
                                ) : (
                                    <div>
                                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                        <button onClick={() => handleEdit(recipe)} className="edit-button">Update</button>
                                        <button onClick={() => handleDelete(recipe._id)} className="delete-button">Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeList;
