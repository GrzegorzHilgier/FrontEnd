import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if(res.Succeeded == true){
          this.service.formModel.reset();
          this.toastr.success('Registration succesfull');
        } 
        else{
          res.Errors.forEach(element => {
            switch(element.Code){
              case 'DuplicateUserName':
              this.toastr.error('Login is already used','Registration failed');
              break;

              default :
              this.toastr.error(element.description,'Registration failed');
              break;
            }
          });
        }
      },
      err =>{
        console.log(err);
      }
    );
  }
}
