import React, { useEffect, useState} from "react";
import Recipe from "./Recipe";
import './App.css';

const App = () => {

  const APP_ID = "90796b1c";
  const APP_KEY = "f4dbcf670eb6178fc83243fa3d5037b1";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    // console.log(data);
    setRecipes(data.hits);
    console.log(" Response Data"+data.hits);

  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    //console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search); 
    setSearch('');
    }


  return(
    <div className ="App">
      <form onSubmit ={getSearch} className = "search-form">
        <input className = "search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className  = "search-button" type="submit">Search</button>
      </form>
      <div className="recipes"> 
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};


// function App() {
//   return (
//     <div className="App">
//      <h1>Recipe</h1>
//     </div>
//   );
// }

export default App;
