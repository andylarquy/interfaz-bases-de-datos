import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-reporte',
  templateUrl: './panel-reporte.component.html',
  styleUrls: ['./panel-reporte.component.css']
})
export class PanelReporteComponent implements OnInit {

  @Input() titulo: string
  public fechaDesde
  public fechaHasta

  constructor() { }

  ngOnInit() {
  }

  filtrar() {
    console.log('fecha desde ' + this.fechaDesde)
    console.log('fecha hasta ' + this.fechaHasta)
  }

}
