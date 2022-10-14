import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.formRegister.value);
    console.log(this.formRegister.valid);
    const {name, email, password} = this.formRegister.value;
    this.authService.register(name, email, password)
      .subscribe( res => {
        if (res === true){
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire('Error', res, 'error')
        }
      })
  }
  

}
