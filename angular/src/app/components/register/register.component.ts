import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Register } from 'src/app/models/register';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: Register;
  paises: any = [];
  errors = {
    name: null,
    email: null,
    password: null,
  }
  constructor(private auth: AuthenticationService, private router: Router) {
    this.register = new Register('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.auth.getGener14({}).subscribe(
      response => {
        this.paises = response;
      }
    )
  }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {

    console.log("PRUEBA");
    console.log(this.register);
    this.auth.register(this.register).subscribe((res) => {
      let timerInterval: any;
      Swal.fire({
        icon: 'info',
        title: 'Datos Registrados con exito!',
        html: 'A continuación se lo redirigirá a la pagina de Login.',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer()!.querySelector('b')
          timerInterval = setInterval(() => {
            this.router.navigate(['/login']);
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          this.router.navigate(['/login']);
        }
      })
    },
      (err) => {
        this.errors = err.error.errors;
        console.log(err.error);
        Swal.fire(
          'Información',
          err.error.message,
          'info'
        )

      })
  }
}
