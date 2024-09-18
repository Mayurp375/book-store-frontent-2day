import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface Medicine {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface OrderItem {
  id: number;
  medicine: Medicine;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderDate: string;
  totalAmount: number | null;
  status: string | null;
  orderStatus: string;
  address: string;
  message: string;
  orderItems: OrderItem[];
}

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent {

  constructor(private apiService: BackendApiService, public dialog: MatDialog) { }
  token: any = ''

  orders: any[] = [];

  displayedColumns: string[] = ['quantity', 'image', 'price', 'name', 'orderDate', 'orderStatus', 'address', 'message'];


  ngOnInit(): void {
     this.token = this.apiService.getFromSessionStorage('Authorization');
    this.apiService.allOrders(this.token).subscribe({
      next: (response) => {
        if (response.status === 'Success') {
          // Flattening the orders to display each item in its own row
          this.orders = response.data.flatMap((order: Order) =>
            order.orderItems.map((item: OrderItem) => ({
              ...order,
              quantity: item.quantity,
              image: item.medicine.image,
              price: item.price,
              name: item.medicine.name,
              totalAmount: item.medicine.price,
              orderDate: order.orderDate
            }))
          );
          this.dataSource.data = this.orders; // Set the data source
        } else {
          console.error('Failed to fetch orders:', response.message);
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  dataSource = new MatTableDataSource<Order>();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
