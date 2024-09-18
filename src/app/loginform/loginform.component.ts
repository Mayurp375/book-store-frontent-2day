import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateVerticalPosition } from '@angular/cdk/overlay';

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
          this.dialogRef.close(true);
        }, error: (err) => {
          alert(err.error.message);
          this.dialogRef.close(true);
        }
      })
    }
  }
}