import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {

  empForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: BackendApiService,
    private snackBarPop : MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<LoginformComponent>) {
    this.empForm = this.fb.group({
      email: [''],
      password: [''],
      role: ['']
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this.userService.login(this.empForm.value).subscribe({
        next: (obj: any) => {
          this.snackBarPop.open(obj.message,'',{
            duration:this.userService.MAXIMUM_NUMBER * 1000
          })
          sessionStorage.setItem('Authorization', obj.token)
          sessionStorage.setItem('isLogedIn', JSON.stringify(true))
          if (this.empForm.value.role === 'SELLER') {
            this.router.navigate(['/seller-dashboard']);
          } 
          this.dialogRef.close(true);
        }, error: (err) => {
          console.log('eer',err);     
          this.snackBarPop.open(err.error.message,'',{
            duration:this.userService.MAXIMUM_NUMBER * 1000
          })
          this.dialogRef.close(true);
        }
      })
    }
    this.dialogRef.close(true);
  }

  navigateToRegister() {
    this.dialogRef.close(); // Close the dialog
    this.router.navigate(['/register']); // Navigate to register page
  }

  navigateToForgotPassword() {
    this.dialogRef.close(); // Close the dialog
    this.router.navigate(['/forgot-password']); // Navigate to forgot password page
  }
}