import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarDocumentoComponent } from '../editarDocumento/editarDocumento.component';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  public fechaDesde
  public fechaHasta
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  crearDocumento() {
    this.editarDocumento('estoVaASerUnNewDocumento')
  }

  editarDocumento(estoVaSerUnDocumento: string) {

    const dialogRef = this.dialog.open(EditarDocumentoComponent, {
      width: '40em',
      height: '30em',
      data: {
        documento: estoVaSerUnDocumento
      }
    })

  }
  filtrar() {
    console.log('Fecha desde: ' + this.fechaDesde)
    console.log('Fecha hasta: ' + this.fechaHasta)
  }

}
