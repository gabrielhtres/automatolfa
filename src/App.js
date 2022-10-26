import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
        novosDadosTabela[i][j] = <input></input>;
      }
    }

    setDadosTabela(novosDadosTabela);
  }

  function adicionarColuna() {
    const novasColunas = [...colunas];
    novasColunas.push(<input></input>);
    setColunas(novasColunas);
  }

  function adicionarLinha() {
    const novasLinhas = [...linhas];
    novasLinhas.push(<input></input>);
    const novosDadosTabela = [...dadosTabela];
    novosDadosTabela.push([]);
    setDadosTabela(novosDadosTabela);
    setLinhas(novasLinhas);
  }

  function resetarTabela() {
    setLinhas([]);
    setColunas([]);
    setDadosTabela([]);
  }

  useEffect(() => {
    organizaTabela();
  }, [colunas, linhas]);

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
      </div>
  );
}

export default App;
