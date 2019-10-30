import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalComponent } from 'src/app/components/menuPrincipal/menuPrincipal.component';
import { DocumentosComponent } from 'src/app/components/documentos/documentos.component';
import { EditarDocumentoComponent } from 'src/app/components/editarDocumento/editarDocumento.component'
import { ReporteComponent } from 'src/app/components/reporte/reporte.component';

export const routes: Routes = [
    { path: '', redirectTo: '/menuPrincipal', pathMatch: 'full' },
    { path: 'menuPrincipal', component: MenuPrincipalComponent },
    { path: 'documentos', component: DocumentosComponent },
    //{ path: 'editarDocumento', component: EditarDocumentoComponent },
    { path: 'reporte', component: ReporteComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
    MenuPrincipalComponent,
    MenuPrincipalComponent,
    EditarDocumentoComponent,
    ReporteComponent,
    DocumentosComponent
];
