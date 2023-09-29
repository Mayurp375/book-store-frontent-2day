import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-fetch-page',
  templateUrl: './fetch-page.component.html',
  styleUrls: ['./fetch-page.component.css']
})
export class FetchPageComponent implements OnInit {


  hero: any[] = [];
  cart: any[] = [];
  categories: string[] = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Romance'];
  filteredItems: any[] = [];



  async ngOnInit(): Promise<void> {
    this.hero = await this.apiService.getItems().toPromise();
    this.cart = await this.apiService.getCartItems().toPromise();
    this.filteredItems = this.hero;
  }

  filterByCategory(category: string): void {
    this.filteredItems = this.hero.filter(item => item.category === category);
  }

  showAll(): void {
    this.filteredItems = this.hero;
  }
  constructor(private apiService: BackendApiService) { }



  async addToCart(item: any): Promise<void> {
    await this.apiService.addToCart(item).toPromise();
    this.cart = await this.apiService.getCartItems().toPromise();
  }
  // async addToCart(item: any){
  //  this.apiService.addToCart(item).subscribe({
  //   next:()=>{
  //     console.log(item);   
  //   }
  //  });
  //   this.cart = await this.apiService.getCartItems().toPromise();
  // }

  async removeFromCart(id: number): Promise<void> {
    await this.apiService.removeFromCart(id).toPromise();
    this.cart = await this.apiService.getCartItems().toPromise();
  }

  calculateTotal(): number {
    return this.cart.reduce((acc, item) => acc + parseFloat(item.description), 0);
  }
}
