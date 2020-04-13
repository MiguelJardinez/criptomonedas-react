import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

//Importar componentes 
import Error from './Error'


//Importar hook personalizado
import useMoneda from '../hooks/useMoneda'; 
import useCriptomoneda from '../hooks/useCriptomonedas';
import axios from 'axios';

const Button = styled.input`
    margin-top: 20px; 
    font-weight: 700; 
    font-size: 22px; 
    padding: 10px; 
    background-color: #66a2fe; 
    border: none; 
    width: 100%;
    border-radius: 5px; 
    color: white; 
    cursor: pointer; 
    transition: all 300ms ease; 
    text-transform: uppercase; 

    &:hover{
        background-color: #326ac0; 
    }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {

    // state del listado de criptomonedas
    const [ listaCripto, guardarCriptomonedas] = useState([]);

    //state para guardar los errores del formulario
    const [ error, guardarError ] = useState(false); 

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de estados unidos'},
        {codigo: 'MXN', nombre: 'Peso de México'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra esterlina'}
    ];

    //Utilizar Hook personalizado para las monedas
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);

    //Utilizar Hook para las criptomonedas
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto);

    //Hacer el llamado a la API
    useEffect( () => {

        const ConsulatAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data)
        }

        ConsulatAPI()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // validar si ambos campos estan llenos 
        if( moneda === '' || criptomoneda === '' ){
            guardarError(true); 
            return;
        }

        //Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda); 
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            { error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />
            <SelectCripto />

            <Button
                type= "submit"
                value= "calcular"
            ></Button>
        </form>
     );
}
 
export default Formulario;