import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LogOut } from './store/actions';
import { AppState, selectAuthState } from './store/app.states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  changeLanguage: string = '';
  getState: any;

  constructor(private translate: TranslateService, private store: Store<AppState>) {
    translate.setDefaultLang('en');
    this.getState = this.store.select(selectAuthState);
  }

  useLanguage(language: string): void {
    
    this.translate.use(language);
    this.changeLanguage = this.translate.currentLang;
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
}
