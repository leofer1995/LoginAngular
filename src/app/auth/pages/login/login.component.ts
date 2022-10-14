import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email: ['leoemail@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService, 
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.formLogin.value);
    console.log(this.formLogin.valid);
    const {email, password} = this.formLogin.value;
    this.authService.login(email, password)
    .subscribe((res) => {
      console.log('sdfdsfdsf',res);
      if (res === true) {
        this.router.navigateByUrl('/dashboard')
      } else {
        Swal.fire('Error', res, 'error')
      }
    })
    //this.router.navigateByUrl('/dashboard')
  }

}
