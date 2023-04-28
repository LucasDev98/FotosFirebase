import { Directive, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { FileItem } from '../models/file-item';



@Directive({
  selector: '[appNgDrop]'
})
export class NgDropDirective {
  @Output()esSobreElemento : EventEmitter<boolean> = new EventEmitter()
  @Input()archivos : FileItem[]
  @Input()ImagenFueSubida : string []= []

  @HostListener('dragover', ['$event'])
  public onDragover( event )  {
     this.esSobreElemento.emit(true)

     this.prevenirEvent(event)
  }
  @HostListener('dragleave', ['$event'])
  public onDragleave( event ){
    this.esSobreElemento.emit(false)
  }

  @HostListener('drop', ['$event'])


  onDrop( event ){
    this.vaciarErrores()
    this.esSobreElemento.emit(false)
    this.prevenirEvent(event)


    const transferencia = this.getTransferencia( event );

    this._extraerArchivos(transferencia.files)
  }
  vaciarErrores() {
    if( this.ImagenFueSubida.length > 0 ){
      this.ImagenFueSubida = []
    }


  }
  private _extraerArchivos( archivosLista : FileList  ){

    for( let archivo of  Object.getOwnPropertyNames(archivosLista) ){
        const archivoTemporal = archivosLista [archivo]
        if( this._puedeSubirImagen(archivoTemporal) ){

          const nuevoArchivo = new FileItem(archivoTemporal);

          this.archivos.push(nuevoArchivo)

        }
    }
  }

  private prevenirEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _puedeSubirImagen( archivo : File )  {

    if(this._esImagen(archivo) && this._imagenFueCargada( archivo.name ) ) {

      return false
    }
    return true;
  }

  private getTransferencia ( event : any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }
  private _esImagen( archivo : File ) : boolean {
    return archivo.name == null ? false : archivo.type.startsWith('image')
  }

  private _imagenFueCargada( nombreImagen : string ) : boolean {


    for( const archivo  of this.archivos ) {
      if ( archivo.nombre_archivo === nombreImagen ) {
        this.ImagenFueSubida.push(nombreImagen)
        setTimeout( ()=> {
          this.ImagenFueSubida= []
        },3000)

        return true;
      }
    }

    return false;
  }


}
