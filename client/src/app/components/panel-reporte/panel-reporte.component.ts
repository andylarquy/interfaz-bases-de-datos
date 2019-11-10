import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { Documento } from 'src/app/domain/documento';
import { formatDate } from '@angular/common';
import { ServiceReporte } from 'src/app/services/serviceReportes.service';

let TABLE_DATA: Documento[]


@Component({
  selector: 'app-panel-reporte',
  templateUrl: './panel-reporte.component.html',
  styleUrls: []
})

export class PanelReporteComponent implements OnInit {

  @Input() titulo: string
  @Input() order: string
  public fechaDesde
  public fechaHasta

  fechaDesdePosta: string = null
  fechaHastaPosta: string = null

  displayedColumns: string[] = ['idContenido', 'nombre', 'extension', 'fecha_de_publicacion', 'velocidad_descarga'];
  dataSource = new MatTableDataSource(TABLE_DATA)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  constructor(private serviceReportes: ServiceReporte) { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator
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

    params.order = this.order


    console.log(params)

    console.log(await this.serviceReportes.getDocumentosReporte(params))

    TABLE_DATA = await this.serviceReportes.getDocumentosReporte(params)

    this.dataSource = new MatTableDataSource(TABLE_DATA)
    this.dataSource.paginator = this.paginator
  }



}

