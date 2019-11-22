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
import { ServiceDescargas } from 'src/app/services/serviceDescargas.service';


let TABLE_DATA: Documento[]
const reader = new FileReader();
declare var require: any;
const axios = require('axios');
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

  constructor(
    public dialog: MatDialog,
    private serviceDocumentos: ServiceDocumentos,
    private serviceDescargas: ServiceDescargas,
    private sanitizer: DomSanitizer) { }

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

    console.log(await this.serviceDocumentos.getDocumentos(params))

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


  async prepararDescargarDocumento(documento: Documento) {
    documento = await this.getDocumentoDelBack(documento)
    const contenidoB64Encoded = btoa(documento.contenido)
    this.downloadLink = 'data:application/octet-stream;charset=utf-8;base64,' + contenidoB64Encoded;
    this.tituloADescargar = documento.titulo
    this.extensionADescargar = documento.extension

  }

  async getDocumentoDelBack(documento: Documento) {
    const temp = await this.serviceDocumentos.getDocumentoById(documento.idContenido)
    return temp[0]
  }

  async sanitize(url: string, documento: Documento) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async onDownloadClick(event, documento: Documento) {
    try {
      await this.prepararDescargarDocumento(documento)
      await this.realizarDescarga(event, documento)
      await this.serviceDescargas.agregarDescargaEnElBack(documento)
    } catch (error) {
      console.log('Error al intentar descargar')
      console.log(error)
    }

  }

  async realizarDescarga(event, documento: Documento) {

    const anchor = event.target.nextElementSibling;
    documento = documento[0]

    const response = await axios({
      method: 'get',
      url: this.downloadLink,
      responseType: 'blob',
      headers: {
        'Accept': 'application/octet-stream'
      }
    })

    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = this.tituloADescargar + '.' + this.extensionADescargar;
    anchor.click();
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