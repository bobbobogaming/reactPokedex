import { ButtonStyle, ReactButton, ReactCard, ReactProgressBar } from './components';
import { Typecard } from './pokePreview';
import { Component } from 'react';
import './style/pokeInfo.css'
import { getPokemon } from './PokeApi';
import { useLocation, useNavigate, useParams, Navigate, useLoaderData, useOutletContext } from 'react-router-dom';

export async function infoPageLoader({params}){
  let pokemon = {}
  try {
    pokemon = await getPokemon(params.pokemonName);
  } catch (error) {
    console.log(error)
  }
  return {pokemon};
}
function withRouter(Component){
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    let [outletContext] = useOutletContext();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
        outletContext={outletContext}
      />
    );
  }
  return ComponentWithRouterProp;
};

export function FuncPokeInfoPage(params) {
  const errorPokemon = {pokemon: {
    id: 0,
    name: "MISSINGNO.",
    sprite: "https://static.wikia.nocookie.net/pokemontowerdefense/images/c/ce/Missingno_image.png",
    flavorText: " ̵̧̿ ̸̳̏ ̵̧̂E ̷̡̌ ̴̯̈́R ̵̛͙ ̵̢̉R ̴̭̉ ̸̺̒O ̴̟̀ ̴̼̓ ̴̙́R ̶͚̈ ̵̞͛ ̴͎̑ ̷̤̋",
    types: ["Normal"],
    stats: new Map([
      ["hp", -1],
      ["attack",-1],
      ["defense",-1],
      ["special-attack",-1],
      ["special-defense",-1],
      ["speed",-1],
    ]),
    abilities: ["ERROR!!!","Save corruption"],
    height: -1,
    weight: 69
  }}
  const {pokemon} = useLoaderData();
  return(
    <>
      <PokeInfo pokemon={pokemon || errorPokemon.pokemon}></PokeInfo>
      <PokeStatView pokemon={pokemon || errorPokemon.pokemon}></PokeStatView>
    </>
  )
}

export class PokeInfoPage extends Component {
  state = { pokemon: {
    id: 0,
    name: "MISSINGNO.",
    sprite: "https://static.wikia.nocookie.net/pokemontowerdefense/images/c/ce/Missingno_image.png",
    flavorText: " ̵̧̿ ̸̳̏ ̵̧̂E ̷̡̌ ̴̯̈́R ̵̛͙ ̵̢̉R ̴̭̉ ̸̺̒O ̴̟̀ ̴̼̓ ̴̙́R ̶͚̈ ̵̞͛ ̴͎̑ ̷̤̋",
    types: ["Normal"],
    stats: new Map([
      ["hp", -1],
      ["attack",-1],
      ["defense",-1],
      ["special-attack",-1],
      ["special-defense",-1],
      ["speed",-1],
    ]),
    abilities: ["ERROR!!!","Save corruption"],
    height: -1,
    weight: 69
  }}
  async componentDidMount(){
    if ( this.props.params ){
      let returnPokemon = await getPokemon(this.props.params.pokemonName);
      this.setState({pokemon: returnPokemon});
    }
  }
  render() {
    return(
      <>
        <PokeInfo pokemon={this.state.pokemon} animatePageChange={this.props.outletContext}></PokeInfo>
        <PokeStatView pokemon={this.state.pokemon}></PokeStatView>
      </>
    )
  }
}

class PokeStatView extends Component {
  render(){
    return (
      <ReactCard className={"rightContainer"}>
        <ReactCard id={"pokemonStatImgPreview"}>
          <img src={this.props.pokemon.sprite} alt=''></img>
        </ReactCard>
        <ReactCard>
          <h4>Base Stats</h4>
          <div className="statGrid">
            <h5>HP: {this.props.pokemon.stats.get("hp")}</h5>
            <ReactProgressBar max={255} value={this.props.pokemon.stats.get("hp")}></ReactProgressBar>
            <h5>Attack: {this.props.pokemon.stats.get("attack")}</h5>
            <ReactProgressBar max={255} value={this.props.pokemon.stats.get("attack")}></ReactProgressBar>
            <h5>Defense: {this.props.pokemon.stats.get("defense")}</h5>
            <ReactProgressBar max={255} value={this.props.pokemon.stats.get("defense")}></ReactProgressBar>
            <h5>Special Attack: {this.props.pokemon.stats.get("special-attack")}</h5>
            <ReactProgressBar max={255} value={this.props.pokemon.stats.get("special-attack")}></ReactProgressBar>
            <h5>Special Defense: {this.props.pokemon.stats.get("special-defense")}</h5>
            <ReactProgressBar max={255} value={this.props.pokemon.stats.get("special-defense")}></ReactProgressBar>
            <h5>Speed: {this.props.pokemon.stats.get("speed")}</h5>
            <ReactProgressBar max={255} value={this.props.pokemon.stats.get("speed")}></ReactProgressBar>
          </div>
        </ReactCard>
      </ReactCard>
    )
  }
}

class PokeInfo extends Component {
  componentDidMount(){
    if (this.props.pokemon){
      let newAbilities = this.props.pokemon.abilities.map(item => <li key={item}>{item}</li>)
      this.setState({abilities: newAbilities})
    }
  }

  state={
    abilities: [],
    newPage: false,
    lockedButton: false
  }
  
  componentDidUpdate(prevProps){
    if(this.props.pokemon && this.props.pokemon.abilities[0] !== prevProps.pokemon.abilities[0]) {
      let newAbilities = this.props.pokemon.abilities.map(item => <li key={item}>{item}</li>)
      this.setState({abilities: newAbilities})
    }
  }

  handlePageChange = ()=>{
    if(!this.state.lockedButton){
      this.setState({lockedButton: true})
      this.props.animatePageChange()
      setTimeout(()=>{
        this.setState({newPage:true})
        this.props.animatePageChange()
        this.setState({lockedButton: false})
      },1000)
    }
  }
  
  render(){
    return (
      <ReactCard className={"leftContainer"} style={{gap: "25px"}}>
        {this.state.newPage && <Navigate to="/" replace={true}/>}

        <ReactButton buttonStyle={ButtonStyle.danger} onClick={()=> this.handlePageChange()}>≪ Back to Pokedex</ReactButton>
        <ReactCard>
          <p>#{this.props.pokemon.id}</p>
          <h2>{this.props.pokemon.name}</h2>
          <h5>{this.props.pokemon.flavorText}</h5>
          <div id='types' style={{marginTop: "30px"}}>
              <Typecard pokemonType={this.props.pokemon.types[0]}></Typecard>
              <Typecard pokemonType={this.props.pokemon.types[1]}></Typecard>
          </div>
        </ReactCard>
        <ReactCard>
          <h4>Info</h4>
          <p style={{marginBottom: "0px"}}>Height: {this.props.pokemon.height} m</p>
          <p>Weight: {this.props.pokemon.weight} kg</p>
        </ReactCard>
        <ReactCard>
          <h4>Abilities:</h4>
          <ol>
              {this.state.abilities}
          </ol>
        </ReactCard>
      </ReactCard>
    )
  }
}

export const PokeInfoPageWithRouter = withRouter(PokeInfoPage);