import React, { useEffect, useState } from 'react';
import fetchPlanets from './helpers.js/fetchPlanets';
import Header from './components/Header';
import MyContext from './components/MyContext';
import Content from './components/Content';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const aux = async () => {
      const planetsFetch = await fetchPlanets(setPlanets, setLoading);
      return planetsFetch;
    };
    aux();
  }, []);
  const ContextValue = {
    data: planets,
    loading,
  };
  return (
    <MyContext.Provider value={ ContextValue }>
      <div>
        <Header />
        <Content />
      </div>
    </MyContext.Provider>

  );
}

export default App;
