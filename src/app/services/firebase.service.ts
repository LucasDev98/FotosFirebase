import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
;

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { FileItem } from '../models/file-item';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {



  private CARPETA_IMAGENES = 'img'

  constructor( private db : AngularFirestore ) {
   }

   subirImagenes( archivos : FileItem[] ) {

    const storage = getStorage();
    for( const item of archivos ){
      if( item.progreso >= 100 && item.esta_subiendo == false ){
        continue;
      }
      const storageRef = ref(storage,`${this.CARPETA_IMAGENES}/${item.nombre_archivo}`)
      const uploadTask = uploadBytesResumable(storageRef, item.archivo )
      uploadTask.on('state_changed',
        (snapshot)=>{
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          item.esta_subiendo = true;
        },
        (err)=>{
          console.log('Hubo un error al subir el archivo')
        },
        ()=>getDownloadURL(uploadTask.snapshot.ref).then(( donwloadURL) =>{
          item.url_archivo = donwloadURL
          console.log('File available at', donwloadURL)
          item.esta_subiendo = false;
          this.guardarImagen(
            {
            nombre : item.nombre_archivo,
            url : item.url_archivo
              })
          })
        )
      }
    }
   public guardarImagen( imagen : { nombre : string, url: string }){
      this.db.collection(`/${this.CARPETA_IMAGENES}`)
          .add( imagen )
   }
}
