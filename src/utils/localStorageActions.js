const getDataFromLocalStorage = () => {
    const patients = JSON.parse(localStorage.getItem('patients'));
    
    if (!patients) return [];

    return patients;
};

const addDataInLocalStorage = (newData) => {
    const storedPatients = getDataFromLocalStorage();
    const newPatientsLoad = [...storedPatients, newData];
    const stringfiedLoad = JSON.stringify(newPatientsLoad);
    localStorage.setItem('patients', stringfiedLoad);
};

const editDataInLocalStorage = (patientCredential, newInfo) => {
    const storedPatients = getDataFromLocalStorage();
    
    const patientToEdit = storedPatients.find(({ cpf }) => cpf == patientCredential);

    const patientIndex = storedPatients.indexOf(patientToEdit);

    storedPatients[patientIndex] = { ...newInfo };

    const stringfiedLoad = JSON.stringify(storedPatients);
    localStorage.setItem('patients', stringfiedLoad);
};

const changePatientStatusInLocalStorage = (patientCredential, newStatus) => {
    const storedPatients = getDataFromLocalStorage();
    
    const patientToEdit = storedPatients.find(({ cpf }) => cpf == patientCredential);

    const patientIndex = storedPatients.indexOf(patientToEdit);

    storedPatients[patientIndex] = { ...patientToEdit, status: newStatus };

    const stringfiedLoad = JSON.stringify(storedPatients);
    localStorage.setItem('patients', stringfiedLoad);
};

export {
    getDataFromLocalStorage,
    addDataInLocalStorage,
    editDataInLocalStorage,
    changePatientStatusInLocalStorage
};
