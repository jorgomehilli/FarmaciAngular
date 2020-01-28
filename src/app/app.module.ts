import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { NavComponent } from './nav/nav.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { AppRoutingModule } from './app-routing.module';
import { CartService } from './cart/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { UsermanagementComponent } from './admin/usermanagement/usermanagement.component';
import { AdminGuard } from './admin/admin-guard.service';
import { ProductmanagementComponent } from './admin/productmanagement/productmanagement.component';
import { ProductsService } from './products/products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ProductsdialogComponent } from './admin/productmanagement/productsdialog/productsdialog.component';
import { UsersdialogComponent } from './admin/usermanagement/usersdialog/usersdialog.component';
import { StoreModule } from '@ngrx/store';
import { FilterPipe } from './admin/usermanagement/filter.pipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CartdialogComponent } from './cart/cartdialog/cartdialog.component';
import { appReducers } from './store/reducers/app.reducer';
import { CartEffects } from './store/effects/cart.effects';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    NavComponent,
    ProductItemComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    AdminComponent,
    UsermanagementComponent,
    ProductmanagementComponent,
    ProductsdialogComponent,
    UsersdialogComponent,
    FilterPipe,
    CartdialogComponent,
    FooterComponent
  ],

  entryComponents: [ProductsdialogComponent,
    UsersdialogComponent,
    CartdialogComponent],


  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([CartEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    CartService,
    AuthService,
    AuthGuard,
    AdminGuard,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
