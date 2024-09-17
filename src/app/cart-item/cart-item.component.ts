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
  cart: any[] = [];
  filteredItems: any[] = [];

  async ngOnInit(): Promise<void> {
    this.cart = this.apiService.getCartItems()
  }

  constructor(private apiService: BackendApiService, public dialog: MatDialog) { }

  async removeFromCart(index: number): Promise<void> {
    if (index >= 0 && index < this.cart.length) {
      // Valid index, remove the item
      this.cart.splice(index, 1);
    } else {
      this.cart.length = 0; // Clears the cart
    }
  }


  calculateTotal(): number {
    return this.cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
  }

  openLoginDialog(): void {
    const dataRef = this.dialog.open(LoginformComponent, {
      width: '500px',
    });
    dataRef.afterClosed().subscribe(result => { });
  }

}
