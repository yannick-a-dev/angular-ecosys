import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProduitDetailComponent } from './produit-detail/produit-detail.component';
import { CaddiesComponent } from './caddies/caddies.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    LoginComponent,
    ProduitDetailComponent,
    CaddiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
