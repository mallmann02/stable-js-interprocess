import { getDataFromLocalStorage } from './localStorageActions';

const isCpfNotRegistered = (newCredential) => {
    const registeredPatients = getDataFromLocalStorage();

    const patient = registeredPatients.find(({cpf}) => cpf == newCredential);

    if (patient) return false;

    return true;
};

export { isCpfNotRegistered }
