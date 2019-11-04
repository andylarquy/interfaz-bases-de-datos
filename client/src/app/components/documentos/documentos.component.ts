import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarDocumentoComponent } from '../editarDocumento/editarDocumento.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator, MatTableDataSource, PageEvent, Sort, MatSort } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { extensionesPosibles } from 'src/app/domain/extensiones'
import { Documento } from 'src/app/domain/documento';

let TABLE_DATA: Documento[]

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: [],
})

export class DocumentosComponent implements OnInit {
  public fechaDesde: Date
  public fechaHasta: Date

  extensionSeleccionada: string = null

  fechaDesdePosta: Date = null
  fechaHastaPosta: Date = null
  extensionSeleccionadaPosta: string = null

  ordenamiento: string = null

  extensionesPosibles = extensionesPosibles

  displayedColumns: string[] = ['idContenido', 'titulo', 'extension', 'fecha_de_publicacion'];
  dataSource = new MatTableDataSource(TABLE_DATA)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(public dialog: MatDialog, private serviceDocumentos: ServiceDocumentos) {}


  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }


  public async paginatorEvent(event?: PageEvent) {

    const params: { [id: string]: any } = {}
    console.log(event)

    if (this.fechaDesdePosta) {
      params.start = this.fechaDesdePosta.toLocaleDateString()
    }

    if (this.fechaHastaPosta) {
      params.end = this.fechaHastaPosta.toLocaleDateString()
    }

    params.extension = this.extensionSeleccionadaPosta

    params.sort = this.ordenamiento
    console.log(params)
    // const params = new HttpParams()
    console.log(event)

    TABLE_DATA = await this.serviceDocumentos.getDocumentos(params)
    console.log(TABLE_DATA)
    this.dataSource = new MatTableDataSource(TABLE_DATA)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    //console.log(a)
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
    this.extensionSeleccionadaPosta = this.extensionSeleccionada
    this.fechaDesdePosta = this.fechaDesde
    this.fechaHastaPosta = this.fechaHasta
    console.log(this.fechaDesde.toTimeString())
    console.log(this.extensionSeleccionada)
    console.log('Fecha desde: ' + this.fechaDesde)
    console.log('Fecha hasta: ' + this.fechaHasta)
    console.log(this.paginator)// Las propiedades pageIndex y pageSize resuelven el paginado
    // page emite un evento que ayuda tambien
  }

}
