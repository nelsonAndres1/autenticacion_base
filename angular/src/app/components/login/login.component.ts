import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Login } from 'src/app/models/login';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.login = new Login('', '');
  }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    this.auth.login(email, password).subscribe((res: any) => {

      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Caja de Compensación Familiar de Nariño.',
        footer: 'Oficina de Sistemas e Informatica.'
      });
      localStorage.setItem('user', JSON.stringify(res))
      // redirect to dashboard
      this.router.navigate(['/dashboard']);
    },
      err => {

        console.log("erroe!");
        console.log(err)

        Swal.fire({
          icon: 'error',
          title: 'Credenciales Incorrectas!',
          text: 'Favor verificar!',
          footer: 'Oficina de Sistemas e Informatica.'
        });
      })
  }
}
