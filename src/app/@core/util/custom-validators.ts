import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { ResponseResultModel } from '../net/response-result.model';
import { Observable } from 'rxjs';

/**
 * 正则表达式验证
 *
 * @param {string} name 名称（验证失败时返回对象的key）
 * @param {RegExp} regex 正则表达式
 * @returns {ValidatorFn}
 */
export function validateRegex(name: string, regex: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    // 获取当前控件的内容
    const str = control.value;
    // 如果验证通过则返回 null 否则返回一个对象（包含我们自定义的属性）
    return regex.test(str) ? null : {[name]: str};
  };
}

/**
 * 异步校验，错误标识 existing
 *
 * @param {AbstractRequest} requset 异步请求
 */
export function abstractValidate(requset: AbstractRequest) {
  return (control: AbstractControl): Promise<ValidationErrors> => {
    return new Promise<any>((resolve, reject) => {
      if (control.value) {
        requset(control.value).pipe(
          // debounceTime：去抖
          debounceTime(1000),
          // distinctUntilChanged：抑制重复值
          distinctUntilChanged(),
          // first：只发射第一项
          first()
        ).subscribe((res: ResponseResultModel) => {
          if (res.result) {
            resolve({'existing': true});
          } else {
            resolve(null);
          }
        }, err => {
          console.error('server error:', err.message);
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  };
}

/**
 * 将方法作为属性类型
 */
export type AbstractRequest = (value: string) => Observable<any>;
