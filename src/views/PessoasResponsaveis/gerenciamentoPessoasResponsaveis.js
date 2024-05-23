import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoPessoasResponsaveis = (props) => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/pessoasResponsaveis")
      .then((response) => {
        console.log(response)
        const pessoasResponsaveis = response.data.lista.map((c) => {
          return {
            id: c.id,
            cpf: c.cpf,
            nome: c.nome,
            telefone_whatsapp: c.telefone_whatsapp,
            email: c.email,
          };
        });
        setData(pessoasResponsaveis);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/pessoaResponsaveis", {
        id: newData.id,
        cpf: newData.cpf,
        nome: newData.nome,
        telefone_whatsapp: newData.telefone_whatsapp,
        email: newData.email,
      })
      .then(function (response) {
        console.log("Responsável salvo com sucesso.");
      });
  }

  function handleUpdate(newData) {
    axios
      .put("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/pessoasResponsaveis", {
        id: newData.id,
        cpf: newData.cpf,
        nome: newData.nome,
        telefone_whatsapp: newData.telefone_whatsapp,
        email: newData.email,
      })
      .then(function (response) {
        console.log("Responsável atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/pessoasResponsaveis", {
        id: newData.id,
      })
      .then(function (response) {
        console.log("Responsável deletado com sucesso.");
      });
  }

  return [
    <MaterialTable
      title="Gerenciamento de Pessoas Responsáveis"
      columns={[
        { title: "Id", field: "id" },
        { title: "cpf", field: "cpf" },
        { title: "nome", field: "nome" },
        { title: " telefone_whatsapp", field: "telefone_whatsapp" },
        { title: "email", field: "email" },
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

export default GerenciamentoPessoasResponsaveis;
