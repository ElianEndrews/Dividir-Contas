import React, { useState } from 'react';
import './style.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const PrintList = ({ cardNames: initialCardNames, onClose, products }) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleToggleSelection = (name) => {
    // Verifica se o nome já foi selecionado
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((n) => n !== name)); // Remove o nome da lista de seleção
    } else {
      setSelectedNames([...selectedNames, name]); // Adiciona o nome à lista de seleção
    }
  };

  const handlePrintClick = () => {
    generatePDF(selectedNames);
  };

  const generatePDF = (selectedPeople) => {
    const doc = new jsPDF();

    selectedPeople.forEach((person, index) => {
      const filteredProducts = products.filter(product => product.id.includes(initialCardNames.indexOf(person) + 1) || product.id.includes(0));
      const totalPeopleCount = initialCardNames.length;

      let tableRows = [];
      let totalPrice = 0;

      // Monta as linhas da tabela para esta pessoa
      filteredProducts.forEach(product => {
        let pricePerPerson = 0;
        if (product.id.includes(0)) { // Se o produto for da casa
          pricePerPerson = parseFloat(product.valor) / totalPeopleCount; // Divide pelo número total de pessoas (excluindo a casa)
        } else { // Se o produto não for da casa
          pricePerPerson = parseFloat(product.valor) / product.id.length; // Divide pelo número de pessoas que compraram o produto
        }
        totalPrice += pricePerPerson;
        const peopleWhoBought = product.id.map(id => id === 0 ? 'Casa' : initialCardNames[id - 1]);
        const row = [product.nome, peopleWhoBought.join(', '), product.valor, pricePerPerson.toFixed(2)];
        tableRows.push(row);
      });

      tableRows.push(['Total', '', '', totalPrice.toFixed(2)]);

      doc.text(`Nome: ${person}`, 14, 10);
      doc.text(`Total: ${totalPrice.toFixed(2)}`, 150, 10);
      doc.autoTable({
        startY: 20,
        head: [['Nome do produto', 'Pessoas que compraram', 'Preço total', 'Preço dividido']],
        body: tableRows
      });
      if (index < selectedPeople.length - 1) {
        doc.addPage();
      }
    });

    // Abre o PDF em uma nova aba
    const string = doc.output('datauristring');
    const iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Imprimir Lista</h2>
        <div className="person-list">
          {initialCardNames.map((name) => (
            <label key={name}>
              <input
                type="checkbox"
                checked={selectedNames.includes(name)}
                onChange={() => handleToggleSelection(name)}
              />
              <p>{name}</p>
            </label>
          ))}
        </div>
        <button className="edit-button" onClick={handlePrintClick}>Imprimir</button>
      </div>
    </div>
  );
};

export default PrintList;
