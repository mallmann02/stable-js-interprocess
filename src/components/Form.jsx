import React, { useEffect, useState } from 'react';
import LabeledInput from './LabeledInput';

import getFormattedLocaleDate from '../utils/getFormattedLocaleDate';

import '../styles/Form.css';

function Form (props) {

	const {
		handleSubmit,
		setIsFormVisible,
		isInEditMode,
		previousPatientData
	} = props;
	
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [status, setStatus] = useState("");
	const [bornDate, setBornDate] = useState("");

	const fillInputsWithPreviousData = () => {
		setName(previousPatientData.name);
		setCpf(previousPatientData.cpf);
		setGender(previousPatientData.gender);
		setAddress(previousPatientData.address);
		setStatus(previousPatientData.status);
		setBornDate(previousPatientData.bornDate);
	};

	useEffect(() => {
		if (isInEditMode) {
			fillInputsWithPreviousData()
		}
	}, [isInEditMode])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit({
					name,
					cpf,
					gender,
					address,
					status,
					bornDate,
					created: isInEditMode ? previousPatientData.created : getFormattedLocaleDate(),
					edited: getFormattedLocaleDate()
				});
			}}
		>
			<h2> Formulário de cadastro </h2>
			<LabeledInput
				inputValue={name}
				onChangeFn={setName}
				labelText="Nome"
				placeholderText="ex: Fulano da Silva"
			/>
			<LabeledInput
				inputValue={cpf}
				onChangeFn={setCpf}
				labelText="CPF"
				placeholderText="Digite o CPF com 11 dígitos"
				maxLength={11}
				minLength={11}
			/>
			<LabeledInput
				inputValue={gender}
				onChangeFn={setGender}
				labelText="Sexo"
				placeholderText="Masculino/Feminino"
				type="select"
				options={['Masculino', 'Feminino']}
			/>
			<LabeledInput
				inputValue={address}
				onChangeFn={setAddress}
				labelText="Endereço"
				placeholderText="ex: Rua Fulano da Silva, 598, São Paulo/SP"
				required={false}
			/>
			<LabeledInput
				inputValue={status}
				onChangeFn={setStatus}
				labelText="Status"
				placeholderText="Ativo/inativo"
				type="select"
				options={['Ativo', 'Inativo']}
			/>
			<LabeledInput
				inputValue={bornDate}
				onChangeFn={setBornDate}
				labelText="Data de nascimento"
				placeholderText="ex: 02/12/1998"
				inputType="date"
			/>
			<div className='button_block'>
				<button
					type='button'
					onClick={() => setIsFormVisible(false)}
				>
					Cancelar
				</button>
				<button
					type='submit'
				>
					{ isInEditMode ? "Atualizar" : "Cadastrar" }
				</button>
			</div>
		</form>
	);
};

export default Form;
