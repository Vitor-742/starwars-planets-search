import React, { useEffect, useContext } from 'react';
import MyContext from './MyContext';

function Content() {
  const {
    filterByName: { name },
    filterByNumericValues,
    setPlanets,
    copyPlanets,
  } = useContext(MyContext);

  useEffect(() => {
    let internCopy;
    if (name !== '') {
      const filterName = copyPlanets.filter((item) => item.name.includes(name));
      setPlanets(filterName);
      internCopy = filterName;
    } else {
      setPlanets(copyPlanets);
      internCopy = copyPlanets;
    }
    if (filterByNumericValues.length > 0) {
      const aux = internCopy
        .filter((planet) => filterByNumericValues
          .every(({ column, comparison, value }) => {
            const newNumberColumn = Number(planet[column]);
            const newNumberValue = Number(value);
            if (comparison === 'igual a') return newNumberColumn === newNumberValue;
            if (comparison === 'maior que') return newNumberColumn > newNumberValue;
            if (comparison === 'menor que') return newNumberColumn < newNumberValue;
            return false;
          }));
      setPlanets(aux);
    }
  }, [filterByNumericValues, name, setPlanets, copyPlanets]);
  return (
    <table border="1cm">
      <tr>
        <th>Name</th>
        <th>rotation_period</th>
        <th>orbital_period</th>
        <th>diameter</th>
        <th>climate</th>
        <th>gravity</th>
        <th>terrain</th>
        <th>surface_water</th>
        <th>population</th>
        <th>films</th>
        <th>created</th>
        <th>edited</th>
        <th>url</th>
      </tr>
      <MyContext.Consumer>
        {
          (value) => (
            value.loading && value.planets.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          )
        }
      </MyContext.Consumer>
    </table>
  );
}

export default Content;
