import React, { useEffect, useState } from 'react';
import fetchPlanets from './helpers.js/fetchPlanets';
import Header from './components/Header';
import MyContext from './components/MyContext';
import Content from './components/Content';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copyPlanets, setCopyPlanets] = useState([]);

  useEffect(() => {
    const aux = async () => {
      const planetsFetch = await fetchPlanets(setPlanets, setLoading, setCopyPlanets);
      return planetsFetch;
    };
    aux();
  }, []);

  const handleChangeInputName = ({ target }) => {
    if (target.value !== '') {
      const filterName = copyPlanets.filter((item) => item.name.includes(target.value));
      setPlanets(filterName);
    } else {
      setPlanets(copyPlanets);
    }
  };

  const ContextValue = {
    data: planets,
    loading,
  };

  return (
    <MyContext.Provider value={ ContextValue }>
      <div>
        <Header />
        <input type="text" data-testid="name-filter" onChange={ handleChangeInputName } />
        <Content />
      </div>
    </MyContext.Provider>

  );
}

export default App;
