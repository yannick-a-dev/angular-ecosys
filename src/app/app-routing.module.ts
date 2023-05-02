import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { LoginComponent } from './login/login.component';
import { ProduitDetailComponent } from './produit-detail/produit-detail.component';
import { CaddiesComponent } from './caddies/caddies.component';

const routes: Routes = [
  {path:'produits/:p1/:p2',component: ProduitsComponent},
  {path:'',redirectTo:'produits/1/0', pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'produit-detail/:url',component: ProduitDetailComponent},
  {path:'caddies',component: CaddiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
