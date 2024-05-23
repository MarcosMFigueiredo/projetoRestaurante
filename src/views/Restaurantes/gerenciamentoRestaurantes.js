import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoRestaurantes = (props) => {
  const { useState, useEffect } = React;

  const [lookupDataEndereco, setLookupDataEndereco] = useState({});
  const [lookupDataPessoaResponsavel, setLookupDataPessoaResponsavel] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
    fetchEnderecos()
    fetchPessoasResponsaveis()
  }, []);

  function fetchEnderecos() {
    axios
      .get("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/enderecos")
      .then((response) => {
        const enderecos = response.data.lista.reduce((acc, endereco) => {
          acc[endereco.id] = `${endereco.id} - ${endereco.rua}`;
          return acc;
        }, {});
        setLookupDataEndereco(enderecos);
      })
      .catch((error) => console.log(error));
  }

  function fetchPessoasResponsaveis() {
    axios
      .get("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/pessoasResponsaveis")
      .then((response) => {
        const pessoaResponsavel = response.data.lista.reduce((acc, pessoa) => {
          acc[pessoa.id] = `${pessoa.id} - ${pessoa.nome}`;
          return acc;
        }, {});
        setLookupDataPessoaResponsavel(pessoaResponsavel);
      })
      .catch((error) => console.log(error));
  }


  function handleClick() {
    axios
      .get("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/restaurantes")
      .then((response) => {
        console.log(response)
        const restaurantes = response.data.lista.map((c) => {
          return {
            id: c.id,
            nome: c.nome,
            idEndereco: c.idEndereco,
            idPessoaResponsavel: c.idPessoaResponsavel,
            capacidadeRefeicoes: c.capacidadeRefeicoes,
            horarioCafe: c.horarioCafe,
            horarioAlmoco: c.horarioAlmoco,
            horarioJanta: c.horarioJanta,
            diasFuncionamento: c.diasFuncionamento,
          };
        });
        setData(restaurantes);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/restaurantes", {
        id: newData.id,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        idPessoaResponsavel: newData.idPessoaResponsavel,
        capacidadeRefeicoes: newData.capacidadeRefeicoes,
        horarioCafe: newData.horarioCafe,
        horarioAlmoco: newData.horarioAlmoco,
        horarioJanta: newData.horarioJanta,
        diasFuncionamento: newData.diasFuncionamento,
      })
      .then(function (response) {
        console.log("Restaurante salvo com sucesso.");
      });
  }

  function handleUpdate(newData) {
    axios
      .put("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/restaurantes", {
        id: newData.id,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        idPessoaResponsavel: newData.idPessoaResponsavel,
        capacidadeRefeicoes: newData.capacidadeRefeicoes,
        horarioCafe: newData.horarioCafe,
        horarioAlmoco: newData.horarioAlmoco,
        horarioJanta: newData.horarioJanta,
        diasFuncionamento: newData.diasFuncionamento,
      })
      .then(function (response) {
        console.log("Restaurante atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://57386a75-0197-4cec-9ec3-626b8b295f9e.mock.pstmn.io/restaurantes", {
        id: newData.id,
      })
      .then(function (response) {
        console.log("Restaurante deletado com sucesso.");
      });
  }

  return [
    <MaterialTable

      title="Gereciamento de Restaurantes"
      columns={[
        { title: "Id", field: "id" },
        { title: "Nome", field: "nome" },
        { title: "Endereço", field: "idEndereco", lookup: lookupDataEndereco },
        { title: "Pessoa Responsável", field: "idPessoaResponsavel", lookup: lookupDataPessoaResponsavel },
        { title: "Capacidade de Refeições", field: "capacidadeRefeicoes", type: "numeric"},
        { title: "Horário do Café da Manhã", field: "horarioCafe", type: "time" },
        { title: "Horário do Almoço", field: "horarioAlmoco", type: "time" },
        { title: "Horário da Janta", field: "horarioJanta", type: "time" },
        { title: "Dias de Funcionamento", field: "diasFuncionamento"}

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

export default GerenciamentoRestaurantes;
