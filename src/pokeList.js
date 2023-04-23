import { Component, createRef } from "react";
import { ButtonStyle, ReactButton, ReactCard } from "./components";
import "./style/pokeList.css";
import { PokemonPager } from "./PokeApi";

export class PokeList extends Component{
    constructor(props){
        super(props);
        this.pager = new PokemonPager();
        this.pageNo = createRef(null);
    }
    async componentDidMount(){
        let currentPageData = await this.pager.fetchCurrent();
        this.pageNo.current.value = currentPageData.pageNo
        this.setState({
            maxPageNo: currentPageData.maxPageNo,
            pokemonListItems: currentPageData.pokemons.map( pokemon =>
                <ReactCard key={pokemon.id} className={"pokemonListItem"} onClick={()=>this.props.handleSection(pokemon.name)}>
                    <p>#{pokemon.id}</p>
                    <h4>{pokemon.name}</h4>
                </ReactCard>
            )
        })
    }

    handleNewPage = (data) => {
        if(data){
            this.pageNo.current.value = data.pageNo
            this.setState({
                maxPageNo: data.maxPageNo,
                pokemonListItems: data.pokemons.map( pokemon =>
                    <ReactCard key={pokemon.id} className={"pokemonListItem"} onClick={()=>this.props.handleSection(pokemon.name)}>
                        <p>#{pokemon.id}</p>
                        <h4>{pokemon.name}</h4>
                    </ReactCard>
                )
            })
        }
    }

    handlePageNoChange = async (pageNo) => {
        if (pageNo > this.state.maxPageNo) pageNo = this.state.maxPageNo;
        if (pageNo < 1) pageNo = 1;
        let pageData = await this.pager.fetchPage(pageNo);
        this.pageNo.current.value = pageData.pageNo
        this.setState({
            maxPageNo: pageData.maxPageNo,
            pokemonListItems: pageData.pokemons.map( pokemon =>
                <ReactCard key={pokemon.id} className={"pokemonListItem"} onClick={()=>this.props.handleSection(pokemon.name)}>
                    <p>#{pokemon.id}</p>
                    <h4>{pokemon.name}</h4>
                </ReactCard>
            )
        })
    }
    
    state={
        maxPageNo: 0,
        pokemonListItems: [],
        buttonsAreDisabled: false
    }

    render(){
        return (
            <ReactCard className={"rightContainer"}>
                <div className="listGrid">
                    {this.state.pokemonListItems}
                </div>
                <div className="listNavigation">
                    <ReactButton buttonStyle={ButtonStyle.danger} disabled={this.state.buttonsAreDisabled||(this.pageNo.current?this.pageNo.current.value<=1:false)} onClick={()=>{this.setState({buttonsAreDisabled:true});this.pager.fetchPrev().then(p=>this.handleNewPage(p)).finally(()=>this.setState({buttonsAreDisabled:false}))}}>Previous</ReactButton>
                    <p>Page <input ref={this.pageNo} onBlur={(event)=>this.handlePageNoChange(event.target.value)} onKeyDown={(event)=>{if (event.key==="Enter") this.handlePageNoChange(event.target.value)}}  type="number" min="1" max="100" style={{width: 60+"px"}} />/{this.state.maxPageNo}</p>
                    <ReactButton buttonStyle={ButtonStyle.danger} disabled={this.state.buttonsAreDisabled||(this.pageNo.current?this.pageNo.current.value>=this.state.maxPageNo:false)} onClick={()=>{this.setState({buttonsAreDisabled:true});this.pager.fetchNext().then(p=>this.handleNewPage(p)).finally(()=>this.setState({buttonsAreDisabled:false}))}}>Next</ReactButton>
                </div>
            </ReactCard>
        )
    }
}