/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, Inject, OnInit} from '@angular/core';
import { AnalyticsService } from './@core/utils';
import {LocalStorageService} from './services/local.storage.service';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    @Inject('LANG_LIST') public langList: Array<string>,
    @Inject('LANG_DEFAULT') public langDefault: string,
    private localStorage: LocalStorageService,
  ) { }

  static getQueryString(name: string) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {return  unescape(r[2]); } return null;
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.translate.use(this.langDefault);


    // this.getLang();  // 开启多语言，在每个module里面与app.module.ts配置一样，可以单独为module配置多语言, 使用:地址末尾加 ?lang=zh-cn (en-us, zh-hk)
  }

  getLang() {
    let lang: string = AppComponent.getQueryString('lang');
    const expired = 2 * 24 * 60;    // (2天) 单位 分钟
    if (lang) {
      this.localStorage.set('_lang', lang, expired);
    } else {
      lang = this.localStorage.get('_lang');
      if (lang) {
        this.localStorage.set('_lang', lang, expired);
      } else {
        lang = navigator.language.toLowerCase();
      }
    }
    this.setLang(lang);

    // this.route.queryParams.subscribe(params => {
    //   const l: string = params.lang;
    //   // if (!l) { return false; }
    //   console.log(params);
    //   this.setLang(l);
    // });

  }

  setLang(lang: string) {
    // console.log(lang);
    if (this.langList.indexOf(lang) > -1) {
      // translate.setDefaultLang(lang);
      this.translate.use(lang);
    } else {
      this.translate.use(this.langDefault);
    }
  }
}
