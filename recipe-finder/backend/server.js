const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://njg26crux:7227alan@cs452jeff.fqjvb.mongodb.net/', {
    dbName: 'pe05',
});

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Finder API');
});

app.get('/recipes', async (req, res) => {
    console.log('GET /recipes request received');
    const recipes = await Recipe.find();
    res.json(recipes);
});

app.get('/recipes/:id', async (req, res) => {
    console.log(`GET /recipes/${req.params.id} request received`); // added this block of code to troubleshoot error on recipe details page
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/recipes', async (req, res) => {
    console.log('POST /recipes request received with data:', req.body);
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.json(newRecipe);
});

app.put('/recipes/:id', async (req, res) => {
    console.log(`PUT /recipes/${req.params.id} request received with data:`, req.body);
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
});

app.delete('/recipes/:id', async (req, res) => {
    console.log(`DELETE /recipes/${req.params.id} request received`);
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
