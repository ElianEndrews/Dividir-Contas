import React, { useState } from 'react';
import '../style.css';

export const EditProducts = ({ products, onClose, handleEditProduct, handleDeleteProduct}) => {

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');


  const handleEditClick = (id) => {
    const productToEdit = products.find(product => product.id_produto === id);
    if (productToEdit) {
      handleEditProduct(id, newName || productToEdit.nome, newPrice || productToEdit.valor);
    }
  };

  const handleDeleteClick = (id) => {
    handleDeleteProduct(id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Editar Produtos</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id_produto} className="product-item">
            <input
              type="text"
              defaultValue={product.nome}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="number"
              defaultValue={product.valor}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button className="edit-button" onClick={() => handleEditClick(product.id_produto)}>Editar</button>
            <button className="edit-button delete-button" onClick={() => handleDeleteClick(product.id_produto)}>Excluir</button>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
