import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './how-i-feel-today/dashboard/dashboard.component';
import { ChartHorizontalComponent } from './how-i-feel-today/graph/chart-horizontal/chart-horizontal.component';
import { ChartVerticalComponent } from './how-i-feel-today/graph/chart-vertical/chart-vertical.component';
import { GraphComponent } from './how-i-feel-today/graph/graph.component';
import { MoodDetailComponent } from './how-i-feel-today/mood-detail/mood-detail.component';
import { MoodComponent } from './how-i-feel-today/mood/mood.component';
import { MoodsComponent } from './how-i-feel-today/moods/moods.component';
import { DashboardHrComponent } from './hr/dashboard-hr/dashboard-hr.component';
import { MiniThoughtComponent } from './hr/mini-thought/mini-thought.component';
import { MoodMessageComponent } from './hr/mood-message/mood-message.component';
import { MoodMessagesComponent } from './hr/mood-messages/mood-messages.component';
import { PaginatorComponent } from './hr/paginator/paginator.component';
import { ThoughtsFeedComponent } from './hr/thoughts-feed/thoughts-feed.component';
import { ChipComponent } from './kudos/chip/chip.component';
import { FeedComponent } from './kudos/feed/feed.component';
import { KudoComponent } from './kudos/kudo/kudo.component';
import { KudosDashboardComponent } from './kudos/kudos-dashboard/kudos-dashboard.component';
import { MiniKudoComponent } from './kudos/mini-kudo/mini-kudo.component';
import { NewKudoComponent } from './kudos/new-kudo/new-kudo.component';
import { UserChipsComponent } from './kudos/user-chips/user-chips.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuProfileComponent } from './menu-profile/menu-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { TokenInterceptor } from './services/token.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { ThoughtsDetailComponent } from './hr/thoughts-feed/thoughts-detail/thoughts-detail.component';
import { HrGraphComponent } from './hr/hr-graph/hr-graph.component';
import { NotificationsDropdownComponent } from './notifications-dropdown/notifications-dropdown.component';
import { AnonymousComponent } from './anonymous/anonymous.component';
import { UserThoughtsComponent } from './suggestions/user-thoughts/user-thoughts.component';
import { UsersFilterComponent } from './filters/user-fiter/users-filter.component';
import { FiltersComponent } from './filters/filters.component';
import { DateFilterComponent } from './filters/date-filter/date-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    ProfileDropdownComponent,
    SidebarComponent,
    NavbarComponent,
    MoodsComponent,
    MoodComponent,
    MoodDetailComponent,
    LogoutComponent,
    MobileMenuComponent,
    SuggestionsComponent,
    MenuProfileComponent,
    KudosDashboardComponent,
    NewKudoComponent,
    UserChipsComponent,
    ChipComponent,
    GraphComponent,
    ChartHorizontalComponent,
    ChartVerticalComponent,
    KudoComponent,
    FeedComponent,
    MiniKudoComponent,
    DashboardComponent,
    DashboardHrComponent,
    MoodMessagesComponent,
    MoodMessageComponent,
    PaginatorComponent,
    HrGraphComponent,
    ThoughtsFeedComponent,
    MiniThoughtComponent,
    ThoughtsDetailComponent,
    NotificationsDropdownComponent,
    AnonymousComponent,
    UserThoughtsComponent,
    UsersFilterComponent,
    FiltersComponent,
    DateFilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
