import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from './@layout/@layout.service';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  /**
   * 全局加载动画显示标识
   */
  loading: boolean = false;

  /**
   * 对于 Type 类型(函数类型) 的对象，我们一般使用 constructor(private mailService: MailService) 方式进行注入。
   * 而 Inject 装饰器一般用来注入非 Type 类型的对象
   * 声明方法2  @Inject(MailService) private mailService
   */
  constructor(private layoutService: LayoutService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit(): void {
    // 路由导航开始事件回调
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    )
      .subscribe((event) => {
        // 全局加载动画开始
        this.layoutService.loadStart();
      });
    // 路由导航结束事件回调
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    )
      .subscribe((event) => {
        // 全局加载动画结束
        this.layoutService.loadEnd();
        // 动态设置title
        this.title.setTitle(event['breadcrumb']);
      });
    // 路由导航开始事件回调
    this.router.events.pipe(
      filter(event => event instanceof NavigationError)
    )
      .subscribe((event) => {
        // 全局加载动画结束
        this.layoutService.loadEnd();
      });
    // 获取全局加载动画显示标识
    this.layoutService.getLoading()
      .subscribe((loading: boolean) => {
        setTimeout(() => {
          this.loading = loading;
        });
      });
  }

}
