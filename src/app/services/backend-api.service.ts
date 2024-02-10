import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  deleteBookById(id: number):Observable<any> {   
    return this.http.delete<string>(`http://localhost:8080/api/books/${id}`)
  }

  saveBook(books: any):Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/books/add',books)
  }

  searchBook(id: string) {
    return this.http.get(`http://localhost:8080/api/books/${id}`);
  }

  getItems(): Observable<any> {
    return this.http.get('http://localhost:8080/api/books/allBookd');
  }
  // getItems(): Observable<any> {
  //   return this.http.get('http://localhost:3000/items');
  // }
  registerUser(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/register', data)
  }
  // registerUser(data: any): Observable<any> {
  //   return this.http.post('http://localhost:3000/register', data)
  // }

  login(data: any): Observable<any> {
    return this.http.post<string>('http://localhost:8080/login',data)
     
  }

  // login(data: any): Observable<any> {
  //   return this.http.get<any[]>('http://localhost:3000/register')
  //     .pipe(
  //       map(users => users.find(user => user.email === data.email && user.password === data.password))
  //     );
  // }

  getCartItems(): Observable<any> {
    return this.http.get('http://localhost:3000/cart');
  }

  // Add item to cart
  addToCart(item: any): Observable<any> {
    return this.http.post('http://localhost:3000/cart', item);
  }

  // Remove item from cart
  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }

  // addToCart(userId: number, bookId: number, quantity: number): Observable<any> {
  //   const url = 'http://localhost:8080/api/cart/add';

  //   return this.http.post(url, null, {
  //     params: {
  //       userId: userId.toString(),
  //       bookId: bookId.toString(),
  //       quantity: quantity.toString()
  //     }
  //   });
  // }


  private baseUrl = 'http://localhost:8080/api/orders/place';

  placeOrder(userId:number) {
    return this.http.post(`${this.baseUrl}?userId=${userId}`, {});
  }
}
