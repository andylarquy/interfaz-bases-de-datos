import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentosComponent } from '../documentos/documentos.component';
import { Documento } from 'src/app/domain/documento';
import { extensionesPosibles } from 'src/app/domain/extensiones'
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
  documento: Documento
  esUnaEdicion: boolean
}

// El file reader lo uso para formatear
// lo que el usuario sube
const reader = new FileReader();
const PESO_MAXIMO_PERMITIDO_BYTES = 5242880 // Dividido 1048576 lo pasas a MB
@Component({
  selector: 'app-editarDocumento',
  templateUrl: './editarDocumento.component.html',
  styleUrls: ['./editarDocumento.component.css']
})
export class EditarDocumentoComponent implements OnInit {

  extensionesPosibles = extensionesPosibles
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DocumentosComponent>,
    private serviceDocumentos: ServiceDocumentos,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  fileToUpload: File = null;
  loading = false;
  done = false;

  errorMessage: string

  async ngOnInit() {
    if (this.data.esUnaEdicion) {
      this.data.documento = await this.serviceDocumentos.getDocumentoById(this.data.documento.idContenido)
      this.data.documento = this.data.documento[0]
    }
  }

  cancelarEdicion(): void {
    if (!this.loading) {
      this.dialogRef.close();
    }
  }

  async aceptarEdicion() {
    // TODO: corregir este if
    this.loading = true
    this.done = false
    try {

      this.validarArchivo()

      if (this.data.esUnaEdicion) {
        await this.serviceDocumentos.actualizarDocumentoEnElBack(this.data.documento)
        this.loading = true
      } else {
        await this.serviceDocumentos.agregarDocumentoEnElBack(this.data.documento)
        this.loading = false
        this.done = true
      }

      this.openSnackBar()
      this.dialogRef.close();

    } catch (error) {
      this.errorMessage = error.message
      this.loading = false
      this.done = true
    }
  }

  async handleFileInput(files: FileList) {
    this.resetearDocumento()
    this.errorMessage = ''
    this.done = false;
    this.loading = true
    try {
      this.fileToUpload = files.item(0);
      const fileNameAndExtension = this.fileToUpload.name.split('.')
      this.data.documento.titulo = fileNameAndExtension[0]
      this.data.documento.extension = fileNameAndExtension[1]
      this.validarArchivo()

      this.data.documento.contenido = await this.formatFile()
      console.log(this.data.documento)
      this.done = true;


    } catch (error) {
      this.loading = false
      this.errorMessage = error.message
    }
  }

  async formatFile() {
    return new Promise<string | ArrayBuffer>((resolve) => {
      reader.readAsBinaryString(this.fileToUpload)
      reader.onload = async () => {
        this.loading = false
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

  validarArchivo() {
    if (!extensionesPosibles.includes(this.data.documento.extension)) {
      throw new Error('La extensión del archivo no está permitida')
    }

    if (this.fileToUpload && this.fileToUpload.size > PESO_MAXIMO_PERMITIDO_BYTES) {
      throw new Error('El máximo peso permitido es de ' + PESO_MAXIMO_PERMITIDO_BYTES / 1048576 + ' MB')
    }
  }


  resetearDocumento() {
    this.data.documento.contenido = undefined
    this.data.documento.titulo = undefined
    this.data.documento.extension = undefined
  }

  openSnackBar() {
    this.snackBar.open('El documento ha sido añadido con exito!', 'Aceptar', {
      duration: 2000,
    });
  }

}
