import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { format } from 'date-fns';

const GerenciamentoRestaurantes = (props) => {
  const { useState, useEffect } = React;

  const [lookupDataEndereco, setLookupDataEndereco] = useState({});
  const [lookupDataPessoaResponsavel, setLookupDataPessoaResponsavel] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
    fetchEnderecos();
    fetchPessoasResponsaveis();
  }, []);

  function fetchEnderecos() {
    axios
      .get("http://localhost:8080/api/v1/enderecos")
      .then((response) => {
        const enderecos = response.data.reduce((acc, endereco) => {
          acc[endereco.id] = `${endereco.id} - ${endereco.rua}`;
          return acc;
        }, {});
        setLookupDataEndereco(enderecos);
      })
      .catch((error) => console.log(error));
  }

  function fetchPessoasResponsaveis() {
    axios
      .get("http://localhost:8080/api/v1/pessoasResponsaveis")
      .then((response) => {
        const pessoaResponsavel = response.data.reduce((acc, pessoa) => {
          acc[pessoa.id] = `${pessoa.id} - ${pessoa.nome}`;
          return acc;
        }, {});
        setLookupDataPessoaResponsavel(pessoaResponsavel);
      })
      .catch((error) => console.log(error));
  }

  function handleClick() {
    axios
      .get("http://localhost:8080/api/v1/restaurantes")
      .then((response) => {
        console.log(response);
        const restaurantes = response.data.map((c) => {
          return {
            id: c.id,
            nome: c.nome,
            idEndereco: c.endereco.id,
            idPessoaResponsavel: c.pessoaResponsavel.id,
            capacidadeRefeicoes: c.capacidadeRefeicoes,
            horarioCafeManha: c.horarioCafeManha,
            horarioAlmoco: c.horarioAlmoco,
            horarioJantar: c.horarioJantar,
            diasFuncionamento: c.diasFuncionamento,
          };
        });
        setData(restaurantes);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://localhost:8080/api/v1/restaurantes", {
        id: newData.id,
        nome: newData.nome,
        endereco: {id: newData.idEndereco},
        pessoaResponsavel: {id: newData.idPessoaResponsavel},
        capacidadeRefeicoes: newData.capacidadeRefeicoes,
        horarioCafeManha: format(new Date(newData.horarioCafeManha), 'HH:mm:ss'),
        horarioAlmoco: format(new Date(newData.horarioAlmoco), 'HH:mm:ss'),
        horarioJantar: format(new Date(newData.horarioJantar), 'HH:mm:ss'),
        diasFuncionamento: newData.diasFuncionamento,
      })
      .then(function (response) {
        console.log("Restaurante salvo com sucesso.");
      });
  }

  function handleUpdate(newData, oldData) {
    axios
      .post("http://localhost:8080/api/v1/restaurantes", {
        id: newData.id,
        nome: newData.nome,
        endereco: {id: newData.idEndereco},
        pessoaResponsavel:  {id: newData.idPessoaResponsavel},
        capacidadeRefeicoes: newData.capacidadeRefeicoes,
        horarioCafeManha: newData.horarioCafeManha !== oldData.horarioCafeManha ? format(new Date(newData.horarioCafeManha), 'HH:mm:ss') : newData.horarioCafeManha,
        horarioAlmoco: newData.horarioAlmoco !== oldData.horarioAlmoco ? format(new Date(newData.horarioAlmoco), 'HH:mm:ss') : newData.horarioAlmoco,
        horarioJantar: newData.horarioJantar !== oldData.horarioJantar ? format(new Date(newData.horarioJantar), 'HH:mm:ss') : newData.horarioJantar,
        diasFuncionamento: newData.diasFuncionamento,
      })
      .then(function (response) {
        console.log("Restaurante atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete(`http://localhost:8080/api/v1/restaurantes/${newData.id}`)
      .then(function (response) {
        console.log("Restaurante deletado com sucesso.");
      });
  }

  return (
    <MaterialTable
      title="Gereciamento de Restaurantes"
      columns={[
        { title: "Id", field: "id" },
        { title: "Nome", field: "nome" },
        { title: "Endereço", field: "idEndereco", lookup: lookupDataEndereco },
        { title: "Pessoa Responsável", field: "idPessoaResponsavel", lookup: lookupDataPessoaResponsavel },
        { title: "Capacidade de Refeições", field: "capacidadeRefeicoes", type: "numeric"},
        { title: "Horário do Café da Manhã", field: "horarioCafeManha", type: "time" },
        { title: "Horário do Almoço", field: "horarioAlmoco", type: "time" },
        { title: "Horário da Janta", field: "horarioJantar", type: "time" },
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
              handleUpdate(newData, oldData);
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
    />
  );
};

export default GerenciamentoRestaurantes;
