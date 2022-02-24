// import MyContent from '../components/MyContext';

function fetchPlanets(setPlanets, setLoading) {
  const dataPlanets = fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
    .then((data) => {
      setPlanets(data.results);
      setLoading(true);
    });
  return dataPlanets;
}

export default fetchPlanets;
