import React, { useState } from 'react';
import './App.css';

import Header from './componentes/Header/';
import Footer from './componentes/Footer/';
import HomePage from './componentes/HomePage/';
import EditProducts from './componentes/Edit/products/EditProducts';
import EditPeople from './componentes/Edit/people/EditPeople';
import PrintList from './componentes/Edit/print/printList';

function App() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditPeopleOpen, setIsEditPeopleOpen] = useState(false);
  const [isPrintListOpen, setIsPrintListOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cardNames, setCardNames] = useState(['Pessoa 1', 'Pessoa 2', 'Pessoa 3']);
  const [total, setTotal] = useState(0);

  const addProduct = (newProduct) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, newProduct];
      updateTotal(updatedProducts); // Calcular o novo total após a atualização do estado
      console.log(products);
      return updatedProducts; // Retornar o novo estado atualizado
    });
  };

  const updateTotal = (updatedProducts) => {
    let newTotal = updatedProducts.reduce((acc, product) => acc + parseFloat(product.valor), 0);
    setTotal(newTotal);
  };

  const openEditProductsModal = () => {
    setIsEditOpen(true);
  };

  const openEditPeopleModal = () => {
    setIsEditPeopleOpen(true);
  };

  const openPrintListModal = () => {
    setIsPrintListOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setIsEditPeopleOpen(false);
    setIsPrintListOpen(false);
  };

  const handleEditPeople = (editedNames) => {
    setCardNames([...editedNames]);
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.map(product => {
        const updatedIds = product.id.filter(id => id <= editedNames.length);
        return { ...product, id: updatedIds }; // Atualiza o produto com os IDs modificados
      });
      return updatedProducts; // Retorna os produtos atualizados
    });
    closeEditModal();
  };

  const handleEditProduct = (id, newName, newPrice) => {
    const index = products.findIndex(product => product.id_produto === id);
    if (index !== -1) {
        const updatedProduct = {
            ...products[index],
            nome: newName,
            valor: newPrice
        };
        const updatedProducts = [...products];
        updatedProducts[index] = updatedProduct;
        setProducts(updatedProducts);
        updateTotal(updatedProducts);
    }
};

const handleDeleteProduct = (id) => {
  const updatedProducts = products.filter(product => product.id_produto !== id);
  setProducts(updatedProducts);
  updateTotal(updatedProducts);
};


  return (
    <div className="App">
      <Header onEditProducts={openEditProductsModal} onEditPeople={openEditPeopleModal} onPrintList={openPrintListModal}/>
      <HomePage products={products} cardNames={cardNames} addProduct={addProduct} total={total}/>
      <Footer />
      {isEditOpen && <EditProducts onClose={closeEditModal} products={products} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct}/>}
      {isEditPeopleOpen && <EditPeople onClose={closeEditModal} cardNames={cardNames} handleEditPeople={handleEditPeople}/>}
      {isPrintListOpen && <PrintList onClose={closeEditModal} cardNames={cardNames} products={products}/>}
    </div>
  );
}



export default App;
