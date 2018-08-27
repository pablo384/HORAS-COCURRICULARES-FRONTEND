import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
    submitted = false;
    returnUrl: string;
  constructor(private formBuilder: FormBuilder,private router: Router,) {
  	 
  }

  get f() { return this.loginForm.controls; }
  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

  }
	onSubmit() {
		this.router.navigate(["/"])
  }

}
