

export class FileItem {
  public archivo : File;
  public nombre_archivo : string;
  public url_archivo : string;
  public progreso : number;
  public esta_subiendo : boolean;


  constructor( archivo: File ){
    this.archivo = archivo;
    this.nombre_archivo = archivo.name;
    this.esta_subiendo = false;
    this.progreso = 0;
  }
}
