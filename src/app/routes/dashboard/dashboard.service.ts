import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  /**
   * 获取访问量，即登陆次数
   *
   * @param params
   */
  getVisits(params: any): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-log-login/getVisits', {params: params});
  }

  /**
   * 获取访问来源分布，即登陆地区分布
   */
  getDistribution(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/sys-log-login/getDistribution');
  }
}
