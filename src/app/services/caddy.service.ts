import { Injectable } from '@angular/core';
import { Caddy } from '../models/caddy';
import { Produit } from '../models/produit';
import { ItemProduit } from '../models/itemProduit';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  public currentCaddyName: string = "Caddy1";
  //public caddies = new Map<string, Caddy>();
  
  private caddies;

  constructor() {
    //panier par défaut au démarrage
    let caddies = localStorage.getItem("myCaddies"); // récupérer les paniers
    if (caddies) {
      this.caddies = JSON.parse(caddies); //opération inverse
    } else {
      let caddy = new Caddy(this.currentCaddyName);
      this.caddies.set(this.currentCaddyName, caddy);
    }
  }

  public addProduitToCaddy(produit: Produit): void {
    let caddy = this.caddies[this.currentCaddyName];
    let itemProduit = caddy?.items.get(produit.id);
    if (itemProduit) {
      itemProduit.quantity += produit.quantity;
    } else {
      itemProduit = new ItemProduit();
      itemProduit.price = produit.currentPrice;
      itemProduit.quantity = produit.quantity;
      itemProduit.produit = produit;
      caddy?.items.set(produit.id, itemProduit);
      this.saveCaddies();
    }
  }

  public saveCaddies() {
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies));
  }

  getSize() {
    let caddy = this.caddies.get(this.currentCaddyName);
    return (caddy?.items)?.size;
  }
 
  getCurrentCaddy(): Caddy | undefined {
    let caddy = this.caddies[this.currentCaddyName];
    return caddy;
  }

  getTotal(): number {
    let total = 0;
    let items = this.getCurrentCaddy()?.items.values();
    if (items !== undefined) {
      for (let pi of items) {
        total += pi.price * pi.quantity;
      }
    }
    return total;
  }
}
