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
    console.log(data.esUnaEdicion)
  }

  //reader = new FileReader();
  fileToUpload: File = null;
  loading = false;

  ngOnInit() {
  }

  cancelarEdicion(): void {
    this.dialogRef.close();
  }

  async aceptarEdicion() {
    // TODO: Validar errores y posiblemente corregir este if

    console.log(this.data.documento.contenido)
    if (this.data.esUnaEdicion) {
      this.serviceDocumentos.actualizarDocumentoEnElBack(this.data.documento)
    } else {
      this.loading = false
      //console.log('Acá tambien ya esta', this.data.documento.contenido)
      this.serviceDocumentos.agregarDocumentoEnElBack(this.data.documento)
    }
    this.dialogRef.close();
  }

  async handleFileInput(files: FileList) {
    this.loading = true;
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
    this.data.documento.contenido = await this.formatFile()
    this.loading = false


  }

  async formatFile() {
    return new Promise<string | ArrayBuffer>((resolve) => {
      reader.readAsBinaryString(this.fileToUpload)

      reader.onload = async () => {
        await resolve(reader.result)
      }
    })

  }


}
