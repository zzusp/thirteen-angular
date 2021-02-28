import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class RentTransportService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().RENT_TRANSPORT,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().RENT_TRANSPORT_SPEC,
        localField: 'id',
        foreignField: 'transportId',
        as: 'rentTransportSpecs',
        unwind: false
      }],
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
      table: GlobalConstants.getInstance().RENT_TRANSPORT,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().RENT_TRANSPORT_SPEC,
        localField: 'id',
        foreignField: 'transportId',
        as: 'rentTransportSpecs',
        unwind: false
      }],
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
      table: GlobalConstants.getInstance().RENT_TRANSPORT,
      criterias: [
        {field: 'id', value: id}
      ],
      lookups: [{
        from: GlobalConstants.getInstance().RENT_TRANSPORT_SPEC,
        localField: 'id',
        foreignField: 'transportId',
        as: 'rentTransportSpecs',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/findOneByParam', param);
  }

  /**
   * 获取列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = GlobalConstants.getInstance().RENT_TRANSPORT;
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/findAllByParam', params);
  }

  /**
   * 由ID删除信息
   *
   * @param id ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().RENT_TRANSPORT,
      id: id,
      lookups: [{
        from: GlobalConstants.getInstance().RENT_TRANSPORT_SPEC,
        localField: 'id',
        foreignField: 'transportId',
        as: 'rentTransportSpecs',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }
}
