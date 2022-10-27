import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormDialog from './Modal';
import './App.css';

function App() {
  const [linhas, setLinhas] = useState([]);
  const [colunas, setColunas] = useState([]);
  const [dadosTabela, setDadosTabela] = useState([]);

  function organizaTabela() {
    let novosDadosTabela = [...dadosTabela];
    // for(let i=0; i<linhas.length; i++) {
    //   novosDadosTabela.push([]);
    // }

    for(let i=0; i<linhas.length; i++) {
      for(let j=0; j<colunas.length; j++) {
        novosDadosTabela[i][j] = <input name={`${i+1}-${j+1}`}></input>;
      }
    }

    setDadosTabela(novosDadosTabela);
  }

  function adicionarColuna() {
    const novasColunas = [...colunas];
    novasColunas.push(<input name={`coluna${colunas.length + 1}`}></input>);
    setColunas(novasColunas);
  }

  function adicionarLinha() {
    const novasLinhas = [...linhas];
    novasLinhas.push(<input name={`linha${linhas.length + 1}`}></input>);
    const novosDadosTabela = [...dadosTabela];
    novosDadosTabela.push([]);
    setDadosTabela(novosDadosTabela);
    setLinhas(novasLinhas);
  }

  function removerColuna() {
    const novasColunas = [...colunas];
    const novosDadosTabela = [...dadosTabela];
    novasColunas.pop();
    novosDadosTabela.map(item => {
      return item.pop();
    })
    setColunas(novasColunas);
  }

  function removerLinha() {
    const novasLinhas = [...linhas];
    novasLinhas.pop();
    setLinhas(novasLinhas);
  }

  function resetarTabela() {
    setLinhas([]);
    setColunas([]);
    setDadosTabela([]);
  }

  function submitForm(event) {
    event.preventDefault();
    console.log(event);
  }

  useEffect(() => {
    organizaTabela();
  }, [colunas, linhas]);

  return (
    <form onSubmit={submitForm} className='app'>
      {/* <FormDialog /> */}
        <h1>Automato Finito</h1>
        <div className='botoes'>
          <button onClick={adicionarColuna}>Adicionar Coluna</button>
          <button onClick={resetarTabela}>Resetar</button>
          <button onClick={adicionarLinha}>Adicionar Linha</button>
        </div>
        <div className='botoes'>
          <button onClick={removerColuna}>Remover Última Coluna</button>
          <button onClick={removerLinha}>Remover Última Linha</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>δ</th>
              {colunas.map(item => {
                return(<th>
                  {item}
                </th>)
              })}
            </tr>
          </thead>
          <tbody>
            {linhas.length > 0 ? linhas.map((item, index) => {
              console.log(item);
              return(<tr>
                 <td>{item}</td>
                {dadosTabela.length > 0 ? dadosTabela[index].map(item => {
                  return(
                  <td>
                    {item}
                  </td>
                  )
                }) : undefined}
              </tr>)
            }) : undefined}
            </tbody>
        </table>
        <label htmlFor='string'>Digite sua string a ser testada:</label>
        <input name='string' className='input-string'></input>
        <button className='botao-enviar' type='submit'>Verificar</button>
      </form>
  );
}

export default App;
