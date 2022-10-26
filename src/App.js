import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FormDialog from './Modal';
import './App.css';

function App() {
  const [linhas, setLinhas] = useState([]);
  const [colunas, setColunas] = useState([]);
  const [dadosTabela, setDadosTabela] = useState([]);

  function organizaTabela() {
    let novosDadosTabela = [];
    // for(let i=0; i<linhas.length; i++) {
    //   novosDadosTabela.push([]);
    // }

    let teste = [[], []];
    teste[1][1] = 'teste';
    console.log('teste', teste);

    for(let i=0; i<colunas.length; i++) {
      console.log('entrou no for')
      for(let j=0; j<linhas.length; j++) {
        novosDadosTabela[i][j] = 'teste';
      }
    }

    console.log('novos dados', novosDadosTabela);

    setDadosTabela(novosDadosTabela);
  }

  function adicionarColuna() {
    const novasColunas = [...colunas];
    novasColunas.push(<input></input>);
    setColunas(novasColunas);
    organizaTabela();
  }

  function adicionarLinha() {
    const novasLinhas = [...linhas];
    const novosDadosTabela = [...dadosTabela];
    console.log('dados tabela', novosDadosTabela);
    novosDadosTabela.push([]);
    novasLinhas.push(<input></input>);
    setDadosTabela(novosDadosTabela);
    setLinhas(novasLinhas);
    organizaTabela();
  }

  function resetarTabela() {
    setLinhas([]);
    setColunas([]);
  }

  return (
    <div className='app'>
      {/* <FormDialog /> */}
        <h1>Automato Finito</h1>
        <div className='botoes'>
          <button onClick={adicionarColuna}>Adicionar Coluna</button>
          <button onClick={adicionarLinha}>Adicionar Linha</button>
          <button onClick={resetarTabela}>Resetar</button>
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
      </div>
  );
}

export default App;
