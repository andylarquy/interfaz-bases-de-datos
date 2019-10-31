import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material'

export interface ReporteDocumentos {
  id: number;
  nombre: string;
  extension: string;
  fecha: string;
  contenido: string;
}

const TABLE_DATA: ReporteDocumentos[] = [
  { id: 1, nombre: 'Harry Potter', extension: 'pdf', fecha: '10/10/95', contenido: 'Muy buen libro' },
  { id: 2, nombre: 'Segundo', extension: 'pdf', fecha: '10/10/98', contenido: 'Muy mal libro' },
  { id: 3, nombre: 'Tercero', extension: 'doc', fecha: '10/10/01', contenido: 'Nada' },
  { id: 4, nombre: 'Cuarto', extension: 'pdf', fecha: '08/12/15', contenido: 'AJSHDAKS' },
  { id: 5, nombre: 'Quinto', extension: 'docx', fecha: '05/04/18', contenido: 'SBNJKLS' },
];


@Component({
  selector: 'app-panel-reporte',
  templateUrl: './panel-reporte.component.html',
  styleUrls: ['./panel-reporte.component.css']
})

export class PanelReporteComponent implements OnInit {

  @Input() titulo: string
  public fechaDesde
  public fechaHasta

  displayedColumns: string[] = ['id', 'nombre', 'extension', 'fecha', 'contenido'];
  dataSource = new MatTableDataSource(TABLE_DATA)
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  constructor() { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator
  }


  filtrar() {
    console.log('fecha desde ' + this.fechaDesde)
    console.log('fecha hasta ' + this.fechaHasta)
  }

}

