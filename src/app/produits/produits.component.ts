import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{

  public produits:any;
  public size:number=9;
  public currentPage:number=0;
  constructor(private catService:CatalogueService, private router:Router) {}
  ngOnInit(){
  }

  onGetProducts() {
    this.catService.getProducts(this.currentPage,this.size)
      .subscribe(data => {
        this.produits = data;
      }, err => {
        console.log(err);
      });
  }

  onChercher(form: any) {
    this.catService.getProductsByKeyword(form.keyword,this.currentPage,this.size)
      .subscribe(data => {
        this.produits = data;
      }, err => {
        console.log(err);
      });
  }

  onDeleteProduct(p:any) {
    let conf=confirm("Etes vous sûre?");
    if(conf)
      this.catService.deleteResource(p._links.self.href)
        .subscribe(data =>{
          this.onGetProducts();
        },err=>{
          console.log(err);
        })
  }

  onEditProduct(p:any) {
    let url=p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url));
  }
}
