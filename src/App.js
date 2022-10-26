import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FormDialog from './Modal';
import './App.css';

function App() {
  const [linhas, setLinhas] = useState([]);
  const [colunas, setColunas] = useState([]);
  const [marginBotaoColuna, setMarginBotaoColuna] = useState(10);
  const [marginBotaoLinha, setMarginBotaoLinha] = useState(-100);

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

  useEffect(() => {
    setMarginBotaoColuna(marginBotaoColuna + 50);
    console.log(marginBotaoColuna);
  }, [colunas]);

  useEffect(() => {
    setMarginBotaoLinha(marginBotaoLinha + 20);
    console.log(marginBotaoLinha);
  }, [linhas]);

  return (
    <>
    <FormDialog />
      <h1>Automato Finito</h1>
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
      <button className="botao-coluna" onClick={adicionarColuna} style={{ left: marginBotaoColuna }}>+</button>
      <button className="botao-linha" onClick={adicionarLinha} style={{ top: marginBotaoLinha }}>+</button>
      </>
  );
}

export default App;
