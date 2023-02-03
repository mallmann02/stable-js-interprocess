import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from './App';
import testData from './testData';

const populateLocalStorage = () => global.localStorage.setItem('patients', JSON.stringify(testData));

const cleanLocalStorage = () => global.localStorage.clear();

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
