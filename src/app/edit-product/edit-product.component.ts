import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../services/catalogue.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  public currentProduct: Product =new Product();
  private data: number=0;
  private mode: number=1;
  private url: string='';
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private catService:CatalogueService){
    this.currentProduct = new Product();
  }
  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params['id'])
    this.catService.getResource(this.url)
      .subscribe(data=>{
        if (data instanceof Product) {
          this.currentProduct=data;
        }
      }, err=>{
        console.log(err);
      });
  }

  onEditProduct(value: any) {

  }

  onSaveProduct(value: any) {
    this.catService.saveResource(this.catService.host+"/produits",this.data)
      .subscribe(res=>{
        //this.router.navigateByUrl("/products")
        if (res instanceof Product) {
          this.currentProduct = res;
        }
        this.mode=2;
      },err=>{
        console.log(err);
      })

  }

  onUpdateProduct(value: any) {
    this.catService.updateResource(this.url,value)
      .subscribe(data=>{
        alert("Mise à jour effectuée avec succès");
        this.router.navigateByUrl("/products")
      },err=>{
        console.log(err);
      })
  }
}
