import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserRequest, CreateUserResponse } from '../models/create-user';
import { RegisterRequest, RegisterResponse } from '../models/register';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  email = new FormControl("jeremy@gmail.com", [Validators.required, Validators.email]);
  name = new FormControl("", Validators.required);
  job = new FormControl("", Validators.required);
  password = new FormControl("", [Validators.required, Validators.minLength(8)]);
  response: any = {};
  
  createFormGroup = new FormGroup({
    email: this.email,
    name: this.name,
    job: this.job,
    password: this.password
  });

  constructor(
    private api: ApiService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : 'Unspecified Error';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.password.hasError('minlength') ? 'Password should be 8 characters' : '';
  }

  cancel() {
    this.createFormGroup.reset();
    this.response = {};
  }

  create() {
    const userRequest: CreateUserRequest = {
      name: this.name.value,
      job: this.job.value
    };

    this.api.createUser(userRequest).subscribe(x => {
      this.response.id = x.id;
      this.response.createdAt = x.createdAt;
      this.response.job = x.job;
      this.response.name = x.name;
    });

    const registerRequest: RegisterRequest = {
      email: this.email.value,
      password: this.password.value
    };
    this.api.register(registerRequest).subscribe(x => {
      this.response.registerId = x.id;
      this.response.token = x.token;
    }, (err) => {
      console.log(err);
      this._snackBar.open(`${err.status}: ${err.error.error}`, 'close');
    });
  }

}
