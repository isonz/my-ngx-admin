import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule} from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';
import {NgxLoginComponent} from './components/login/login.component';
import {TranslateModule} from '@ngx-translate/core';
import {defaultAuthOptions} from './auth.options';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule.forRoot(defaultAuthOptions),
    TranslateModule,
  ],
  declarations: [
    NgxLoginComponent,
  ],
})
export class NgxAuthModule {
  constructor() {

  }
}
