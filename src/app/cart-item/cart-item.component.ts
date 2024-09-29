import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { LoginformComponent } from '../loginform/loginform.component';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmOrderDialogComponent } from '../confirm-order-dialog/confirm-order-dialog.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  cart: any[] = [];
  filteredItems: any[] = [];
  token: any = ''

  async ngOnInit(): Promise<void> {
    this.cart = this.apiService.getCartItems()
  }

  constructor(private apiService: BackendApiService,
    public dialog: MatDialog, private appComp: AppComponent,
    private snackBarPop: MatSnackBar) { }

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
    this.token = this.apiService.getFromSessionStorage('Authorization');

    if (this.appComp.isLogedIn()) {
      const orderData = {
        itemsDtoList: this.cart.map(item => ({
          medicineId: item.id,
          quantity: item.quantity ? item.quantity : 1
        })),
        totalAmount: this.calculateTotal() // Total from the cart
      };

      // Open the confirmation dialog
      const confirmDialogRef = this.dialog.open(ConfirmOrderDialogComponent, {
        width: '500px',
        data: {
          items: orderData.itemsDtoList,
          address: '',
          contact: ''
        }
      });

      confirmDialogRef.afterClosed().subscribe(result => {
        if (result?.confirmed) {
          // Proceed with order placement
          const finalOrderData = {
            ...orderData,
            address: result.address,
            contact: result.contact
          };

          console.log('Final order data request:', finalOrderData);
          this.apiService.placeOrder(this.token, finalOrderData).subscribe({
            next: (response) => {
              this.snackBarPop.open(response.data, '', {
                duration: this.apiService.MAXIMUM_NUMBER * 1000
              });
              this.cart.length = 0; // Clear cart after successful order
            },
            error: (error) => {
              console.error('Error placing order', error);
            }
          });
        }
      });
    }
    else {
      const dataRef = this.dialog.open(LoginformComponent, {
        width: '500px',
      });
      dataRef.afterClosed().subscribe(result => { });
    }
  }
}
