import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentosComponent } from '../documentos/documentos.component';
import { Documento } from 'src/app/domain/documento';
import { extensionesPosibles } from 'src/app/domain/extensiones'
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';

export interface DialogData {
  documento: Documento
  esUnaEdicion: boolean
}

// El file reader lo uso para formatear
// lo que el usuario sube
const reader = new FileReader();

@Component({
  selector: 'app-editarDocumento',
  templateUrl: './editarDocumento.component.html',
  styleUrls: ['./editarDocumento.component.css']
})
export class EditarDocumentoComponent implements OnInit {

  extensionesPosibles = extensionesPosibles
  constructor(
    public dialogRef: MatDialogRef<DocumentosComponent>,
    private serviceDocumentos: ServiceDocumentos,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  fileToUpload: File = null;
  loading = false;

  errorMessage: string

  ngOnInit() { }

  cancelarEdicion(): void {
    this.dialogRef.close();
  }

  async aceptarEdicion() {
    // TODO: corregir este if
    try {

      this.validarExtension()

      if (this.data.esUnaEdicion) {
        this.serviceDocumentos.actualizarDocumentoEnElBack(this.
          data.documento)
      } else {
        this.loading = false
        this.serviceDocumentos.agregarDocumentoEnElBack(this.data.documento)
      }
      this.dialogRef.close();
    }catch(error){
      this.errorMessage = error.message
    }
}

  async handleFileInput(files: FileList) {
    this.errorMessage = ''
    try {

      this.loading = true

      this.fileToUpload = files.item(0);
      const fileNameAndExtension = this.fileToUpload.name.split('.')
      this.data.documento.titulo = fileNameAndExtension[0]
      this.data.documento.extension = fileNameAndExtension[1]
      this.validarExtension()

      this.data.documento.contenido = await this.formatFile()


      this.loading = false

    } catch (error) {
      this.loading = false
      this.errorMessage = error.message
    }
  }

  async formatFile() {
    return new Promise<string | ArrayBuffer>((resolve) => {
      reader.readAsBinaryString(this.fileToUpload)
      reader.onload = async () => {
        await resolve(reader.result)
      }
    })
  }

  esUnDocumentoDeTextoPlano() {
    return this.data.documento.extension === 'txt'
  }

  extensionesPosiblesFormateadas() {
    return this.extensionesPosibles.map(ext => '.' + ext)
  }

  validarExtension() {
    console.log(extensionesPosibles.includes(this.data.documento.extension))
    if (!extensionesPosibles.includes(this.data.documento.extension)) {
      throw new Error('La extensión del archivo no está permitida')
    }
  }

}
