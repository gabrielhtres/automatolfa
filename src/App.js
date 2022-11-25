import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [linhas, setLinhas] = useState([]);
  const [colunas, setColunas] = useState([]);
  const [arrayColunas, setArrayColunas] = useState([]);
  const [matrizLinhas, setMatrizLinhas] = useState([]);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [resultado, setResultado] = useState(null);

  function organizaTabela() {
    let novosDadosTabela = [...dadosTabela];

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
    setArrayColunas([]);
    setMatrizLinhas([]);
    setResultado(null);
  }

  function geraArrayDados(event) {
    console.log(event);
    if(linhas.length === 0 || colunas.length === 0) {
      return false;
    }

    for(let i=0; i < event.target.length; i++) {
      if(event.target[i].type === 'text' && i < event.target.length - 2) {

        if(event.target[i].name.includes('coluna')) {
          // console.log(event.target[i].name)
          let arrayColunasAlt = arrayColunas;
          arrayColunasAlt.push(event.target[i].value);
          setArrayColunas(arrayColunasAlt);
        }

        if(event.target[i].name.includes('linha')) {
          let matrizLinhasAlt = matrizLinhas;
          matrizLinhasAlt.push([event.target[i].value]);
          setMatrizLinhas(matrizLinhasAlt);
        }

        if(event.target[i].name.includes('-')) {
          let posicao = event.target[i].name.split('-')[0];
          let arrayLinhas = matrizLinhas;
          arrayLinhas[posicao-1].push(event.target[i].value);
          setMatrizLinhas(arrayLinhas);
        }
      }
    }
    
    // console.log('arrayColunas', arrayColunas);
    // console.log('matrizLinhas', matrizLinhas);
  }

  function determinizaAutomato() {
    let naoTerminaisAAdicionar = [];

    console.log('colunas:', arrayColunas);
    console.log('linhas: ', matrizLinhas);
    matrizLinhas.map(linha => {
      linha.map((item, index) => {
        if(index > 0) {
          if(item.length > 1) {
            if(!naoTerminaisAAdicionar.includes(item)) {
              naoTerminaisAAdicionar.push(item);
            }
          }
        }
      })
    })

    let novaMatrizLinhas = matrizLinhas;

    naoTerminaisAAdicionar.map((naoTerminal) => {
      let novaLinha = [];
      novaLinha.push(naoTerminal);
      let aConferir = naoTerminal.split(',');
      aConferir.map(letra = > {
        
      });

      })
    })
  }

  function testaEntrada(event) {
    // let proximaLinha = '';

    event.preventDefault();
    
    geraArrayDados(event);
    determinizaAutomato();
    // // console.log(dadosTabela);

    let stringEnviada = document.getElementsByTagName('input').string.value;

    // console.log('string: ', stringEnviada);

    // for(let i=0; i<stringEnviada.length;i++) {
    //   if(!arrayColunas.includes(stringEnviada[i])) {
    //     setResultado(false);
    //     return;
    //   }
    // }

    // console.log(matrizLinhas);

    // for(let i=0; i<stringEnviada.length;i++) {
    //   let indexCaractere = arrayColunas.indexOf(stringEnviada[i]);
    //   console.log(indexCaractere);
    //   if(i===0) {
    //     proximaLinha = matrizLinhas[0][indexCaractere+1];
    //     console.log(proximaLinha);
    //     continue;
    //   }

    //   let linhaAtual = matrizLinhas.find(array => array[0] === proximaLinha);
      
    //   proximaLinha = linhaAtual[indexCaractere+1];
    //   console.log(proximaLinha);
    // }

    // if(terminais.includes(proximaLinha)) {
    //   setResultado(true);
    // }

  }

  useEffect(() => {
    organizaTabela();
    // eslint-disable-next-line
  }, [colunas, linhas]);

  return (
    <form onSubmit={testaEntrada} className='app'>
        <h1>Reconhecedor de Automato Finito Não Deterministico</h1>
        <div className='botoes'>
          <button type="button" onClick={adicionarColuna}>Adicionar Coluna</button>
          <button type="button" onClick={resetarTabela}>Resetar</button>
          <button type="button" onClick={adicionarLinha}>Adicionar Linha</button>
        </div>
        <div className='botoes'>
          <button type="button" onClick={removerColuna}>Remover Última Coluna</button>
          <button type="button" onClick={removerLinha}>Remover Última Linha</button>
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
        <label htmlFor='string'>Digite sua string a ser testada:</label>
        <input name='string' className='input-string'></input>
        <button className='botao-enviar' id="submit" type='submit'>Verificar</button>
        {resultado === null ? (<h3>Aguardando entrada</h3>) : ''}
        {resultado === true ? <h3>String aceita</h3> : ''}
        {resultado === false ? <h3>String recusada</h3>: ''}
      </form>
  );
}

export default App;
