import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ResponseResultModel } from '../../@core/net/response-result.model';
import { ChartModel } from '../../@core/model/chart.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /** 查询参数 */
  params: any = {
    type: '0',
    timePoint: new Date()
  };
  /** 访问量图表配置 */
  visitsOption: any;
  /** 访问来源分布图表配置 */
  distributionOption: any;
  /** 访问量加载中标识 */
  visitsLoading: boolean;
  /** 访问来源分布加载中标识 */
  distributionLoading: boolean;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    // 初始化图表
    this.initVisits();
    this.initDistribution();
  }

  /**
   * 初始化访问量图表
   */
  initVisits() {
    this.visitsLoading = true;
    // 初始化日期管道对象
    const datePipe = new DatePipe('en-US');
    // 格式化Date类型
    const params: any = {
      type: this.params.type,
      timePoint: datePipe.transform(this.params.timePoint, 'yyyy-MM-dd HH:mm:ss')
    };
    // 查询访问量
    this.dashboardService.getVisits(params)
      .subscribe((res: ResponseResultModel) => {
        if (res.result) {
          const result: ChartModel = res.result;
          this.visitsOption = {
            title: {
              text: result.name,
              x: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              data: result.axisx
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '访问量',
              data: result.series[0].data,
              type: 'bar'
            }]
          };
        }
        this.visitsLoading = false;
      });
  }

  /**
   * 访问来源分布
   */
  initDistribution() {
    this.distributionLoading = true;
    // 查询访问来源分布
    this.dashboardService.getDistribution()
      .subscribe((res: ResponseResultModel) => {
        if (res.result) {
          const result: ChartModel = res.result;
          this.distributionOption = {
            title: {
              text: result.name,
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: result.axisx
            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: result.series[0].data
            }]
          };
        }
        this.distributionLoading = false;
      });
  }

  /**
   * 时间维度变更监听
   *
   * @param result
   */
  onTypeChange(result: any): void {
    this.initVisits();
  }

  /**
   * 时间日期变更监听
   *
   * @param result
   */
  onDateChange(result: Date): void {
    this.initVisits();
  }
}
