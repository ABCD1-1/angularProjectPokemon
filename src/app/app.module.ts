import { PokemonModule } from "./pokemon/pokemon.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, LoginComponent],
  imports: [
    BrowserModule,
    PokemonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
