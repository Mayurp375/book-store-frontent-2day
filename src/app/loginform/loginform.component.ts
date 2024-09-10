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

  constructor(private fb: FormBuilder,
    private userService: BackendApiService,
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
          alert(obj.message);
          sessionStorage.setItem('Authorization', obj.token)
          this.dialogRef.close(true);
        }, error: (err) => {
          alert(err.error.message);
          this.dialogRef.close(true);
        }
      })
    }
  }
}