import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoPessoaResponsavel = (props) => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("https://demo7955835.mockable.io/pessoaResponsavel")
      .then((response) => {
        console.log(response)
        const pessoaResponsavel = response.data.lista.map((c) => {
          return {
            id: c.id,
            cpf: c.cpf,
            matricula: c.matricula,
            nome: c.nome,
            idEndereco: c.idEndereco,
            curso: c.curso,
          };
        });
        setData(pessoaResponsavel);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("https://demo7955835.mockable.io/alunos", {
        id: newData.id,
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Aluno salvo com sucesso.");
      });
  }

  function handleUpdate(newData) {
    axios
      .put("https://demo7955835.mockable.io/alunos", {
        id: newData.id,
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Aluno atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://demo7955835.mockable.io/alunos", {
        id: newData.id,
      })
      .then(function (response) {
        console.log("Aluno deletado com sucesso.");
      });
  }

  return [
    <MaterialTable
      title="Gerenciamento de Pessoa Responsável"
      columns={[
        { title: "Id", field: "id" },
        { title: "cpf", field: "cpf" },
        { title: "matricula", field: "matricula", type: "numerico" },
        { title: "nome", field: "nome" },
        { title: "endereco", field: "idEndereco" },
        { title: "curso", field: "curso" },
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

export default GerenciamentoPessoaResponsavel;
