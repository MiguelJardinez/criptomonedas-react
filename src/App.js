import React, { useState, useEffect } from 'react';
import Cripto from './assets/statics/cryptomonedas.png'
import axios from 'axios';
import styled from '@emotion/styled';

//Componentes
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner';



const Contenedor = styled.div`
  max-width: 900px; 
  margin: 0 auto; 

  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  margin-top: 5rem; 
  max-width: 100%; 
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive; 
  color: white; 
  text-align: left; 
  font-weight: 700; 
  font-size:50px; 
  margin-bottom: 50px; 
  margin-top: 80px; 

  &::after{
    content: ''; 
    width: 100px; 
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

//Components


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      // evitamos ejecución la primera vez
      if (moneda === '') return;

      //Vamos a consultar la API para calcular el tipo de cambio
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);
      //Mostrar el spinner
      guardarCargando(true);

      //ocualtar el spinner y mostrar el resultado
      setTimeout(() => {

        guardarCargando(false);

        //Guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      }, 2500);

    }

    cotizarCriptomoneda();


  }, [moneda, criptoMoneda]);


  //Mostrar el spinner o el resultado 
  const componente = (cargando ? <Spinner /> : <Cotizacion resultado={resultado} />)

  return (
    <Contenedor>
      <div>
        <Imagen
          src={Cripto}
          alt="Imagen Cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
