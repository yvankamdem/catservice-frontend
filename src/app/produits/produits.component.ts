import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{

  public produits:any;
  public size:number=5;
  public currentPage:number=0;
  public totalPages:number=8;
  constructor(private catService:CatalogueService) {}
  ngOnInit(){
  }

  onGetProducts() {
    this.catService.getProducts(this.currentPage,this.size)
      .subscribe(data => {
          this.produits = data;
        },
        err => {
          console.log(err);
        })
  }
}
