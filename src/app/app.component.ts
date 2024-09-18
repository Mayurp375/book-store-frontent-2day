import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterComponent } from './register/register.component';
import { BackendApiService } from './services/backend-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'book-store';
  name = 'Sarswati Book Shop'
  data: any = [];

  constructor(public dialog: MatDialog,
     private snackBarPop : MatSnackBar ,
     private backService : BackendApiService ,private router: Router) {}

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
  }

  registerPage(){
    
  }

  isLogedIn(){
    const value = sessionStorage.getItem('isLogedIn');
    return value ? JSON.parse(value) : false;
  }

  logOut(){
    this.snackBarPop.open("LogedOut Successfull",'',{
      duration:this.backService.MAXIMUM_NUMBER * 1000
    })
    sessionStorage.removeItem('Authorization')
    sessionStorage.removeItem('isLogedIn')
    this.router.navigate(['/home']);
  }
}