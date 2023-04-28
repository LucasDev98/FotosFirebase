import { Component } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cargar-fotos',
  templateUrl: './cargar-fotos.component.html',
  styleUrls: ['./cargar-fotos.component.css']
})
export class CargarFotosComponent {
    archivos : FileItem [] = []
    imagenErrores : string [] = [];
    estaSobreElemento : boolean = false;
  constructor( private _firebaseService : FirebaseService ) {

  }

  public cargarFotos(  ) {
   this._firebaseService.subirImagenes( this.archivos )
  }
}
