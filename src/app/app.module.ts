import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { DishService } from './services/dish.service'; /* Importation de service a partir de son nom de classe */
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';

// Service les erreur 
import { ProcessHTPPMsgService } from './services/process-htppmsg.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { MatDialogModule } from '@angular/material/dialog';

// Form
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatSliderModule } from '@angular/material/slider';

//Progress spinner
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//HTTP
import { HttpClientModule } from '@angular/common/http';
//import { HttpModule } from '@angular/http';

import { baseURL } from '../app/menu/shared/baseURL';
import { HighlightDirective } from './directives/highlight.directive';
import { FeedbackService } from './services/feedback.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,

  ],
  providers: [ DishService, PromotionService, LeaderService,ProcessHTPPMsgService,FeedbackService,
  {provide: 'baseURL' , useValue: baseURL} ],
  entryComponents: [
    LoginComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
