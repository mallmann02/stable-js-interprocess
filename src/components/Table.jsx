import React from 'react';

function Table() {
  return (
    <table>
      <tbody>
        <tr>
          <th>Criado</th>
					<th>Editado</th>
					<th>Nome</th>
					<th>Data de Nascimento</th>
					<th>CPF</th>
					<th>Sexo</th>
					<th>Endereço</th>
					<th>Status</th>
        </tr>
        {filteredPatients && (filteredPatients.map((patient, index) => (
          <tr key={ index }>
            <td>{patient.created}</td>
            <td>{patient.edited}</td>
            <td>{patient.name}</td>
            <td>{patient.born_date}</td>
            <td>{patient.cpf}</td>
            <td>{patient.gender}</td>
            <td>{patient.address || "Não informado"}</td>
            <td>{patient.status}</td>
          </tr>
        )))}
      </tbody>
    </table>
  );
}

export default Table;
