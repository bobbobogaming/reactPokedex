import { Component } from "react";
import { ButtonStyle, ReactButton, ReactCard } from "./components";
import "./style/pokeList.css";
import { PokemonPager } from "./PokeApi";

export class PokeList extends Component{
    pager
    constructor(props){
        super(props);
        this.pager = new PokemonPager();
    }
    async componentDidMount(){
        let currentPageData = await this.pager.fetchCurrent();
        this.setState({
            pageNo: currentPageData.pageNo, 
            maxPageNo: currentPageData.maxPageNo,
            pokemonListItems: currentPageData.pokemons.map( pokemon =>
                <ReactCard key={pokemon.id} className={"pokemonListItem"}>
                    <p>#{pokemon.id}</p>
                    <h4>{pokemon.name}</h4>
                </ReactCard>
            )
        })
        /*for (let i = 0; i < 16; i++) {
            array.push(
                <ReactCard key={i} className={"pokemonListItem"} onClick={() => {}}>
                    <p>#{i+1}</p>
                    <h4>Bulbasaur</h4>
                </ReactCard>
            );
        }*/
    }

    handleNewPage = (data) => {
        this.setState({
            pageNo: data.pageNo, 
            maxPageNo: data.maxPageNo,
            pokemonListItems: data.pokemons.map( pokemon =>
                <ReactCard key={pokemon.id} className={"pokemonListItem"}>
                    <p>#{pokemon.id}</p>
                    <h4>{pokemon.name}</h4>
                </ReactCard>
            )
        })
    }
    
    state={
        pageNo:1,
        maxPageNo: 0,
        pokemonListItems: []
    }

    render(){
        return (
            <ReactCard className={"rightContainer"}>
                <div className="listGrid">
                    {this.state.pokemonListItems}
                </div>
                <div className="listNavigation">
                    <ReactButton buttonStyle={ButtonStyle.danger} onClick={async()=>this.handleNewPage(await this.pager.fetchPrev())}>Previous</ReactButton>
                    <p>Page <input value={this.state.pageNo} type="number" min="1" max="100" style={{width: 60+"px"}} />/{this.state.maxPageNo}</p>
                    <ReactButton buttonStyle={ButtonStyle.danger} onClick={async()=>this.handleNewPage(await this.pager.fetchNext())}>Next</ReactButton>
                </div>
            </ReactCard>
        )
    }
}