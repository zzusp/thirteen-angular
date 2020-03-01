/**
 * 默认HTTP拦截器，其注册细节见 `shared.module.ts`
 */
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { getToken } from '../util/user-info';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  private startTime: number;
  private endTime: number;

  constructor(private injector: Injector) {
  }

  /**
   * 跳转
   *
   * @param url 目标路径
   */
  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  /**
   * 返回上一页
   */
  private goBack(): void {
    // this.injector.get(Location).back();
  }

  /**
   * 返回结果处理
   *
   * @param event
   */
  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    this.endTime = new Date().getTime();
    const loadingTime = this.endTime - this.startTime;
    if (loadingTime < 500) {
      // setTimeout(()=>{
      //   // 加载动画结束
      //   this.injector.get(AppService).end();
      // }, 500-loadingTime);
    } else {
      // 加载动画结束
      // this.injector.get(AppService).end();
    }
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        // 业务层级错误处理
        // 并显示 `error_message` 内容
        const body: any = event instanceof HttpResponse && event.body;
        if (body && typeof body.status !== 'undefined' && body.status !== 200) {
          // this.msg.error(body.error_message);
          // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
          // this.http.get('/').subscribe() 并不会触发
          if (body.status === 401) {// 未登录状态码
            this.goTo('/pages/login');
            break;
          } else if (body.status === 403) {// 权限不足状态码
            this.goBack();
          } else if (body.status === 400) {// 入参不匹配状态码
          } else if (body.status === 404) {// 资源未找到状态码
            // this.goTo(`/pages/404`);
          } else if (body.status === 500) {// 请求发生错误状态码
            // this.goTo(`/pages/500`);
          }
          // this.injector.get(AppModalService).error({
          //   nzTitle: '请求失败',
          //   nzContent: body.message,
          //   nzMaskClosable: true
          // });
          this.injector.get(NzModalService).confirm({
            nzTitle: '请求失败',
            nzContent: body.message,
            nzMaskClosable: true
          }, 'error');
        }
        break;
      case 401: // 未登录状态码
        this.goTo('/pages/login');
        break;
      case 403: // 权限不足状态码
        this.goBack();
        break;
      case 404: // 资源未找到状态码
        this.goTo(`/pages/${event.status}`);
        break;
      case 500: // 请求发生错误状态码
        this.goTo(`/pages/${event.status}`);
        break;
    }
    return of(event);
  }

  /**
   * 拦截器
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // 获取token
    const token = getToken();
    // 统一加上服务端前缀
    let newReq;
    if (token) {
      newReq = req.clone({
        // 拦截所有请求，并且在header中增加响应头以及token
        headers: req.headers.set('Authorization', token)
      });
    } else {
      newReq = req.clone();
    }
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse && event.status === 200) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }

}
