import logo from './logo.svg';
import React from "react";
import './App.css';
import Title from "./components/Title";
import Favorites from "./components/favorites-list/Favorites";
import MainCard from "./components/MainCard";
import Form from "./components/Form";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavoerites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });
  
  const alreadyFavorite = favorites.includes(mainCat);

  async function setInitialCat() {
    const newCat = await fetchCat('first cat');
    setMainCat(newCat);

  }
  React.useEffect(() => {
    setInitialCat();
  }, [])

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavoties = [... favorites, mainCat];
    setFavoerites(nextFavoties);
    jsonLocalStorage.setItem('favorites', nextFavoties);
  }
  const counterTitle = counter ? counter+'번째 ' : '';
  return (
    <div>
      <Title>{counterTitle}고양이 가라사대 냥</Title>
      <Form updateMainCat={updateMainCat} /> 
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite}/>
      <Favorites favorites={favorites} />
    </div> 
  );
}

export default App;
