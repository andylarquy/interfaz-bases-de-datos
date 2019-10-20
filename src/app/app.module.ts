import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, matSelectAnimations } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MenuPrincipalComponent } from 'src/app/components/menuPrincipal/menuPrincipal.component';
import { DocumentosComponent } from 'src/app/components/documentos/documentos.component';
import { EditarDocumentoComponent } from 'src/app/components/editarDocumento/editarDocumento.component'
import { ReporteComponent } from 'src/app/components/reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MenuPrincipalComponent,
    MenuPrincipalComponent,
    EditarDocumentoComponent,
    ReporteComponent,
    DocumentosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CdkTableModule,
    MatSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
