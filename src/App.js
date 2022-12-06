import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [linhas, setLinhas] = useState([]);
  const [colunas, setColunas] = useState([]);
  const [arrayColunas, setArrayColunas] = useState([]);
  const [matrizLinhas, setMatrizLinhas] = useState([]);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [estadosFinais, setEstadosFinais] = useState([]);

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

  function setaEstadosFinais() {
    let finais = estadosFinais;

    console.log('matriz linhas daqui', matrizLinhas);
    console.log('finais daqui', estadosFinais);

    estadosFinais.forEach(final => {
      matrizLinhas.forEach(linha => {
        if(linha[0].includes(final) && linha[0].length > 1) {
          finais.push(linha[0]);
        }
      })
    }) 

    console.log('novoes finais', finais);
    setEstadosFinais(finais);
  }

  function ajustaNaoTerminaisInicial() {
    let finais = [];
    let novasLinhasAjustadas = matrizLinhas.map(linha => {
      if(linha[0].includes('*')) {
        finais.push(linha[0]);
        linha[0] = linha[0].replace('*', '');
        return linha;
      } else {
        return linha;
      }
    });

    console.log('finais dessa bosta', finais);
    let finaisAjustados = finais.map(final => {
      if(final.includes('*')) {
        return final.replace('*', '');
      } else {
        return final;
      }
    })

    console.log('finais tirando *', finaisAjustados);

    setEstadosFinais(finaisAjustados);
    setMatrizLinhas(novasLinhasAjustadas);

    return finaisAjustados;
  }

  function ajustaNovaRegra(regra) {
    let arrayRegra = regra.split(',');
    let arrayRegraAjustada = [];
    let regraAjustada = '';

    console.log('regra pra arrumar', regra);

    arrayRegra.forEach(element => {
      if(!arrayRegraAjustada.includes(element)) {
        arrayRegraAjustada.push(element);
      }
    });

    arrayRegraAjustada.forEach((element, index) => {
      if(index === 0) {
        if(element !== '-') {
          regraAjustada += element;
        }
      } else {
        if(element !== '-') {
          if(regraAjustada === '') {
            regraAjustada += element;
          } else {
            regraAjustada += `,${element}`; 
          }
        }
      }
      
    });

    return regraAjustada;

  }

  function determinizaAutomato(naoTerminaisAAdicionar) {
    console.log('param: ', naoTerminaisAAdicionar);

    let colunas = arrayColunas;
    let novasLinhas = matrizLinhas;
    let novosNaoTerminaisGerados = [];

    matrizLinhas.map(linha => {
      linha.map((item, index) => {
        if(index > 0) {
          if(item.length > 1) {
            console.log('item q entrou no if', item);
            if(!naoTerminaisAAdicionar.includes(item)) {
              naoTerminaisAAdicionar.push(item);
            }
          }
        }
      })
    })

    console.log('nao terminais add:', naoTerminaisAAdicionar)

    naoTerminaisAAdicionar.map((naoTerminal) => {
      let novaLinha = [];
      novaLinha.push(naoTerminal);
      
      let aConferir = naoTerminal.split(',');

      colunas.map((estado, indexColuna) => {
        let novaRegra = '';
        aConferir.map((letra, index) => {
          for(let i = 0; i < matrizLinhas.length; i++) {
            if(matrizLinhas[i][0] === letra) {
              if(index === 0) {
                if(matrizLinhas[i][indexColuna+1] !== '-') {
                  novaRegra += matrizLinhas[i][indexColuna+1];
                }
              } else {
                if(matrizLinhas[i][indexColuna+1] !== '-' && novaRegra !== '') {
                  novaRegra += `,${matrizLinhas[i][indexColuna+1]}`;
                } else if(matrizLinhas[i][indexColuna+1] !== '-' && novaRegra === '') {
                  novaRegra += matrizLinhas[i][indexColuna+1];
                }
            }
          }
        }
        if(!naoTerminaisAAdicionar.includes(ajustaNovaRegra(novaRegra)) &&
           ajustaNovaRegra(novaRegra).length > 1 &&
           !novosNaoTerminaisGerados.includes(ajustaNovaRegra(novaRegra))) {
          novosNaoTerminaisGerados.push(ajustaNovaRegra(novaRegra));
        }
        });
        novaLinha.push(ajustaNovaRegra(novaRegra));
      })
      novasLinhas.push(novaLinha);
      });

      setMatrizLinhas(novasLinhas);

      console.log('novos nao terminais:', novosNaoTerminaisGerados);
      console.log('matriz linhas: ', matrizLinhas);

      if(novosNaoTerminaisGerados.length > 0) {
        determinizaAutomato(novosNaoTerminaisGerados);
      }
  }

  function testaEntrada(event) {
    let flagFinal = false;
    event.preventDefault();
    
    geraArrayDados(event);
    let finais = ajustaNaoTerminaisInicial();
    determinizaAutomato([]);
    setaEstadosFinais();

    // console.log(matrizLinhas);
    // console.log('ESTADOS FINAIS:', estadosFinais);

    let stringEnviada = document.getElementsByTagName('input').string.value;
    let proximaLinha = '';

    for(let i=0; i<stringEnviada.length;i++) {
      if(!arrayColunas.includes(stringEnviada[i])) {
        setResultado(false);
        return;
      }
    }

    for(let i=0; i<stringEnviada.length;i++) {
      let indexCaractere = arrayColunas.indexOf(stringEnviada[i]);
      
      if(i===0) {
        proximaLinha = matrizLinhas[0][indexCaractere+1];
        continue;
      }

      let linhaAtual = matrizLinhas.find(array => array[0] === proximaLinha);
      
      proximaLinha = linhaAtual[indexCaractere+1];
    }

    console.log('ultima linha', proximaLinha);
    console.log('finais do testa entrada', finais);

    finais.forEach(final => {
      console.log('cada final', final);
      if(proximaLinha.includes(final)) {
        
        flagFinal = true;
      }
    })

    console.log('linha final', proximaLinha);

    if(flagFinal) {
      console.log('entrou no if com true')
      setResultado(true);
    } else {
      console.log('entrou no if com false')
      setResultado(false);
    }
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
