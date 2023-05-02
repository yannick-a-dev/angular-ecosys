import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string="http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getResource(url: string){
     return this.http.get(this.host+url);
  }

  public getProduit(url: string): Observable<Produit>{
    return this.http.get<Produit>(url);
 }

  uploadPhotoProduit(file: File, idProduit: number | undefined): Observable<HttpEvent<{}>> {
   let formdata = new FormData();

   formdata.append('file', file);
   const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduit, formdata,{
    reportProgress: true,
    responseType: 'text',
   });
   return this.http.request(req);
  }
}
