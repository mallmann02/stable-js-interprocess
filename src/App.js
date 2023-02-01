import { useEffect, useState } from 'react';
import { getDataFromLocalStorage } from './utils/localStorageActions';

function App() {
  const [ filter, setFilter ] = useState([]);
  const [ patients, setPatients ] = useState([]);

  useEffect(() => {
    setPatients(getDataFromLocalStorage);
  }, []);

  return (
    <div className="App">
      <div>
        <h1> Clínica ACME </h1>
        <h3> Página de cadastro e pesquisa de pacientes </h3>
      </div>
      <label>
        Filtro
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Pesquise pelo nome aqui"
        />
      </label>
      
    </div>
  );
}

export default App;
