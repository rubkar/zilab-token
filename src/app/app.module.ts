import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AboutICOComponent } from './about-ico/about-ico.component';
import { AdvisorsComponent } from './advisors/advisors.component';
import { AppComponent } from './app.component';
import { Comment2Component } from './comment2/comment2.component';
import { EarthLightComponent } from './earth-light/earth-light.component';
import { FaquesComponent } from './faques/faques.component';
import { FooterComponent } from './footer/footer.component';
import { GettingTouchComponent } from './getting-touch/getting-touch.component';
import { HeaderComponent } from './header/header.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { MainComponent } from './main/main.component';
import { OurDataComponent } from './our-data/our-data.component';
import { PapersComponent } from './papers/papers.component';
import { PartnersComponent } from './partners/partners.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SmartContectComponent } from './smart-contect/smart-contect.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TokensComponent } from './tokens/tokens.component';

const MATERIAL_MODULES = [
  ReactiveFormsModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatOptionModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RoadmapComponent,
    PartnersComponent,
    StatisticComponent,
    EarthLightComponent,
    SmartContectComponent,
    TokensComponent,
    PapersComponent,
    OurDataComponent,
    FaquesComponent,
    AdvisorsComponent,
    LatestNewsComponent,
    Comment2Component,
    AboutICOComponent,
    GettingTouchComponent,
  ],
  imports: [
    MATERIAL_MODULES,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    CarouselModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
