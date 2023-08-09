import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  errMsg: string;

  constructor(private formBuilder: FormBuilder, private api : ApiService, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let name = this.signupForm.value.name;
      let email = this.signupForm.value.email;
      let password = this.signupForm.value.password;

      // Here you can perform authentication logic
      // e.g., make an API call to check the credentials
      console.log('Email:', email);
      console.log('Password:', password);
      const user = {
        name: name,
        email: email,
        password: password
      }
      this.api.signup(user).subscribe((res)=>{
        console.log(res);
        if(res.error){
          this.errMsg = res.error;
          setTimeout(()=>{
            this.errMsg = "";
          }, 5000);
        }else{
          this.router.navigateByUrl('/');
        }
      });
    }
  }


}
