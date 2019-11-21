import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarDocumentoComponent } from '../editarDocumento/editarDocumento.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator, MatTableDataSource, PageEvent, Sort, MatSort } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { ServiceDocumentos } from 'src/app/services/serviceDocumentos.service';
import { extensionesPosibles } from 'src/app/domain/extensiones'
import { Documento } from 'src/app/domain/documento';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver/dist/FileSaver';
import { DomSanitizer } from '@angular/platform-browser';
import { VentanaConfirmacionComponent } from '../VentanaConfirmacion/VentanaConfirmacion.component';


let TABLE_DATA: Documento[]
const reader = new FileReader();

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: [],
})

export class DocumentosComponent implements OnInit {
  public fechaDesde: Date
  public fechaHasta: Date

  extensionSeleccionada: string = null

  fechaDesdePosta: string = null
  fechaHastaPosta: string = null
  extensionSeleccionadaPosta: string = null

  ordenamiento: string = null

  extensionesPosibles = extensionesPosibles

  downloadLink: string

  tituloADescargar: string = ''
  extensionADescargar: string = ''

  displayedColumns: string[] = ['idContenido', 'titulo', 'extension', 'fecha_de_publicacion', 'actions'];
  dataSource = new MatTableDataSource(TABLE_DATA)
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(public dialog: MatDialog, private serviceDocumentos: ServiceDocumentos, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.getDocumentosDelBack()
  }

  filtrar() {

    this.extensionSeleccionadaPosta = this.extensionSeleccionada

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

    if (this.extensionSeleccionadaPosta) {
      params.extension = this.extensionSeleccionadaPosta
    }

    params.sort = this.ordenamiento
    console.log(params)


    TABLE_DATA = await this.serviceDocumentos.getDocumentos(params)

    this.dataSource = new MatTableDataSource(TABLE_DATA)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  crearDocumento(esUnaEdicion: boolean) {
    this.editarDocumento(new Documento(), esUnaEdicion)
  }

  editarDocumento(documentoAEditar: Documento, esUnaEdicion_: boolean) {

    const dialogRef = this.dialog.open(EditarDocumentoComponent, {
      width: '40em',
      height: '30em',
      data: {
        documento: documentoAEditar,
        esUnaEdicion: esUnaEdicion_
      }
    })

    dialogRef.afterClosed().subscribe(() => {
      this.getDocumentosDelBack()
    });
  }


  async descargarDocumento(documento: Documento) {
    const contenidoB64Encoded = btoa(documento.contenido)
    this.downloadLink = 'data:application/octet-stream;charset=utf-8;base64,' + contenidoB64Encoded;
    this.tituloADescargar = documento.titulo
    this.extensionADescargar = documento.extension
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  //<<<<<<< Boton Modal De Borrar >>>>>>>

  eliminarDocumento(documentoAEliminar: Documento) {

    const dialogRefDelete = this.dialog.open(VentanaConfirmacionComponent, {
      width: '26em',
      height: '10em',
      data: {
        documento: documentoAEliminar
      }
    })

    dialogRefDelete.afterClosed().subscribe(() => {
      this.getDocumentosDelBack()
    });

  }
  
}