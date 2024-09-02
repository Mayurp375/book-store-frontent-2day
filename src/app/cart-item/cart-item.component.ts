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
      console.log('Updated Cart from:', this.apiService.getCartItems());
      this.cart = this.apiService.getCartItems()
      console.log('Updated Cart:', this.cart);
  }

  constructor(private apiService: BackendApiService, public dialog: MatDialog) { }

  async removeFromCart(id: number): Promise<void> {
    console.log('id',id)
    this.apiService.removeFromCart(id);  
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
