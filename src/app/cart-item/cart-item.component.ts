import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from '@angular/router';
import { LoginformComponent } from '../loginform/loginform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  hero: any[] = [];
  cart: any[] = [];
  categories: string[] = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Romance'];
  filteredItems: any[] = [];

  constructor(private apiService: BackendApiService,
    public dialog: MatDialog,
    private router: Router) { }

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


  // async addToCart(item: any): Promise<void> {
  //   await this.apiService.addToCart(item).toPromise();
  //   this.cart = await this.apiService.getCartItems().toPromise();
  // }
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
    return this.cart.reduce((acc, item) => acc + item.price, 0);
  }


  openLoginDialog(): void {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      // If authToken exists, navigate to order details form
      console.log(authToken);

      this.router.navigate(['order-details']);
    } else {
      this.dialog.open(LoginformComponent, {
        width: '500px',
      })
    };


  }

  // checkout() {
  //   // Assume you have a variable `currentUser` that holds the logged-in user's details
  //   const userId = this.currentUser.id;

  //   // For each item in the cart, call the API.
  //   // This is a simple example. In a real-world scenario, you may want to handle these API calls more efficiently.
  //   for (const item of this.cart) {
  //     const bookId = item.id;  // Or whatever the item's ID field is called
  //     const quantity = 1;  // Or calculate quantity based on your cart logic

  //     this.apiService.addToCart(userId, bookId, quantity)
  //       .subscribe(response => {
  //         console.log('Item added to cart:', response);
  //         // Handle successful addition, maybe remove the item from the local cart or show a message
  //       }, error => {
  //         console.error('Error adding item to cart:', error);
  //       });
  //   }
  // }
}
