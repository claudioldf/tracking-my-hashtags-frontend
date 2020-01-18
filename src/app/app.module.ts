import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {TimeAgoPipe} from 'time-ago-pipe';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ContentComponent } from './components/shared/content/content.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { MonitorComponent } from './components/pages/monitor/monitor.component';
import { CardTweetComponent } from './components/pages/monitor/card-tweet/card-tweet.component';
import { HashtagFormComponent } from './components/pages/monitor/hashtag-form/hashtag-form.component';
import { MyHashtagsComponent } from './components/pages/monitor/my-hashtags/my-hashtags.component';

@NgModule({
  declarations: [
    TimeAgoPipe,

    AppComponent,
    HeaderComponent,
    ContentComponent,
    MenuComponent,
    MonitorComponent,
    CardTweetComponent,
    HashtagFormComponent,
    MyHashtagsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
