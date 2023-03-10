import React, { useState, useEffect } from 'react';

import '../styles/Table.css';

function Table(props) {

  const {
    patients,
    filter,
    handleEdit,
    handleChangePatientStatus
  } = props;

  const [ filteredPatients, setFilteredPatients ] = useState([]);

  useEffect(() => {
    const filtered = patients.filter(({name}) => name?.includes(filter));
    setFilteredPatients(filtered);
  }, [filter, patients]);

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
            <td>{patient.bornDate}</td>
            <td>{patient.cpf}</td>
            <td>{patient.gender}</td>
            <td>{patient.address || "Não informado"}</td>
            <td>
              <button
                className='btn_table'
                disabled={ patient.status == "Inativo" }
                onClick={() => handleChangePatientStatus(patient.cpf, "Inativo")}
              >
                {patient.status}
              </button>
            </td>
            <td>
              <button
                className='btn_table'
                onClick={() => handleEdit(patient)}
              >
                Editar
              </button>
            </td>
          </tr>
        )))}
      </tbody>
    </table>
  );
}

export default Table;
