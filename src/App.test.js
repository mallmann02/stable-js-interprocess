import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from './App';
import testData from './testData';

const populateLocalStorage = () => global.localStorage.setItem('patients', JSON.stringify(testData));

const cleanLocalStorage = () => global.localStorage.clear();

const INPUT_SELECTOR = '.main-form__input';
const SELECT_SELECTOR = '.main-form__select';

describe('1 - Dados do localStorage são resgatados e a tabela é preenchida com estes dados', () => {
    beforeEach(populateLocalStorage);
    afterEach(cleanLocalStorage);

    it('Preenche a tabela com os valores buscados do localStorage', async () => {
        await act(async () => {
            render(<App />);
        });

        const patients = testData;

        for (let patientIndex in patients) {
            const name = await screen.findByText(patients[patientIndex].name);
            const gender = screen.getAllByText(patients[patientIndex].gender)[0];
            const bornDate = await screen.findByText(patients[patientIndex].bornDate);
            const status = screen.getAllByRole('button', { name: patients[patientIndex].status })[0];
            const cpf = await screen.findByText(patients[patientIndex].cpf);

            expect(name.textContent.length).toBeGreaterThan(1);
            expect(bornDate.textContent.length).toBeGreaterThan(1);
            expect(cpf.textContent.length).toBe(11);
            expect(['Masculino', 'Feminino']).toContain(gender.textContent);
            expect(['Ativo', 'Inativo']).toContain(status.textContent);

            if (status.textContent == 'Inativo') {
                expect(status).toHaveProperty('disabled', true);
            } else {
                expect(status).toHaveProperty('disabled', false);
            }
        }
    });
})

describe('2 - É possível cadastrar novos pacientes através do formulário', () => {
    beforeEach(populateLocalStorage);
    afterEach(cleanLocalStorage);

    it('Botão para adicionar novo cliente é renderizado e, ao ser clicado, abre o formulário', async () => {
        await act(async () => {
            render(<App />);
        });

        const addNewPatientBtn = screen.getByRole('button', { name: /cadastrar novo paciente/i });

        expect(addNewPatientBtn).toBeInTheDocument;

        fireEvent.click(addNewPatientBtn);

        const form = document.body.getElementsByClassName('patients-register__form');
        expect(form).toBeInTheDocument;
    });

    it('O paciente é cadastrado com os dados preenchidos no formulário', async () => {
        await act(async () => {
            render(<App />);
        });

        jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')

        const addNewPatientBtn = screen.getByRole('button', { name: /cadastrar novo paciente/i });

        fireEvent.click(addNewPatientBtn);

        const nameInput = await document.body.querySelector(INPUT_SELECTOR+'.name');
        const cpfInput = await document.body.querySelector(INPUT_SELECTOR+'.cpf');
        const genderSelect = await document.body.querySelector(SELECT_SELECTOR+'.gender');
        const bornDateInput = await document.body.querySelector(INPUT_SELECTOR+'.bornDate');
        const statusSelect = await document.body.querySelector(SELECT_SELECTOR+'.status');
        const addressInput = await document.body.querySelector(INPUT_SELECTOR+'.address');

        userEvent.type(nameInput, testData[0].name);
        userEvent.type(cpfInput, '12345678922'); // Change CPF to avoid "Already registered this CPF" error
        fireEvent.change(bornDateInput, {target: {value: testData[0].bornDate}})
        userEvent.selectOptions(genderSelect, testData[0].gender);
        userEvent.selectOptions(statusSelect, testData[0].status);
        userEvent.type(addressInput, testData[0].address);

        const submitBtn = document.body.querySelector('.main-form__btn.register');

        fireEvent.click(submitBtn);

        expect(window.localStorage.setItem).toHaveBeenCalled;

        const registeredPatients = JSON.parse(window.localStorage.getItem('patients'));

        const lastRegisteredPatient = registeredPatients[4];
        delete lastRegisteredPatient.created;
        delete lastRegisteredPatient.edited;

        expect(lastRegisteredPatient).toStrictEqual({ 
            name: testData[0].name,
            gender: testData[0].gender,
            status: testData[0].status,
            bornDate: testData[0].bornDate,
            address: testData[0].address,
            cpf: '12345678922'
        });
    });
})
