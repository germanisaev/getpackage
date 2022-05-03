import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@app/models/user';
import { LogIn } from '@app/store/actions';
import { AppState, selectAuthState } from '@app/store/app.states';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage!: string | null;
  
  constructor(
    private store: Store<AppState>,
    private translate: TranslateService,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.translate.currentLang;

    this.getState.subscribe((state) => {
      console.log(state);
      this.errorMessage = state;
    });

  };

  onSubmit(): void {
    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }

}
