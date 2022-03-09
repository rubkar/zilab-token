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
import { ClipboardModule } from 'ngx-clipboard';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AboutICOComponent } from './components/about-ico/about-ico.component';
import { AdvisorsComponent } from './components/advisors/advisors.component';
import { AppComponent } from './app.component';
import { Comment2Component } from './components/comment2/comment2.component';
import { EarthLightComponent } from './components/earth-light/earth-light.component';
import { FaquesComponent } from './components/faques/faques.component';
import { FooterComponent } from './components/footer/footer.component';
import { GettingTouchComponent } from './components/getting-touch/getting-touch.component';
import { HeaderComponent } from './components/header/header.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { MainComponent } from './components/main/main.component';
import { OurDataComponent } from './components/our-data/our-data.component';
import { PapersComponent } from './components/papers/papers.component';
import { PartnersComponent } from './components/partners/partners.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { IconSnackbarComponent } from './components/shared/icon-snackbar.component';
import { TwoDigitDecimalNumberDirective } from './components/shared/two-digit-decimal-number.directive';
import { SmartContectComponent } from './components/smart-contect/smart-contect.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { TokensComponent } from './components/tokens/tokens.component';
import { HttpClientModule } from '@angular/common/http';

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
    IconSnackbarComponent,
    TwoDigitDecimalNumberDirective,
  ],
  imports: [
    MATERIAL_MODULES,
    ClipboardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    CarouselModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
