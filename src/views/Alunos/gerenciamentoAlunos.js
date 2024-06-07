import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoAlunos = (props) => {
  const { useState, useEffect } = React;

  const [lookupData, setLookupData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
    fetchEnderecos()
  }, []);

  function fetchEnderecos() {
    axios
      .get("http://localhost:8080/api/v1/enderecos")
      .then((response) => {
        const enderecos = response.data.reduce((acc, endereco) => {
          acc[endereco.id] = `${endereco.id} - ${endereco.rua}`;
          return acc;
        }, {});
        setLookupData(enderecos);
      })
      .catch((error) => console.log(error));
  }

  function handleClick() {
    axios
      .get("http://localhost:8080/api/v1/alunos")
      .then((response) => {
        const alunos = response.data.map((c) => {
          return {
            id: c.id,
            cpf: c.cpf,
            matricula: c.matricula,
            nome: c.nome,
            idEndereco: c.endereco.id,
            curso: c.curso,
          };
        });
        setData(alunos);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://localhost:8080/api/v1/alunos", {
        id: newData.id,
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        endereco: {id: newData.idEndereco} ,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Aluno salvo com sucesso.");
      });
  }

  function handleUpdate(newData) {
    axios
      .post("http://localhost:8080/api/v1/alunos", {
        id: newData.id,
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        endereco: {id: newData.idEndereco} ,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Aluno atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete(`http://localhost:8080/api/v1/alunos/${newData.id}`)
      .then(function (response) {
        console.log("Aluno deletado com sucesso.");
      });
  }

  return [
    <MaterialTable

      title="Gerenciamento de Alunos"
      columns={[
        { title: "Id", field: "id" },
        { title: "CPF", field: "cpf" },
        { title: "Matrícula", field: "matricula", type: "numeric" },
        { title: "Nome", field: "nome" },
        { title: "Endereço", field: "idEndereco", lookup: lookupData},
        { title: "Curso", field: "curso" },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleCreate(newData);

              const dataCreate = [...data];

              setData([...dataCreate, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleUpdate(newData)
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleDelete(oldData);
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />,
  ];
};

export default GerenciamentoAlunos;
