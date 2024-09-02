import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  baseUrl: string = 'http://localhost:8080';
  cart: any[] = [];
  deleteBookById(id: number): Observable<any> {
    return this.http.delete<string>(`${this.baseUrl}/api/books/${id}`)
  }

  saveBook(books: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/api/books/add', books)
  }

  searchBook(id: string) {
    return this.http.get(`${this.baseUrl}/api/books/${id}`);
  }

  getCategories() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(this.baseUrl.concat('/api/medicine/allMedicine'));
  }
  registerUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl+'/register', data)
  }

  login(data: any): Observable<any> {
    return this.http.post<string>(this.baseUrl+'/login', data)
  }

  addToCart(item: any) {
    this.cart.push(item);//
  }
  getCartItems() {
    return this.cart
  }
  // Remove item from cart
  removeFromCart(id: number) {
    return this.cart ;
  }
}
