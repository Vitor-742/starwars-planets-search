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
    setArrayFilters(arrayFilters.filter((item) => item !== inputTypePlanet));
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
            {/* { !filterByNumericValues.some((filt) => filt.column === 'population')
            && <option>population</option>}
            { !filterByNumericValues.some((filt) => filt.column === 'orbital_period')
            && <option>orbital_period</option>}
            { !filterByNumericValues.some((filt) => filt.column === 'diameter')
            && <option>diameter</option>}
            { !filterByNumericValues.some((filt) => filt.column === 'rotation_period')
            && <option>rotation_period</option>}
            { !filterByNumericValues.some((filt) => filt.column === 'surface_water')
            && <option>surface_water</option>} */}
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
