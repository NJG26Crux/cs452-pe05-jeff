import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe, updateRecipe, deleteRecipe } from '../api';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getRecipe(id).then(response => setRecipe(response.data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateRecipe(id, recipe);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteRecipe(id);
        navigate('/');
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h1>Recipe Details</h1>
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={recipe.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Ingredients</label>
                        <textarea
                            name="ingredients"
                            value={recipe.ingredients}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Instructions</label>
                        <textarea
                            name="instructions"
                            value={recipe.instructions}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Recipe</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                    <button onClick={() => setIsEditing(true)}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default RecipeDetails;