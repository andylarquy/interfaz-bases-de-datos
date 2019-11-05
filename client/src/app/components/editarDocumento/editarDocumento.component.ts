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

  ngOnInit() {
  }

  cancelarEdicion(): void {
    this.dialogRef.close();
  }

  aceptarEdicion() {
    // TODO: Validar errores y posiblemente corregir este if
    if (this.data.esUnaEdicion) {
      console.log(this.data.documento.idContenido)
      this.serviceDocumentos.actualizarDocumentoEnElBack(this.data.documento)
    } else {
      this.serviceDocumentos.agregarDocumentoEnElBack(this.data.documento)
    }
    this.dialogRef.close();
  }

}
