import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FormDialog from './Modal';
import './App.css';

function App() {
  const [linhas, setLinhas] = useState([]);
  const [colunas, setColunas] = useState([]);

  function adicionarColuna() {
    const novasColunas = [...colunas];
    novasColunas.push('teste');
    setColunas(novasColunas);
  }

  function adicionarLinha() {
    const novasLinhas = [...linhas];
    novasLinhas.push('teste');
    setLinhas(novasLinhas);
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
            {linhas.map(item => {
                return(<tr>
                  <td>
                    {item}
                  </td>
                </tr>)
              })}
            </tbody>
        </table>
      </div>
  );
}

export default App;
