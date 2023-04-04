import React, { useState, useEffect } from 'react';

function Dropdown() {
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const getEstados = () => {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setEstados(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getMunicipios = (idEstado) => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMunicipios(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getEstados();
  }, []);

  return (
    <div>
      <select onChange={(event) => getMunicipios(event.target.value)}>
        {estados.map(estado => (
          <option key={estado.id} value={estado.id}>{estado.nome}</option>
        ))}
      </select>
      <ul style={{maxHeight: "200px", overflow: "scroll"}}>
        {municipios.map(municipio => (
          <li key={municipio.id}>{municipio.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
