import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { PartnersComponent } from './partners/partners.component';
import { StatisticComponent } from './statistic/statistic.component';
import { EarthLightComponent } from './earth-light/earth-light.component';
import { SmartContectComponent } from './smart-contect/smart-contect.component';
import { TokensComponent } from './tokens/tokens.component';
import { PapersComponent } from './papers/papers.component';
import { OurDataComponent } from './our-data/our-data.component';
import { FaquesComponent } from './faques/faques.component';
import { AdvisorsComponent } from './advisors/advisors.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { Comment2Component } from './comment2/comment2.component';
import { AboutICOComponent } from './about-ico/about-ico.component';
import { GettingTouchComponent } from './getting-touch/getting-touch.component';

import * as $ from 'jquery';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

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
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    CarouselModule,
    MatSnackBarModule,
    MatBadgeModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
