import React, { useState } from 'react';
import LabeledInput from './LabeledInput';

import '../styles/Form.css';

function Form (props) {

	const { handleSubmit } = props;
	
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [status, setStatus] = useState("");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit({ name, cpf, gender, address, status });
			}}
		>
			<h2> Formulário de cadastro </h2>
			<LabeledInput
				inputValue={name}
				onChangeFn={setName}
				labelText="Nome"
				placeholderText="ex: Fulano da Silva"
				inputType="text"
			/>
			<LabeledInput
				inputValue={cpf}
				onChangeFn={setCpf}
				labelText="CPF"
				placeholderText="Digite o CPF com 11 dígitos"
				inputType="text"
				maxLength={11}
			/>
			<LabeledInput
				inputValue={gender}
				onChangeFn={setGender}
				labelText="Sexo"
				placeholderText="Masculino/Feminino"
				inputType="text"
			/>
			<LabeledInput
				inputValue={address}
				onChangeFn={setAddress}
				labelText="Endereço"
				placeholderText="ex: Rua Fulano da Silva, 598, São Paulo/SP"
				inputType="text"
			/>
			<LabeledInput
				inputValue={status}
				onChangeFn={setStatus}
				labelText="Status"
				placeholderText="Ativo/inativo"
				inputType="text"
			/>
			<button
				type='submit'
			>
				Cadastrar
			</button>
		</form>
	);
};

export default Form;
