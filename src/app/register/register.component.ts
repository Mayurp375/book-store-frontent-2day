import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  empForm!: FormGroup;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: BackendApiService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {

    this.empForm = this.fb.group({
      username: '',
      password: '',
      email: '',
      role: ''
    })
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this.userService.registerUser(this.empForm.value).subscribe({
        next: () => {
          alert('User registration successfull');
          console.log(this.empForm.value);
          this.dialogRef.close(true);
          window.location.reload();//Auto reloade
        },
      })
    }
  }
}
