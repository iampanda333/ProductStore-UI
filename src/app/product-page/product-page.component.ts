import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from 'src/services/product/products-service.service';
import { LoginServiceService } from 'src/services/login/login-service.service';
import { element } from 'protractor';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(private productService: ProductsServiceService,
    private _login: LoginServiceService) { }

  allProducts = [];
  rows;

  isAdmin;


  ngOnInit() {
    this.isAdmin = this._login.isAdmin;
    this.loadProducts();

  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data['data'];
      if (!this.isAdmin) {
        this.allProducts = this.allProducts.filter(el => {
          return el['display'] === true;
        })
      }
    }, (err) => {
      this.allProducts = [];
    })
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe((data) => {
      if (data['success']) {
        this.loadProducts();
      }
    })
  }

  changeStatus(productId, state) {
    let updateValue;
    if (state === 'disable') {
      updateValue = { display: false };
    } else {
      updateValue = { display: true };
    }

    this.productService.updateProduct(productId, updateValue).subscribe(
      (data) => {
        console.log(data['success']);
        if (data['success']) {
          this.loadProducts();
        }
      })
  }
    
}
  // changeStatus(SelectedProduct, status) {

  //   this.allProducts.map(element => {
  //     if (SelectedProduct.id == element.id) {
  //       element.display = !element.display;
  //     }
  //   })

  // }

  // deleteProduct(SelectedProduct){
  //   this.allProducts.map((element,index) => {
  //     if (SelectedProduct.id == element.id) {
  //       this.allProducts.splice(index,1);
  //     }
  //   })
  // }


