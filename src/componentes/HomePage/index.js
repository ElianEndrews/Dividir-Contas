import React from 'react';
import Card from './Card';
import Formulario from './Formulario';
import './style.css';


export default function HomePage({ products, cardNames, addProduct, total }) {

  // Função para verificar se um produto possui um determinado ID
  const hasId = (product, id) => product.id.includes(id);

  // Agrupando os produtos por card
  const cardsData = cardNames.map((name, index) => ({
    name: name,
    produtos: products.filter(product => hasId(product, index + 1) || hasId(product, 0))
  }));

  return (
    <div className='Home-page'>
      <Formulario addProduct={addProduct} products={products} cardNames={cardNames} total={total}/>
      <div className='Dados' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cardsData.map((cardData, index) => (
          <Card key={index} name={cardNames[index]} data={cardData} totalCards={cardNames.length} products={products} />
        ))}
      </div>
    </div>
  );
}
