import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive; 
    color: white;
    text-transform: uppercase; 
    font-weight: 700; 
    font-size: 2.4rem; 
    margin-top: 2rem; 
    display: block; 

`;

const Select = styled.select`
    width: 100%; 
    display: block; 
    padding: 1rem; 
    -webkit-appearance: none; 
    border-radius: 10px; 
    border: none;
    font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) =>{

    //State de nuestro Custom Hook
    const [ state, actualizarState ] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-- Selecciona tu moneda --</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    //Retornar State, Parte de la interfaz y funcion que modifica el state;
    return [state, SelectCripto, actualizarState];
}

export default useCriptomoneda; 