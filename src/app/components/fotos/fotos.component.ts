import { Component, inject,  } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { Observable } from 'rxjs';

interface Item {
  name: string,
  url: string
};

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent  {
    items : Item[] = [];
    firestore: Storage = inject(Storage);

    constructor(  ) {



      const storage = this.firestore

      const storageRef = ref( storage, 'img')

    listAll( storageRef ).then( resp => {

        resp.items.forEach( itemRef => {

          getDownloadURL(itemRef).then( url => {

            this.items.push( { name:itemRef.name, url})

            console.log(this.items)
          })
        })
     })



    }


  }

