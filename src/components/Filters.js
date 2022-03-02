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

  const [arrayFilters, setArrayFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [inputTypePlanet, setInputTypePlanet] = useState(arrayFilters[0]);
  const [inputComparisonPlanet, setInputComparisonPlanet] = useState('maior que');
  const [inputValuePlanet, setInputValuePlanet] = useState(0);

  const handleChangeInputName = ({ target }) => {
    setInputName(target.value);
  };

  useEffect(() => {
    const aux = async () => {
      const planetsFetch = await fetchPlanets(setPlanets, setLoading, setCopyPlanets);
      return planetsFetch;
    };
    aux();
    setInputTypePlanet(arrayFilters[0]);
  }, [arrayFilters, setCopyPlanets, setLoading, setPlanets]);

  const handleClickFilter = () => {
    const filt = {
      column: inputTypePlanet,
      comparison: inputComparisonPlanet,
      value: inputValuePlanet,
    };
    setFilterByNumericValues([...filterByNumericValues, filt]);
    setArrayFilters(arrayFilters.filter((item) => item !== inputTypePlanet));
  };

  const handleClickRemoveFilter = (column) => {
    setFilterByNumericValues(filterByNumericValues
      .filter((item) => item.column !== column));
    setArrayFilters([...arrayFilters, column]);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setArrayFilters([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
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
            {arrayFilters.map((filt) => <option key={ filt }>{filt}</option>)}
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
            onChange={ ({ target }) => setInputValuePlanet(target.value) }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleClickFilter }
          >
            Adicionar Filtro

          </button>
          <div>
            {filterByNumericValues.map((filt) => (
              <section key={ filt.column } data-testid="filter">
                <p>{`${filt.column} ${filt.comparison} ${filt.value}`}</p>
                <button
                  type="button"
                  onClick={ () => handleClickRemoveFilter(filt.column) }
                >
                  X
                </button>
              </section>))}
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ removeAllFilters }
            >
              Remover todas filtragens
            </button>
          </div>
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
