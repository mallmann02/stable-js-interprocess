import React, { useState } from 'react';
import LabeledInput from './LabeledInput';

function Form () {
	
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [status, setStatus] = useState("");

	return (
		<form>
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
					placeholderText="ex: Fulano da Silva"
					inputType="text"
			/>
			<LabeledInput
					inputValue={status}
					onChangeFn={setStatus}
					labelText="Status"
					placeholderText="ativo/inativo"
					inputType="text"
			/>
		</form>
	);
};

export default Form;
