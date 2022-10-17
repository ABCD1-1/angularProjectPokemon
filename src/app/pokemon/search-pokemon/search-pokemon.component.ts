import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>; // the $ at the end is a convention to say that it is an Observable

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300), // wait 300ms before doing a request to the db
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),   // wait until there is a modification in the input
      // {......"ab"..........."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {.....pokemonList(ab)............pokemonList(abc)......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
