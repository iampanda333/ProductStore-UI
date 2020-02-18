import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('id_token')
      })
    };

    return this.http.get('http://localhost:3000/products', httpOptions);
  }

  deleteProduct(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('id_token')
      })
    };
    return this.http.delete(`http://localhost:3000/products/${id}`, httpOptions);
  }

  updateProduct(id, updateData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('id_token')
      })
    };
    return this.http.patch(`http://localhost:3000/products/${id}`, updateData, httpOptions);
  }
}
