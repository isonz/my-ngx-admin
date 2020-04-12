import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import {getDeepFromObject} from '../../../../helpers';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})

export class NgxLoginComponent extends NbLoginComponent {


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
