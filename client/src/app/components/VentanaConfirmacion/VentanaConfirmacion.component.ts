import { Component, OnInit, Input, Inject } from '@angular/core';
import { Documento } from 'src/app/domain/documento';
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from '../editarDocumento/editarDocumento.component';

@Component({
  selector: 'app-VentanaConfirmacion',
  templateUrl: './VentanaConfirmacion.component.html',
  styleUrls: ['./VentanaConfirmacion.component.css']
})
export class VentanaConfirmacionComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private serviceDocumentos: ServiceDocumentos,
    public dialogRef: MatDialogRef<VentanaConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() { }

  async eliminarDocumento() {
    await this.serviceDocumentos.bajaLogicaDocumentoEnElBack(this.data.documento)

    this.openSnackBar()
    this.dialogRef.close();
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this.snackBar.open('El documento ha sido eliminado con exito!', 'Aceptar', {
      duration: 2000,
    });
  }


}
