import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchPlanets from '../helpers.js/fetchPlanets';

function Filters() {
  const {
    setPlanets,
    setLoading,
    setCopyPlanets,
    setInputName,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(MyContext);

  const [inputTypePlanet, setInputTypePlanet] = useState('population');
  const [inputComparisonPlanet, setInputComparisonPlanet] = useState('maior que');
  const [inputValuePlanet, setInputValuePlanet] = useState(0);

  const handleChangeInputName = ({ target }) => {
    setInputName(target.value);// refazer essa parte para passar em todos os filtros
    /* if (target.value !== '') {
      const filterName = copyPlanets.filter((item) => item.name.includes(target.value));
      setPlanets(filterName);
    } else {
      setPlanets(copyPlanets);
    } */
  };

  useEffect(() => {
    const aux = async () => {
      const planetsFetch = await fetchPlanets(setPlanets, setLoading, setCopyPlanets);
      return planetsFetch;
    };
    aux();
  }, [setCopyPlanets, setLoading, setPlanets]);

  const handleClickFilter = () => {
    const filt = {
      column: inputTypePlanet,
      comparison: inputComparisonPlanet,
      value: inputValuePlanet,
    };
    setFilterByNumericValues([...filterByNumericValues, filt]);
  };

  return (
    <MyContext.Consumer>
      {() => (
        <div>
          <input
            type="text"
            data-testid="name-filter"
            onChange={ handleChangeInputName }
          />
          <select
            data-testid="column-filter"
            onChange={ ({ target }) => setInputTypePlanet(target.value) }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ ({ target }) => setInputComparisonPlanet(target.value) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
          <input
            type="number"
            data-testid="value-filter"
            value={ inputValuePlanet }
            onChange={ ({ target }) => setInputValuePlanet(target.value) }// colocar como 0
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleClickFilter }
          >
            Adicionar Filtro

          </button>
        </div>
      )}
    </MyContext.Consumer>
  );
}

Filters.propTypes = {
  setPlanets: PropTypes.func,
  setInputName: PropTypes.func,
  copyPlanets: PropTypes.func,
}.isRequired;

export default Filters;
