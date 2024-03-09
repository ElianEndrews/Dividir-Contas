import React from 'react';
import './style.css';

export default function Card({ name, data, totalCards }) {
  const calculateCardWidth = () => {
    const cardWidthPercentage = (100 / totalCards) - 3;
    return `${cardWidthPercentage}%`;
  };

  const colorFilter = (pessoa) =>{
    if(pessoa == 0){
      return '#2ecc71';
    }else if(pessoa.length > 1){
      return '#f39c12';
    }else{
      return '#e74c3c';
    }
  }

  const calcularTotal = () => {
    let total = 0;
    data.produtos.forEach(produto => {
      const quantidadeIds = produto.id.filter(id => id !== 0).length;
      const valorPorId = produto.valor / (quantidadeIds > 0 ? quantidadeIds : totalCards);
      total += valorPorId;
    });
    return total.toFixed(2);
  };

  function limitarTexto(nome){
    let nomeLimitado = "";
    if(nome.length > 30 ){
      nomeLimitado = nome.substring(0, 30 - 3) + '...';
    }
    if(nome.length < 30){
      nomeLimitado = nome.padEnd(30, ' ');
    }
    return nomeLimitado;
  }

  return (
    <div className="card-container" style={{ width: calculateCardWidth() }}>
      <div className="card-header">
        <h2>{name}</h2>
        <p>Total: R$ {calcularTotal()}</p>
      </div>

      <table className="card-table">
        <thead>
          <tr>
            <th className='coluna-1'>Nome</th>
            <th className='coluna-2'>Ordem</th>
            <th className='coluna-3'>Preço</th>
          </tr>
        </thead>
        <tbody>
          {data.produtos.map((produto, index) => (
            <tr key={index} style={{ color: colorFilter(produto.id) }}>
              <td >{limitarTexto(produto.nome)}</td>
              <td>{produto.id_produto + 1}</td>
              <td>R$ {(produto.id.includes(0) ? produto.valor / 3 : produto.valor / produto.id.length).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
