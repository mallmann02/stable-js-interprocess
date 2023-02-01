import { useEffect, useState } from 'react';

import Form from './components/Form';
import Overlayer from './components/Overlayer';
import Table from './components/Table';

import {
  getDataFromLocalStorage,
  addDataInLocalStorage,
  editDataInLocalStorage
} from './utils/localStorageActions';
import { isCpfNotRegistered } from './utils/userRegisterDataValidation';

function App() {
  const [ filter, setFilter ] = useState([]);
  const [ patients, setPatients ] = useState([]);
  const [ isFormVisible, setIsFormVisible ] = useState(false);
  const [ isInEditMode, setIsInEditMode ] = useState(false);
  const [ editingPatientData, setEditingPatientData ] = useState({});

  const addPatientInDatabase = (patientData) => {
    const { cpf } = patientData;

    if (isCpfNotRegistered(cpf)) {
      addDataInLocalStorage(patientData);
      setIsFormVisible(false);
      setPatients(getDataFromLocalStorage);
    } else {
      alert('Este paciente já foi cadastrado');
    }
  };

  const editPatientInDatabase = (patientData) => {
    const { cpf } = patientData;

    editDataInLocalStorage(cpf, patientData);

    setIsFormVisible(false);
    setIsInEditMode(false);
    setPatients(getDataFromLocalStorage);
  };

  const handleEnterEditMode = (patientToEdit) => {
    setIsInEditMode(true);
    setIsFormVisible(true);
    setEditingPatientData(patientToEdit);
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
          onClick={() => {
            setIsFormVisible(true)
            setEditingPatientData({});
            setIsInEditMode(false);
          }}
        >
          Cadastrar novo paciente
        </button>
      </div>

      { isFormVisible && 
        <Overlayer>
          <Form
            handleSubmit={ isInEditMode
              ? editPatientInDatabase
              : addPatientInDatabase
            }
            setIsFormVisible={setIsFormVisible}
            isInEditMode={isInEditMode}
            previousPatientData={editingPatientData}
          />
        </Overlayer>
      }

      <Table
        patients={patients}
        filter={filter}
        handleEdit={handleEnterEditMode}
      />
    </div>
  );
}

export default App;
