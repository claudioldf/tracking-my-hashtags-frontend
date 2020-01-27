import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from './utils/http.interceptor';

// third libs
import { NotifierModule } from "angular-notifier";

// pipes
import {TimeAgoPipe} from 'time-ago-pipe';

import { ROUTES } from './app.routes';

// components
import { AppComponent } from './app.component';

// global components
import { HeaderComponent } from './components/shared/header/header.component';
import { ContentComponent } from './components/shared/content/content.component';
import { MenuComponent } from './components/shared/menu/menu.component';

// pages components
import { MessagesComponent } from './components/pages/dashboard/messages.component';
import { TweetCardComponent } from './components/pages/dashboard/tweet-card/tweet-card.component';
import { HashtagFormComponent } from './components/pages/dashboard/hashtag-form/hashtag-form.component';
import { HashtagFilterComponent } from './components/pages/dashboard/hashtag-filter/hashtag-filter.component';
import { HashtagListComponent } from './components/pages/dashboard/hashtag-list/hashtag-list.component';
import { HashtagService } from './services/hashtag.service';
import { TweetService } from './services/tweet.service';

@NgModule({
  declarations: [
    TimeAgoPipe,

    AppComponent,
    HeaderComponent,
    ContentComponent,
    MenuComponent,
    MessagesComponent,
    TweetCardComponent,
    HashtagFormComponent,
    HashtagFilterComponent,
    HashtagListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      theme: "material",
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    HashtagService,
    TweetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
