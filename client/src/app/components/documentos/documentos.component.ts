import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarDocumentoComponent } from '../editarDocumento/editarDocumento.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator, MatTableDataSource, PageEvent, Sort, MatSort } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { extensionesPosibles } from 'src/app/domain/extensiones'
import { DatePipe } from '@angular/common'
import { Documento } from 'src/app/domain/documento';

export interface TablaDocumentos {
  id: number;
  nombre: string;
  extension: string;
  fecha: string;
}

let TABLE_DATA: Documento[] = [
/*  { id: 1, titulo: 'Harry Potter', extension: 'pdf', fecha: '10/10/95' },
  { id: 2, titulo: 'Tlön, Uqbar, Orbis Tertius', extension: 'pdf', fecha: '10/10/98' },
  { id: 3, titulo: 'Rayuela', extension: 'doc', fecha: '10/10/01' },
  { id: 4, titulo: 'Cuarto', extension: 'pdf', fecha: '08/12/15' },
  { id: 5, titulo: 'Quinto', extension: 'docx', fecha: '05/04/18' },*/
];

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: [],
  providers: [DatePipe]
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

  pageEvent: PageEvent
  pageIndex: number
  pageSize: number
  length: number

  displayedColumns: string[] = ['idContenido', 'titulo', 'extension', 'fecha_de_publicacion'];
  dataSource = new MatTableDataSource(TABLE_DATA)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, {static: true}) sort: MatSort

  constructor(
    public dialog: MatDialog,
    private serviceDocumentos: ServiceDocumentos,
    public datePipe: DatePipe) { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    console.log(this.extensionesPosibles)
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
    this.fechaHastaPosta = this.fechaDesde
    console.log(this.fechaDesde.toLocaleDateString())
    console.log(this.extensionSeleccionada)
    console.log('Fecha desde: ' + this.fechaDesde)
    console.log('Fecha hasta: ' + this.fechaHasta)
    console.log(this.paginator)// Las propiedades pageIndex y pageSize resuelven el paginado
    // page emite un evento que ayuda tambien
  }

}
