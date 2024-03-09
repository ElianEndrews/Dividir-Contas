import React, { useState } from 'react';
import '../style.css';

export const EditPeople = ({ cardNames: initialCardNames, onClose, handleEditPeople }) => {
  const [editedNames, setEditedNames] = useState(Array.from(initialCardNames));
  const [numberOfInputs, setNumberOfInputs] = useState(initialCardNames.length);

  const handleInputChange = (index, value) => {
    const updatedNames = [...editedNames];
    updatedNames[index] = value;
    setEditedNames(updatedNames);
  };

  const handleEditClick = () => {
    if (editedNames.some(name => name.trim() === '')) {
        alert('Por favor, preencha todos os nomes.');
        return;
      }
    const editedNamesLowercase = editedNames.map(name => name.toLowerCase());
    const trimmedNames = editedNamesLowercase.map(name => name.trim());
    // Verifica se há nomes duplicados
    const hasDuplicates = trimmedNames.some((name, index) => trimmedNames.indexOf(name) !== index);
    if (hasDuplicates) {
      // Se houver nomes duplicados, exibe uma mensagem de erro
      alert('Não é possível salvar nomes iguais. Por favor, verifique os nomes e tente novamente.');
      return;
    }
    handleEditPeople(editedNames); // Chama a função de manipulação de nomes com os nomes editados
  };

  const handleSelectorChange = (e) => {
    const newNumberOfInputs = parseInt(e.target.value);
    setNumberOfInputs(newNumberOfInputs);
    // Redefina os nomes editados com base no novo número de inputs
    setEditedNames(Array(newNumberOfInputs).fill(''));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Editar Pessoas</h2>
        <label>Quantidade de pessoas</label>
        <select className='people-select' onChange={handleSelectorChange} value={numberOfInputs}>
          {[2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
        <div className="product-list">
          {Array.from({ length: numberOfInputs }).map((_, index) => (
            <div key={index} className="product-item">
              <input
                type="text"
                value={editedNames[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="edit-button" onClick={handleEditClick}>Editar</button>
      </div>
    </div>
  );
};

export default EditPeople;
