import { useEffect, useState } from 'react';
import Form from './components/Form';
import Overlayer from './components/Overlayer';
import Table from './components/Table';
import {
  getDataFromLocalStorage,
  addDataInLocalStorage
} from './utils/localStorageActions';
import { isCpfNotRegistered } from './utils/userRegisterDataValidation';

function App() {
  const [ filter, setFilter ] = useState([]);
  const [ patients, setPatients ] = useState([]);
  const [ isFormVisible, setIsFormVisible ] = useState(false);

  const addPatientInDatabase = (patientData) => {
    const { cpf } = patientData;

    if (isCpfNotRegistered(cpf)) {
      addDataInLocalStorage(patientData);
      setIsFormVisible(false);
    } else {
      alert('Este paciente já foi cadastrado');
    }
  };

  useEffect(() => {
    setPatients(getDataFromLocalStorage);
  }, []);

  return (
    <div className="App">
      <div className='header'>
        <div>
          <h1> Clínica ACME </h1>
          <h3> Página de cadastro e pesquisa de pacientes </h3>
        </div>

        <label className='filter_input'>
          Filtro
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Pesquise pelo nome aqui"
          />
        </label>

        <button
          className='add_patient'
          onClick={() => setIsFormVisible(true)}
        >
          Cadastrar novo paciente
        </button>
      </div>

      { isFormVisible && 
        <Overlayer>
          <Form
            handleSubmit={addPatientInDatabase}
            setIsFormVisible={setIsFormVisible}
          />
        </Overlayer>
      }

      <Table
        patients={patients}
        filter={filter}
      />
    </div>
  );
}

export default App;
