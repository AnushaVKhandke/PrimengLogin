import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor(private fb:FormBuilder,
   private authservice:AuthService,
   private route:Router,
   private messageService:MessageService){}

 loginForm = this.fb.group({
  email:['',[Validators.required, Validators.email]],
  password:['',Validators.required]
 })
 get email(){
  return this.loginForm.controls['email'];
 }
 get password(){
  return this.loginForm.controls['password'];
 }

 loginUser(){
  const {email,password}=this.loginForm.value;
  this.authservice.getUserBylogin(email as string).subscribe(
    response =>{
      if(response.length >0 && response[0].password === password){
        sessionStorage.setItem('email',email as string)
        this.route.navigate(['/home'])

      }else{
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'email or password is wrong' });
      }
    },error =>{
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Something Went Wrong' });
    }
    
  )

  
 }
}
