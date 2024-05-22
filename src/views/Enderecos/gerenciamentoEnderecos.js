import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoEnderecos = (props) => {
    const { useState, useEffect } = React;
    const [data, setData] = useState([]);
    useEffect(() =>{
        handleClick();   
    }, []);

    function handleClick() {
        axios
            .get("https://demo8249794.mockable.io/enderecos")
            .then((response) => {
                console.log(response)
                const enderecos = response.data.lista.map((c) => {
                    return {
                        id: c.id,
                        rua: c.rua,
                        numero: c.numero,
                        cep: c.cep,
                        cidade: c.cidade,
                        estado: c.estado,
                        pais: c.pais,
                    };
                });
                setData(enderecos);
            })
            .catch((error) => console.log(error));
    }

    function handleCreate(newData) {
        axios
        .post("", {
            id: newData.id,
            rua: newData.rua,
            numero: newData.numero,
            cep: newData.cep,
            cidade: newData.cidade,
            estado: newData.estado,
            pais: newData.pais,
        })
        .then(function(response) {
            console.log("Endereço salvo com sucesso.");
        });
    }

    function handleUpdate(newData) {
        axios
          .put("https://demo8249794.mockable.io/enderecos", {
            id: newData.id,
            rua: newData.rua,
            numero: newData.numero,
            cep: newData.cep,
            cidade: newData.cidade,
            estado: newData.estado,
            pais: newData.pais,
          })
          .then(function (response) {
            console.log("Endereço atualizado com sucesso.");
          });
      }

    function handleDelete(newData) {
        axios
          .delete("https://demo8249794.mockable.io/enderecos", {
            id: newData.id,
          })
          .then(function (response) {
            console.log("Endereço deletado com sucesso.");
          });
      }

    return [
        <MaterialTable
          title="Gerenciamento de Endereços"
          columns={[
            { title: "Id", field: "id" },
            { title: "Rua", field: "rua" },
            { title: "Número", field: "numero", type: "numerico" },
            { title: "CEP", field: "cep" },
            { title: "Cidade", field: "cidade" },
            { title: "Estado", field: "estado" },
            { title: "País", field: "pais" },
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

export default GerenciamentoEnderecos;