import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { Documento } from 'src/app/domain/documento';
import { formatDate } from '@angular/common';

let TABLE_DATA: Documento[]


@Component({
  selector: 'app-panel-reporte',
  templateUrl: './panel-reporte.component.html',
  styleUrls: []
})

export class PanelReporteComponent implements OnInit {

  @Input() titulo: string
  public fechaDesde
  public fechaHasta

  fechaDesdePosta: string = null
  fechaHastaPosta: string = null

  displayedColumns: string[] = ['idContenido', 'nombre', 'extension', 'fecha_de_publicacion'];
  dataSource = new MatTableDataSource(TABLE_DATA)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private serviceDocumentos: ServiceDocumentos) { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.getDocumentosDelBack()
  }

  filtrar() {
    if (this.fechaDesde) {
      this.fechaDesdePosta = formatDate(this.fechaDesde, 'yyyy-MM-dd', 'en')
    }

    if (this.fechaHasta) {
      this.fechaHastaPosta = formatDate(this.fechaHasta, 'yyyy-MM-dd', 'en')
    }

    this.getDocumentosDelBack()
  }

  async getDocumentosDelBack() {
    const params: { [id: string]: any } = {}

    if (this.fechaDesdePosta) {
      params.start = this.fechaDesdePosta
    }

    if (this.fechaHastaPosta) {
      params.end = this.fechaHastaPosta
    }

    console.log(params)

    console.log(await this.serviceDocumentos.getDocumentos(params))

    TABLE_DATA = await this.serviceDocumentos.getDocumentos(params)

    this.dataSource = new MatTableDataSource(TABLE_DATA)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }



}

