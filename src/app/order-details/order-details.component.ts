import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  id: string = sessionStorage.getItem('authToken') || ""
  constructor(private orderService: BackendApiService,private router:Router) { }

  ngOnInit(): void {
    console.log(this.id);
    // console.log(this.getDecodedAccessToken);
    const decodedToken = this.getDecodedAccessToken(this.id);
    const userId = decodedToken ? decodedToken.userId : null;
    this.orderService.placeOrder(userId).subscribe(data => { //how to get this token user id
      this.order = data;
     // this.router.navigate(['order-details'])
    });
  }

  getDecodedAccessToken(id: string): any {
    try {
      return jwt_decode(id);
    } catch (Error) {
      return null;
    }
  }
}
