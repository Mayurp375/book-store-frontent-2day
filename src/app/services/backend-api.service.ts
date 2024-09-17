import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
   baseUrl :string ='http://localhost:8080';

  deleteBookById(id: number):Observable<any> {
    
    return this.http.delete<string>(`http://localhost:8080/api/books/${id}`)
  }

  saveBook(books: any):Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/books/add',books)
  }

  searchBook(id: string) {
    return this.http.get(`http://localhost:8080/api/books/${id}`);
  }

  getCategories() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    // return this.http.get('http://localhost:3000/items');
    return this.http.get('http://localhost:8080/api/medicine/allMedicine');
  }
  registerUser(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/register', data)
  }

  login(data: any): Observable<any> {
    return this.http.post<string>('http://localhost:8080/login',data)
  }

  cart: string[] =[];
  

  // Add item to cart
  addToCart(item: any) {
    console.log("added items",item);
    this.cart.push(item);//
    console.log("this.cart",this.cart);
    return this.cart
  }

  getCartItems() {
    // return this.http.get('http://localhost:8080/api/orders/place');
    console.log("this.cart",this.cart);
    return this.cart;
  }

  // Remove item from cart
  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }
}
