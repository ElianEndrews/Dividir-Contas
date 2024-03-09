  import React, { useState } from 'react';
  import './style.css';

  let produto_id = 0;

  export default function Formulario({ addProduct, products, cardNames, total }) { // Recebendo products e cardNames como props
    const [nomeProduto, setNomeProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState('');
    const [pessoasSelecionadas, setPessoasSelecionadas] = useState(['casa']);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Verifica se o preço foi preenchido
      if (!precoProduto) {
          alert('Por favor, preencha o preço do produto.');
          return;
        }
        // Verifica se pelo menos uma pessoa foi selecionada
        if (pessoasSelecionadas.length === 0) {
          alert('Por favor, selecione pelo menos uma pessoa.');
          return;
        }
      const id_produto = produto_id;
      let produto = {
        id_produto: id_produto,
        id: pessoasSelecionadas.map(item => {
          if (item === 'casa') {
              return 0;
            } else {
              const lowerCaseCardNames = cardNames.map(name => name.toLowerCase()); // Converter todos os elementos de cardNames para minúsculas
              return lowerCaseCardNames.indexOf(item.toLowerCase()) + 1;
            }
        }),
        nome: nomeProduto || '-',
        valor: precoProduto
      };
      addProduct(produto);
      // Incrementa o id do produto
      produto_id++;
      // Reinicia os estados do formulário
      setNomeProduto('');
      setPrecoProduto('');
      setPessoasSelecionadas(['casa']);
      produto = [];
    };

    const handleCheckboxChange = (pessoa) => {
      setPessoasSelecionadas(prevSelection => {
        if (pessoa === 'casa') {
          if (prevSelection.includes('casa')) {
            return prevSelection.filter((p) => p !== pessoa);
          } else {
            return ['casa'];
          }
        } else {
          const updatedSelection = prevSelection.includes('casa') ? prevSelection.filter(p => p !== 'casa') : [...prevSelection];
          const index = updatedSelection.indexOf(pessoa);
          if (index === -1) {
            updatedSelection.push(pessoa);
          } else {
            updatedSelection.splice(index, 1);
          }
          if (updatedSelection.length === cardNames.length) {
            return ['casa'];
          }
          return updatedSelection;
        }
      });
    };

    return (
      <form className="formulario-container" onSubmit={handleSubmit}>
        <div className='dados'>
          <div>
            <label>
              Nome do Produto:
              <input
                type="text"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Preço do Produto:
              <input
                type="number"
                value={precoProduto}
                onChange={(e) => setPrecoProduto(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Enviar</button>
          <p className='valor-total'>Total: {total.toFixed(2)}</p>
        </div>
        <div className = 'checkbox'>
          <div>
            <label key='0'>
              <input
                type="checkbox"
                checked={pessoasSelecionadas.includes('casa')}
                onChange={() => handleCheckboxChange('casa')}
              />
              <p>Casa</p>
            </label>
            {cardNames.map((cardName, index) => (
              <label key={index + 1}>
                <input
                  type="checkbox"
                  checked={pessoasSelecionadas.includes(cardName.toLowerCase())}
                  onChange={() => handleCheckboxChange(cardName.toLowerCase())}
                />
                <p>{cardName}</p>
              </label>
            ))}
          </div>
        </div>
      </form>
    );
  }
