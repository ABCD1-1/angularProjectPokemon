import { PokemonService } from "./../pokemon.service";
import { Pokemon } from "../pokemon";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id"); //snapshot for data at current instant
    if (pokemonId) {
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon));
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService
      .deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList);
  }
  goToPokemonList() {
    this.router.navigate(["/pokemons"]);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(["/edit/pokemon", pokemon.id]);
  }
}
