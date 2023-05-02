import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Produit } from '../models/produit';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  
  public produits: any;
  editPhoto: boolean;
  currentProduit: any;
  selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  title: string;
  timestamp:number=0;

  constructor(protected catService: CatalogueService,
    private route: ActivatedRoute, private router: Router,
    public  authService: AuthenticationService,
    public cadService: CaddyService ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params['p1'];
        if (p1 == 1) {
          this.title ="Sélection";
          this.getProduits('/produits/search/selectedProduits');
        } else if (p1 == 2) {
          let idCat = this.route.snapshot.params['p2'];
          this.title ="Produits de la catégorie " +idCat;
          this.getProduits('/categories/' + idCat + '/produits');
        }

        else if (p1 == 3) {
          this.title ="Produits en promotion";
          this.getProduits('/produits/search/promoProduits');
        }
        else if (p1 == 4) {  
          this.title ="Produits disponibles";
          this.getProduits('/produits/search/dispoProduits');
        } else if (p1 == 5) {
          this.title ="Recherche...";
          this.getProduits('/produits/search/dispoProduits');
        }
      }
    });
    let p1 = this.route.snapshot.params['p1'];
    if (p1 == 1) {
      this.getProduits('/produits/search/selectedProduits');
    }
  }

  private getProduits(url: string) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.produits = data;
      }, err => {
        console.log(err);

      })
  }
  onEditPhoto(p: any) {
    this.currentProduit = p;
    this.editPhoto = true;
  }

  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catService.uploadPhotoProduit(this.currentFileUpload, this.currentProduit.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * (event.loaded || 1) / (event.total || 1));
        console.log(this.progress);
      } else if (event instanceof HttpResponse) {
        //this.getProduits('/produits/search/selectedProduits');
        this.timestamp = Date.now();
      }
    }, err => {
      alert("Problème de chargement ");
    })
  }

  getTS(){
    return this.timestamp;
  }

  onProduitDetails(p: Produit){
    let url =btoa(p._links.produit.href) //transformer en base64
    this.router.navigateByUrl("produit-detail/"+url);
  }

  onAddProductToCaddy(p: Produit){
     this.cadService.addProduitToCaddy(p);
  }
}
