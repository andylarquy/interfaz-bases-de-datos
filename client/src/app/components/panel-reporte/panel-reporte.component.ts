import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material'

export interface ReporteDocumentos {
  id: number;
  nombre: string;
  extension: string;
  fecha: string;
  
}

const TABLE_DATA: ReporteDocumentos[] = [
  { id: 1, nombre: 'Harry Potter', extension: 'pdf', fecha: '10/10/95'},
  { id: 2, nombre: 'Tlön, Uqbar, Orbis Tertius', extension: 'pdf', fecha: '10/10/98'},
  { id: 3, nombre: 'Rayuela', extension: 'doc', fecha: '10/10/01'},
  { id: 4, nombre: 'Cuarto', extension: 'pdf', fecha: '08/12/15'},
  { id: 5, nombre: 'Quinto', extension: 'docx', fecha: '05/04/18'},
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

  displayedColumns: string[] = ['id', 'nombre', 'extension', 'fecha'];
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

