import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {format} from 'date-fns';

import api from '../../services/api';

function Filter() {
    const [filters, setFilters] = useState([]);
    const [token, setToken] = useState('');

    // Pegando parâmetros obtidos após o login
    const parametros = getHashParams();

    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
        }
        return hashParams;
    };

    // Objeto para pegar a data e hora atual
    const now = {
        date: format(new Date(), 'yyy-MM-dd'),
        time: format(new Date(), 'HH:mm')
    };

    // Criando conexão com a API para trazer os filtros
    const apiFilter = axios.create({
        baseURL: 'http://www.mocky.io/v2/5a25fade2e0000213aa90776'
    });

    // Carregando filtros
    async function loadFilters(){
        await apiFilter.get()
        .then(resp => { setFilters(resp.data.filters); })
        .catch(err => { console.error("ocorreu um erro" + err)});
    };
   
    useEffect(() => {
        loadFilters();
      }, []);
    
    return(
        <div>
            <h1>Filtro</h1>
            
            <span>Tipos de Filtro</span><br/>
            <select>
                {filters.map(item => <option key={item.id}>{item.name}</option>)}
            </select> <br/><br/>
            <span>Locale</span><br/>
            <select>
                {filters.filter(x => x.id == 'locale').map(v => v.values.map(item => <option key={item.value}>{item.name}</option>))}
            </select> <br/><br/>
            <span>País</span><br/>
            <select>
                {filters.filter(x => x.id == 'country').map(v => v.values.map(item => <option key={item.value}>{item.name}</option>))}
            </select> <br/><br/>

            <span>Data e horário</span><br/>
            <input type="date" value={now.date}/>
            <input type="time" value={now.time}/> <br/><br/>

            <span>Limite</span><br/>
            <input type="number" value="10"/> <br/><br/>

            <span>offset</span><br/>
            <input type="number" value="0"/> <br/><br/>

            <span>token</span><br/>
            <input type="text" value={parametros.access_token} readonly/> <br/><br/>

            <button onClick={loadFilters}>CONSULTAR</button> <br/><br/>
            <button><a href="http://localhost:8888">Logar com Spotify</a></button>
        </div>
    );
};

export default Filter;