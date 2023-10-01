import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Hardcoded credentials for demonstration purposes only!
  private readonly USERNAME = 'admin';
  private readonly PASSWORD = 'password123';

  constructor(private router: Router) {}

  canActivate(): boolean {
    const credentials = this.getLoginFormInput();

    if (credentials.username === this.USERNAME && credentials.password === this.PASSWORD) {
      return true;
    } else {
      alert("somethig wrong!!")
      this.router.navigate(['/home']);
      return false;
    }
  }

  private getLoginFormInput(): { username: string, password: string } {
    const username = prompt('Username:') || "";  // Default to empty string if null
    const password = prompt('Password:') || "";  // Default to empty string if null
    return { username, password };
}

}
