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
    this.apiService.getItems().subscribe({
      next: (data: any) => {
        if (data) {
          this.hero = data.data;
          this.filteredItems = this.hero;
          this.categories = Array.from(new Set(this.hero.map(item => item.category)));
        }
      },
      error: (err) => {
        console.log("problem during fetch:", err);
      }
    });
  }


  searchQuery: string = '';
  filteredSuggestions: any[] = [];

  onSearchChange(): void {
    if (this.searchQuery) {
      this.filteredSuggestions = this.hero.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredSuggestions = [];
    }
  }

  selectSuggestion(suggestion: any): void {
    this.filteredItems = [suggestion]; // Show only the selected item
    this.searchQuery = suggestion.name; // Update the search query
    this.filteredSuggestions = []; // Clear suggestions
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
      this.apiService.addToCart(item)    
  }

  async removeFromCart(id: number): Promise<void> {
    this.cart 
  }

  calculateTotal(): number {
    return this.cart.reduce((acc, item) => acc + parseFloat(item.description), 0);
  }
}
