import { HttpModule } from '@angular/http';
import { LoginWebviewComponent } from './loginWebview.component';
import { UserService } from './../User/user.service';
import { CanActivateLogin } from './loginCanActivate.service';
import { LoginPageComponent } from './loginPage.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'login', component: LoginPageComponent , canActivate: [CanActivateLogin] }
];

@NgModule({
    imports: [RouterModule.forChild(routes),HttpModule],
    exports: [RouterModule],
    providers: [CanActivateLogin,UserService]
})
export class LoginRoutingModule { }

const LoginRoutingComponents = [LoginPageComponent, LoginWebviewComponent];

export const LoginModule = {
    routing: LoginRoutingModule,
    components: LoginRoutingComponents
}