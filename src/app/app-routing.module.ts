import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { UsermanagementComponent } from './admin/usermanagement/usermanagement.component';
import { AdminGuard } from './admin/admin-guard.service';
import { ProductmanagementComponent } from './admin/productmanagement/productmanagement.component';

const routes: Routes = [
    
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
    { path: 'authentication', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'admin', canActivate: [AdminGuard], component: AdminComponent, children:[
        {path:'users', component: UsermanagementComponent},
        {path:'productmanagement', component: ProductmanagementComponent}      
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}