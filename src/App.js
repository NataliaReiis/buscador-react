import {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});

    async function handleSearch(){
      //40830404.json/

      if(input === ''){
        alert("Preencha algum cep!")
        return;
      }

      try{
        const response = await api.get(`${input}/json`);
        setCep(response.data)
        setInput("");            

      }catch{
        alert("Ops cep nao encontrado");
        setInput("");
      }
    }

  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>

      <div className="containerInput">
        <input type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="f2f2f2"/>
        </button>
      </div>

        {Object.keys(cep).length > 0 && (
             <main className="main"> 
             <h2>CEP: {cep.cep}</h2>
   
             <span>{cep.logradouro} </span>
             <span>Complemento: {cep.complemento}</span>
             <span>{cep.bairro}</span>
             <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
      
      
    </div>
  );
}

export default App;
