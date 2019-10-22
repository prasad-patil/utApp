import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DefaultPipe } from './default.pipe';
import { LoginComponent } from './components/login/login.component';
import { PostsComponent } from './components/posts/posts.component';
import { HoverFocusDirective } from './directives/hover-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    DefaultPipe,
    LoginComponent,
    PostsComponent,
    LoginComponent,
    HoverFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
