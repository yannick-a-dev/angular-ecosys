import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
import { Produit } from '../models/produit';
import { AuthenticationService } from '../services/authentication.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit{

  selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  private currentTime: number;
  public editPhoto: boolean;
  public mode: number=0;
  public currentProduit: Produit;

  constructor(private router: Router, private route: ActivatedRoute,
    public catService: CatalogueService,public authService: AuthenticationService){}

  ngOnInit(): void {
    let url=atob(this.route.snapshot.params['url']);
    this.catService.getProduit(url).subscribe(data =>{
      this.currentProduit = data;
    },err =>{
      console.log(err);
    })
  }

  onEditPhoto(p: Produit) {
    this.currentProduit=p;
    this.editPhoto=true;
  }

  onSelectedFile(event:any) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduit(this.currentFileUpload, this.currentProduit.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * (event.loaded || 1) / (event.total || 1));
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })
    this.selectedFiles = undefined
  }

  getTS() {
    return this.currentTime;
  }

  onEditProduit() {
    this.mode=1;
  }

  onUpdateProduit(data: any) {

  }

  
  onAddProduitToCaddy(p:Produit){
    /*
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
    }else{
     
    }*/
  }
}
