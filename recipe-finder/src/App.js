import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/add" element={<AddRecipe />} />
                    <Route path="/recipes/:id" element={<RecipeDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
