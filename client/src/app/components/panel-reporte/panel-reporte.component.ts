import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent, Sort } from '@angular/material'
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { Documento } from 'src/app/domain/documento';
import { formatDate } from '@angular/common';
import { ServiceReporte } from 'src/app/services/serviceReportes.service';



@Component({
  selector: 'app-panel-reporte',
  templateUrl: './panel-reporte.component.html',
  styleUrls: []
})

export class PanelReporteComponent implements OnInit {

  @Input() titulo: string
  @Input() order: string
  promedioDocumentosSeleccionados: number

  TABLE_DATA: Documento[]

  public fechaDesde
  public fechaHasta

  fechaDesdePosta: string = null
  fechaHastaPosta: string = null

  displayedColumns: string[] = ['idContenido', 'nombre', 'extension', 'fecha_de_publicacion', 'velocidad_descarga', 'cantidad_descargas'];
  dataSource = new MatTableDataSource(this.TABLE_DATA)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(private serviceReportes: ServiceReporte) { }


  async ngOnInit() {
    this.dataSource.paginator = this.paginator
    await this.getDocumentosDelBack()
    this.calcularPromedio(new PageEvent())
  }

  async filtrar() {
    if (this.fechaDesde) {
      this.fechaDesdePosta = formatDate(this.fechaDesde, 'yyyy-MM-dd', 'en')
    }

    if (this.fechaHasta) {
      this.fechaHastaPosta = formatDate(this.fechaHasta, 'yyyy-MM-dd', 'en')
    }

    await this.getDocumentosDelBack()
    this.calcularPromedio(new PageEvent())
  }

  async getDocumentosDelBack() {
    const params: { [id: string]: any } = {}

    if (this.fechaDesdePosta) {
      params.start = this.fechaDesdePosta
    }

    if (this.fechaHastaPosta) {
      params.end = this.fechaHastaPosta
    }

    // Puede parecer que este order no hace nada, pero si lo sacas rompes todo
    // TODO: Debuggear porque se rompe cuando lo sacas
    params.order = 'desc'

    console.log(params)
    this.TABLE_DATA = await this.serviceReportes.getDocumentosReporte(params)

    this.dataSource = new MatTableDataSource(this.TABLE_DATA)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

    let sortState: Sort

    if (this.order === 'asc') {
      sortState = { active: 'cantidad_descargas', direction: 'desc' };
    } else {
      sortState = { active: 'cantidad_descargas', direction: 'asc' };
    }

    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  calcularPromedio(event?: PageEvent) {
    const skip = this.paginator.pageSize * this.paginator.pageIndex;
    let sortedData

    if(this.order === 'asc'){
    sortedData = this.TABLE_DATA.slice().sort((a, b) => b.cantidad_descargas - a.cantidad_descargas);
    }else{
      sortedData = this.TABLE_DATA.slice().sort((a, b) => a.cantidad_descargas - b.cantidad_descargas);

    }
    
    let pagedData = sortedData.filter((u, i) => i >= skip)
    .filter((u, i) => i < this.paginator.pageSize);
    
      const velocidades = pagedData.map(doc => doc.velocidad_descarga)
      console.log(velocidades);
    const promedio = velocidades.reduce((a, b) => a + b) / velocidades.length
    this.promedioDocumentosSeleccionados = promedio
  }

  renderizaMasDescargados() {
    return this.order === 'asc'
  }

}

