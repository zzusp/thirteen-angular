import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class RentRenterService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().RENT_RENTER,
      model: params,
      rule: {
        currentAccount: ['createBy'], currentDateTime: ['createTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/insert', insert);
  }

  /**
   * 修改
   *
   * @param params
   */
  update(params: any): Observable<any> {
    const update = {
      table: GlobalConstants.getInstance().RENT_RENTER,
      model: params,
      rule: {
        currentAccount: ['updateBy'], currentDateTime: ['updateTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/update', update);
  }

  /**
   * 由ID获取信息
   *
   * @param id ID
   */
  findById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().RENT_RENTER,
      criterias: [
        {field: 'id', value: id}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/findOneByParam', param);
  }

  /**
   * 获取列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = GlobalConstants.getInstance().RENT_RENTER;
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/findAllByParam', params);
  }

  /**
   * 获取所有列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/rent/findAll',
      {params: {'table': GlobalConstants.getInstance().RENT_RENTER}});
  }

  /**
   * 获取所有列表并将关联数据查出
   */
  findAllCascade(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/rent/findAll',
      {params: {'table': GlobalConstants.getInstance().RENT_RENTER}});
  }

  /**
   * 判断名称是否存在
   *
   * @param name 名称
   */
  checkName(name: string): Observable<any> {
    const params = {
      'table': GlobalConstants.getInstance().RENT_RENTER,
      'criterias': [
        {'field': 'name', 'value': name}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/isExist', params);
  }

  /**
   * 由ID删除信息
   *
   * @param id ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().RENT_RENTER,
      id: id
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }
}
