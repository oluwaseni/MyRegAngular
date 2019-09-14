import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { TryComponent } from './try/try.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/AuthInterceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbidenComponent } from './forbiden/forbiden.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    TryComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbidenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar:true
    }),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
