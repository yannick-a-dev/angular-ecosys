import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './services/catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  categories: any;
  currentCategories: any;

  constructor(private catService: CatalogueService,
    private router: Router,
    private authService: AuthenticationService,
    public cadService: CaddyService ) {

  }

  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
  }

  private getCategories() {
    this.catService.getResource("/categories")
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);

      })
  }

  getProduitsByCat(c: { id: string; }) {
    this.currentCategories = c;
    this.router.navigateByUrl('/produits/2/' + c.id);
  }

  onSelectedProduits(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/produits/1/0");
  }
  onProduitsPromo(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/produits/3/0");
  }
  onProduitsDispo(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/produits/4/0");
  }

  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
