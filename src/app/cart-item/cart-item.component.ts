import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { LoginformComponent } from '../loginform/loginform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  hero: any
  cart: any[] = [];
  filteredItems: any[] = [];
  item: any

  async ngOnInit(): Promise<void> {
    this.hero = this.apiService.getItems().subscribe(
      (data: any) => {
        console.log('Data retrieved:', data); // For debugging
      },
      (error: any) => {
        console.error('Error retrieving data:', error); // Handle errors
      });
    this.filteredItems = this.hero;
  }

  constructor(private apiService: BackendApiService, public dialog: MatDialog) { }

  async removeFromCart(id: number): Promise<void> {
    await this.apiService.removeFromCart(id).toPromise();
    this.cart = await this.apiService.getCartItems().toPromise();
  }

  calculateTotal(): number {
    return this.cart.reduce((acc, item) => acc + parseFloat(item.description), 0);
  }

  openLoginDialog(): void {
    const dataRef = this.dialog.open(LoginformComponent, {
      width: '500px',
    });
    dataRef.afterClosed().subscribe(result => { });
  }

}
