/*给localstorage设置缓存时间 */
import * as dayjs from 'dayjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  key: any = {
    // 辅助
    expiredTime: 'EXPIRED:TIME',
    expiredStartTime: 'EXPIRED:START:TIME',

    // 全局使用
    // 用户信息
    loginInfo: 'LOGIN_INFO',
    userInfo: 'USER_INFO',
    // 用户信息期限
    loginDateRange: 5 * 60 * 60 * 1000, // 登陆限制默认未5小时，转成毫秒 2小时 = 2*60*60*1000
  };

  /**
   * 设置缓存
   * @param key 键
   * @param value 值
   * @param expired  过期时间，单位 分钟
   */
  set(key: string, value: string, expired: number): void {
    // console.log("$cache set: key=" + key + " value = " + value + " expiredTimeMS = " + expiredTimeMS)
    if ((expired === 0) || (expired == null)) {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(key + this.key.expiredTime, String((expired * 60 * 1000)) );
      localStorage.setItem(key + this.key.expiredStartTime, `${dayjs().valueOf()}`);
    }
  }
  /**
   *  获取键
   * @param key 键
   * @returns  *   key存在，返回对象；不存在，返回null
   */
  get(key: string): any {
    // console.log(key);
    const expiredTimeMS = localStorage.getItem(key + this.key.expiredTime);
    const expiredStartTime = localStorage.getItem(key + this.key.expiredStartTime);
    const curTime = new Date().getTime();

    const sum = Number(expiredStartTime) + Number(expiredTimeMS);

    if ((sum) > curTime) {
      // console.log("$cache-缓存[" + key + "]存在！");
      return JSON.parse(localStorage.getItem(key));
    } else {
      // console.log("$cache-缓存[" + key + "]不存在！");
      this.remove(key);
      return null;
    }
  }

  /**
   *  移除键
   * @param key 键
   */
  remove(key: string): void {
    localStorage.removeItem(key);
    localStorage.removeItem(key + this.key.expiredTime);
    localStorage.removeItem(key + this.key.expiredStartTime);
  }

  /**
   * 对键重新更新过期时间
   * @param key 键
   * @param expiredTimeMS  过期时间ms
   */
  expired(key: string, expiredTimeMS: any): void {
    if (this.get(key) != null) {
      localStorage.setItem(key + this.key.expiredTime, expiredTimeMS);
    }
  }
  /**
   * 清除所有缓存
   */
  clear(): void {
    localStorage.clear();
  }

}

