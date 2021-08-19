import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../../_services/alertify/alertify.service';
import { AuthService } from '../../_services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private alertifty: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      memberId: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  login(): void {
    this.authService.login(this.model).subscribe(
      () => {
        this.alertifty.success('Login successfully');
      },
      (error) => {
        this.alertifty.error(error);
      }
    );
  }
}
