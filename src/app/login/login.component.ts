import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errMsg: string;

  constructor(private formBuilder: FormBuilder, private api : ApiService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      // Here you can perform authentication logic
      // e.g., make an API call to check the credentials
      console.log('Email:', email);
      console.log('Password:', password);
      const user = {
        email: email,
        password: password
      }
      this.api.login(user).subscribe((res)=>{
        console.log(res);
        if(res.error){
          this.errMsg = res.error;
          setTimeout(()=>{
            this.errMsg = "";
          }, 5000);
        }else{
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/tasks');
        }
      });
    }
  }

}
