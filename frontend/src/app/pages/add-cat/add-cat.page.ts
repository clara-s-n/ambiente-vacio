import {Component, inject, OnInit} from '@angular/core';
import {Cat} from "../../interfaces/cats";
import {CatsService} from "../../services/cats.service";
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-add-cat',
  templateUrl: './add-cat.page.html',
  styleUrls: ['./add-cat.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddCatPage  implements OnInit {
  private catService = inject(CatsService);
  private router = inject(Router);
  cat : Cat =
    {
      name: '',
      birthdate: '',
      raze: ''
    };

  addCatForm: any;

  constructor() {
    this.addCatForm = new FormBuilder().group({
      name: [''],
      birthdate: [''],
      raze: [''],
    })
  }

  ngOnInit() {
  }


  addCat(){
    // Obtenemos los valores del formulario
    this.cat = this.addCatForm.value;
    // Llamamos al servicio para agregar el gato
    this.catService.addCat(this.cat);
    // Redirigimos a la página de gatos
    this.router.navigate(['/']);
  }
}
