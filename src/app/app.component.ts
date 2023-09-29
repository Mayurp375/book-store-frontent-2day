import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterComponent } from './register/register.component';
import { BackendApiService } from './services/backend-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'book-store';
  
  data: any = [];

  constructor(public dialog: MatDialog, private dataService: BackendApiService,private http: HttpClient) {}

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(result => { });
  }
  openLoginDialog(): void {
    const dataRef = this.dialog.open(LoginformComponent, {
      width: '500px',
    });

    dataRef.afterClosed().subscribe(result => {});
  }
  ngOnInit(): void {
    this.getData().subscribe((data) => {
      this.data = data;     
      console.log(this.data);
    });
  }

  getData() {
    // localStorage.getItem _ to store in local storage
    return this.http.get('http://localhost:3000/items');
  }

  registerPage(){
    
  }
}