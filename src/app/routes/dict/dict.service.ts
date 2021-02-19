import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class DictService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增数据字典
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().AUTH_DICT,
      model: params,
      rule: {
        currentAccount: ['createBy'], currentDateTime: ['createTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/insert', insert);
  }

  /**
   * 修改数据字典
   *
   * @param params
   */
  update(params: any): Observable<any> {
    const update = {
      table: GlobalConstants.getInstance().AUTH_DICT,
      model: params,
      rule: {
        currentAccount: ['updateBy'], currentDateTime: ['updateTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/update', update);
  }

  /**
   * 由ID获取数据字典信息
   *
   * @param id 数据字典ID
   */
  findById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().AUTH_DICT,
      criterias: [
        {field: 'id', value: id}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/findOneByParam', param);
  }

  /**
   * 获取数据字典列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = GlobalConstants.getInstance().AUTH_DICT;
    params['lookups'] = [{
      from: GlobalConstants.getInstance().AUTH_BIZ_TYPE,
      localField: 'bizTypeCode',
      foreignField: 'code',
      as: 'bizType',
      unwind: true
    }];
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/findAllByParam', params);
  }

  /**
   * 获取所有数据字典列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/findAll',
      {params: {'table': GlobalConstants.getInstance().AUTH_DICT}});
  }

  /**
   * 由业务类型编码获取所有角色列表
   */
  findAllByBizTypeCode(bizTypeCode: any): Observable<any> {
    const param = {
      'criterias': [
        {'field': 'bizTypeCode', 'value': bizTypeCode, 'require': true}
      ]
    };
    return this.findAllByParam(param);
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    const params = {
      'table': GlobalConstants.getInstance().AUTH_DICT,
      'criterias': [
        {'field': 'code', 'value': code}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/isExist', params);
  }

  /**
   * 由ID删除数据字典信息
   *
   * @param id 数据字典ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().AUTH_DICT,
      id: id
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }
}
