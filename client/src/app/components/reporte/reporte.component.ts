import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  public fechaDesde1
  public fechaHasta1

  public fechaDesde2
  public fechaHasta2
  constructor() { }

  ngOnInit() {
  }

  filtrar1() {
    console.log('fecha desde ' + this.fechaDesde1)
    console.log('fecha hasta ' + this.fechaHasta1)
  }

  filtrar2() {
    console.log('fecha desde ' + this.fechaDesde2)
    console.log('fecha hasta ' + this.fechaHasta2)
  }

}
