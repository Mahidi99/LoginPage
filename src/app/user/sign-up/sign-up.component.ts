import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user!: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userService: any;
  toastr: any;
  sub: any;
  _auth: any;
  router: any;
  //userService: any;
  //toastr: any;

  constructor() { }

  googleloginfunction(){
    this.sub = this._auth.login("google").subscribe(
      (data: User) => {console.log(data);this.user=data;return this.router.navigateByUrl(this.returnUrl);}
    );
  }

  facebookloginfunction(){
    this.sub = this._auth.login("facebook").subscribe(
      (data: User) => {alert(JSON.stringify(data));this.user=data;return this.router.navigateByUrl(this.returnUrl);}
    )
  }

  returnUrl(returnUrl: any) {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }

}
