// import MyContent from '../components/MyContext';

function fetchPlanets(setPlanets, setLoading, setCopyPlanets) {
  const dataPlanets = fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
    .then((data) => {
      setPlanets(data.results);
      setLoading(true);
      setCopyPlanets(data.results);
    });
  return dataPlanets;
}

export default fetchPlanets;
