import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { user } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(private fb:FormBuilder, 
   private authservice:AuthService,
   private messageService: MessageService,
   private route:Router){}


   registerForm = this.fb.group({
    fullname:['',[Validators.required, Validators.pattern(/^[a-zA-Z]+(?:[a-zA-Z]+)*$/)]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]],
    
   },{
    validators: passwordMatchValidator
   })

   get fullname(){
    return this.registerForm.controls['fullname']
   }
   get email(){
    return this.registerForm.controls['email']
   }
   get password(){
    return this.registerForm.controls['password']
   }
   get confirmPassword(){
    return this.registerForm.controls['confirmPassword']
   }
   
   submitDetails(){
    const postData = {...this.registerForm.value}
    delete postData.confirmPassword;
    this.authservice.registerUser(postData as user).subscribe(
      response =>{
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered Successfully' });
        this.route.navigate(['/login'])
      },
      error =>{
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something Went Wrong' });
      }
      
    )
  }
}
