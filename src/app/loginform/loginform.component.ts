import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {

  empForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: BackendApiService, private dialogRef: MatDialogRef<LoginformComponent>) {
    this.empForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  
  onFormSubmit() {
    if (this.empForm.valid) {
      this.userService.login(this.empForm.value).subscribe({
        next: (token: any) => {
          if (token) {
            alert("Login successful!");
            sessionStorage.setItem('authToken',token.token)
            this.dialogRef.close(true);
          } else {
            alert("Login failed!");
            
          }
        }, error: (err) => {
          console.log("Error during login:", err);
        }
      })
    }
  }

  // onFormSubmit() {
  //   this.userService.login(this.empForm).subscribe({
  //     next:(token)=>{
  //       sessionStorage.setItem('authToken',token)
  //     },
  //     error:(error)=>{
  //       console.error("Failed to login:", error);
  //     }
  //   }
  //   );
  // }
}