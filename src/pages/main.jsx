import React , { Component } from 'react';
import Axios from 'axios';

import '../styles/main.css';

export default class Main extends Component {
    
    state = {
        pokemons : [],
        nextPokemons : {},
        previousPokemons: {},
    }

    componentDidMount() {
        this.loadPokemons();
    }

    loadPokemons = async(url = null) => {
        try {
            const response = await Axios.get(url);
            const pokemons = response.data.results;
            const nextPokemons  = {
                next:response.data.next,
            }
            const previousPokemons = {
                previous:response.data.previous,
            }
            this.setState({pokemons, previousPokemons, nextPokemons})    
        } catch {
            const response = await Axios.get('https://pokeapi.co/api/v2/pokemon');
            const pokemons = response.data.results;
            const nextPokemons  = {
                next:response.data.next,
            }
            const previousPokemons = {
                previous:response.data.previous,
            }
            this.setState({pokemons, previousPokemons, nextPokemons})    
        }
    }

    nextList = () => {
        const { nextPokemons } = this.state;
        if(nextPokemons.next === null) return
        const nextPage = nextPokemons.next;
        this.loadPokemons(nextPage);
    }

    previousList = () => {
        const { previousPokemons } = this.state;
        if(previousPokemons.previous === null) return
        const prevPage = previousPokemons.previous;
        this.loadPokemons(prevPage);
    }

    render() {
        const { pokemons } = this.state
        return (
            <div className='pokemon-list' >
                {pokemons.map(pokemon => (
                    <article id={pokemon.name}>
                        <strong>
                            {pokemon.name}
                        </strong>
                    </article>
                ))}
                <div className='actions'>
                    <button onClick={this.previousList} >Anterior</button>
                    <button onClick={this.nextList} >Proximo</button>
                </div>
            </div>
        )
    }
}   
