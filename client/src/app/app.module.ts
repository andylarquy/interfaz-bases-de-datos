import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './ng-material.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MenuPrincipalComponent } from 'src/app/components/menuPrincipal/menuPrincipal.component';
import { DocumentosComponent } from 'src/app/components/documentos/documentos.component';
import { EditarDocumentoComponent } from 'src/app/components/editarDocumento/editarDocumento.component'
import { ReporteComponent } from 'src/app/components/reporte/reporte.component';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PanelReporteComponent } from './components/panel-reporte/panel-reporte.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MenuPrincipalComponent,
    MenuPrincipalComponent,
    EditarDocumentoComponent,
    ReporteComponent,
    DocumentosComponent,
    PanelReporteComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    CdkTableModule


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
  entryComponents: [EditarDocumentoComponent]
})
export class AppModule { }
