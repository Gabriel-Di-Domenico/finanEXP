import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateComponent } from './components/view/authenticate/authenticate.component';

const routes: Routes = [{
    path: 'auth',
    component: AuthenticateComponent
    
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticateRoutingModule {

}
