import React, { useState } from 'react';
import { addRecipe } from '../api';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css'; // Import the CSS file for styling

function AddRecipe() {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addRecipe({ name, ingredients, instructions });
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="add-recipe-container">
            <h1>Add Recipe</h1>
            <form onSubmit={handleSubmit} className="add-recipe-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Ingredients</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Instructions</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Add Recipe</button>
                <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
            </form>
        </div>
    );
}

export default AddRecipe;
