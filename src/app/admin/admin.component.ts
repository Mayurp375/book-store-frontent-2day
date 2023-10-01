import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  bookForm !: FormGroup;

  constructor(private fb: FormBuilder,
    private bookService: BackendApiService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      name: '',
      category: '',
      price: '',
      image: ''
    });
  }

  onSubmit(): void {
    console.log(this.bookForm.valid);
    this.bookService.saveBook(this.bookForm.value).subscribe({
      next: () => {
        console.log("success")
      }, error: (err) => {
        console.log(err);
      }
    })
    // Here, you can call your service to save the book details
  }


  searchTerm: string = '';  // To store search input
  foundBook: any = null;   // To store the found book


  findBook(): void {

    this.bookService.searchBook(this.searchTerm).subscribe({
      next: (responce) => {
        this.foundBook = responce;
      },
      error: (err) => {
        console.error('Error finding book:', err);
      }
    });
  }

  deleteBook(bookId: number): void {
    // Logic to delete the book
    // Assuming a service method 'deleteBookById'
    this.bookService.deleteBookById(bookId).subscribe(
      {
        next: (response) => {
          console.log('Book deleted successfully.', response);
          this.foundBook = null;  // Clear the found book
        },
        error: (err) => {
          console.error('Error deleting book:', err);
        }
      }
    );
  }

  logout(): void {
    
    this.router.navigate(['/home']);  // replace '/home' with your home route path
}
}
