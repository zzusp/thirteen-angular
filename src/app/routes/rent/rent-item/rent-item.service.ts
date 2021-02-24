import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentItemService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().RENT_ITEM,
      model: params,
      rule: {
        currentAccount: ['account', 'createBy'], currentDateTime: ['createTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/insert', insert);
  }

  /**
   * 修改
   *
   * @param params
   */
  update(params: any): Observable<any> {
    const update = {
      table: GlobalConstants.getInstance().RENT_ITEM,
      model: params,
      rule: {
        currentAccount: ['account', 'updateBy'], currentDateTime: ['updateTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/update', update);
  }

  /**
   * 由ID获取信息
   *
   * @param id ID
   */
  findById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().RENT_ITEM,
      criterias: [
        {field: 'id', value: id}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/findOneByParam', param);
  }

  /**
   * 获取列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = GlobalConstants.getInstance().RENT_ITEM;
    params['criterias'].push({'field': 'account'});
    params['rule'] = {currentAccount: ['account']};
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/findAllByParam', params);
  }

  /**
   * 获取所有列表
   */
  findAll(): Observable<any> {
    const httpParams = new HttpParams().set('table', GlobalConstants.getInstance().RENT_ITEM)
      .set('criterias', JSON.stringify([{'field': 'account'}]))
      .set('rule', JSON.stringify({currentAccount: ['account']}));
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/findAll',
      {params: httpParams});
  }

  /**
   * 获取所有列表并将关联数据查出
   */
  findAllCascade(): Observable<any> {
    const httpParams = new HttpParams().set('table', GlobalConstants.getInstance().RENT_ITEM)
      .set('criterias', JSON.stringify([{'field': 'account'}]))
      .set('rule', JSON.stringify({currentAccount: ['account']}));
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/findAll',
      {params: httpParams});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    const params = {
      'table': GlobalConstants.getInstance().RENT_ITEM,
      'criterias': [
        {'field': 'code', 'value': code},
        {'field': 'account'}
      ],
      'rule': {
        currentAccount: ['account']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/isExist', params);
  }

  /**
   * 由ID删除信息
   *
   * @param id ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().RENT_ITEM,
      id: id
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }
}
