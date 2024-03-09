import React from 'react';
import './style.css';

function Header({ onEditProducts, onEditPeople, onPrintList}) {
  return (
    <header>
      <h1>Dividindo as contas</h1>
      <div className="buttons-container">
        <button className="edit-button" onClick={onEditProducts}>Editar Produtos</button>
        <button className="edit-button" onClick={onEditPeople}>Editar Pessoas</button>
        <button className="edit-button" onClick={onPrintList}>Imprimir lista</button>
      </div>
    </header>
  );
}


export default Header;