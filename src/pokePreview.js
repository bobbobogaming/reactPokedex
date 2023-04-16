import './style/pokePreview.css'
import { ButtonStyle, ReactButton, ReactCard } from './components';
import { Component } from 'react';


class PokemonTypeColor {
  static Normal = "#A8A77A";
  static Fire = "#EE8130";
  static Water = "#6390F0";
  static Electric = "#F7D02C";
  static Grass = "#7AC74C";
  static Ice = "#96D9D6";
  static Fighting = "#C22E28";
  static Poison = "#A33EA1";
  static Ground = "#E2BF65";
  static Flying = "#A98FF3";
  static Psychic = "#F95587";
  static Bug = "#A6B91A";
  static Rock = "#B6A136";
  static Ghost = "#735797";
  static Dragon = "#6F35FC";
  static Dark = "#705746";
  static Steel = "#B7B7CE";
  static Fairy = "#D685AD";
}

class Typecard extends Component {
  componentDidMount(){
    if (this.props.pokemonType){
      import(`./assets/types/${this.props.pokemonType.toLowerCase()}.svg`)
      .then(icon => this.setState({typeIcon: icon}))
    }
  }

  state = {
    typeIcon:{}
  }

  render(){
    return (
      <ReactCard style={{backgroundColor: PokemonTypeColor[this.props.pokemonType], display: this.props.pokemonType?"":"none"}}>
        <img src={this.state.typeIcon.default} alt=''></img>
        <h4>{this.props.pokemonType}</h4>
      </ReactCard>
    )
  }
}

export class PokePreview extends Component {
  state = {
    selectedItem: {
      name: "Bulbasaur",
      flavorText: "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      types: ["Grass","Poison"]
    }
  }

  changeSelectedItem = (item) => {
    this.setState({selectedItem: item})
  }

  render(){
    return (
      <ReactCard className={"leftContainer"}>
        <ReactCard id={"pokemonImgPreview"}>
          <img src={this.state.selectedItem.sprite} alt=''></img>
        </ReactCard>
        <h1>{this.state.selectedItem.name}</h1>
        <h5>{this.state.selectedItem.flavorText}</h5>
        <div id='types'>
          <Typecard pokemonType={this.state.selectedItem.types[0]}></Typecard>
          <Typecard pokemonType={this.state.selectedItem.types[1]}></Typecard>
        </div>
        <ReactButton className="moreInfoButton" style={{display: this.state.selectedItem.name?"":"none"}} buttonStyle={ButtonStyle.danger}>More info</ReactButton>
      </ReactCard>
    )
  }
}