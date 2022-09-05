import { PerfilComponent } from './components/view/perfil/perfil.component';
import { UserConfigComponent } from './components/view/user-config/user-config.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: UserConfigComponent,
        children: [
            { path: 'perfil', component: PerfilComponent },
            { path: 'financeiro', component: PerfilComponent }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
