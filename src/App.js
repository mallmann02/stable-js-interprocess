import { useEffect, useState } from 'react';
import Form from './components/Form';
import {
  getDataFromLocalStorage,
  addDataInLocalStorage
} from './utils/localStorageActions';
import { isCpfNotRegistered } from './utils/userRegisterDataValidation';

function App() {
  const [ filter, setFilter ] = useState([]);
  const [ patients, setPatients ] = useState([]);

  const addPatientInDatabase = (patientData) => {
    const { cpf } = patientData;

    if (isCpfNotRegistered(cpf)) {
      addDataInLocalStorage(patientData);
    } else {
      alert('Este paciente já foi cadastrado');
    }
  };

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
      <Form
        handleSubmit={addPatientInDatabase}
      />
    </div>
  );
}

export default App;
