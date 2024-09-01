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
  categories: string[] = [];
  filteredItems: any[] = [];

  constructor(private apiService: BackendApiService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.apiService.getItems().toPromise();
    this.apiService.getItems().subscribe({
      next: (data: any) => {
        if (data) {
          this.hero = response.data;
          this.filteredItems = this.hero;
          console.log('Items:', this.hero);
          this.categories = Array.from(new Set(this.hero.map(item => item.category)));
        }
      }, error: (err) => {
        console.log("Error during login:", err);
      }
    })
  }

  filterByCategory(category: string): void {
    console.log('Filtering by category:', category);
    const uniqueCategories: Set<string> = new Set(this.hero.map(item => item.category));
    console.log('uniq data', uniqueCategories)
    this.categories = Array.from(uniqueCategories);

    if (category) {
      this.filteredItems = this.hero.filter(item => item.category === category);
    } else {
      this.filteredItems = [...this.hero];
    }

  }

  showAll(): void {
    console.log('Showing all items');
    this.filteredItems = this.hero;
  }

  async addToCart(item: any): Promise<void> {
    try {
      // await this.apiService.addToCart(item).toPromise();
      console.log('Item added to cart:', item);
      this.cart.push(item)
      // await this.apiService.getCartItems().toPromise();
      console.log('Updated Cart:', this.cart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  async removeFromCart(id: number): Promise<void> {
    this.cart
  }

  calculateTotal(): number {
    return this.cart.reduce((acc, item) => acc + parseFloat(item.description), 0);
  }
}
