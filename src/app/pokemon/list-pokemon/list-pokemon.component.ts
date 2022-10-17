import { PokemonService } from "./../pokemon.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokemonList) => (this.pokemonList = pokemonList));   //asynchrone 
  }
  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id]);
  }
}
