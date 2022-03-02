import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copyPlanets, setCopyPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const objState = {
    planets,
    setPlanets,
    loading,
    setLoading,
    copyPlanets,
    setCopyPlanets,
    inputName,
    setInputName,
    filterByName: {
      name: inputName,
    },
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <main>
      <MyContext.Provider value={ objState }>
        {children}
      </MyContext.Provider>
    </main>
  );
}

MyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MyProvider;
