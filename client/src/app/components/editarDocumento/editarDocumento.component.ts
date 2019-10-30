import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentosComponent } from '../documentos/documentos.component';

export interface DialogData {
  documento: string
}

@Component({
  selector: 'app-editarDocumento',
  templateUrl: './editarDocumento.component.html',
  styleUrls: ['./editarDocumento.component.css']
})
export class EditarDocumentoComponent implements OnInit {
public asd:string
  constructor(
    public dialogRef: MatDialogRef<DocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  cancelarEdicion(): void {
    this.dialogRef.close();
  }

  aceptarEdicion() {
    this.dialogRef.close();
  }
}
