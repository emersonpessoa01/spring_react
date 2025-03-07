import React from "react";

const Tabela = ({ vetor, selecionar }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          {vetor.map((produto, index) => (
            <tr key={index}>
              <td data-label="#">{index + 1}</td>
              <td data-label="Nome">{produto.nome}</td>
              <td data-label="Marca">{produto.marca}</td>
              <td>
                <button className="btn btn-success" onClick={()=>{selecionar(index)}}>Selecionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabela;
