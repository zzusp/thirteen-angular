import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增用户
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().AUTH_USER,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_USER_ROLE,
        localField: 'account',
        foreignField: 'account',
        as: 'userRoles',
        unwind: false
      }],
      rule: {
        currentAccount: ['createBy'], currentDateTime: ['createTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuthUser/insert', insert);
  }

  /**
   * 修改用户
   *
   * @param params
   */
  update(params: any): Observable<any> {
    const update = {
      table: GlobalConstants.getInstance().AUTH_USER,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_USER_ROLE,
        localField: 'account',
        foreignField: 'account',
        as: 'userRoles',
        unwind: false
      }],
      rule: {
        currentAccount: ['updateBy'], currentDateTime: ['updateTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/update', update);
  }

  /**
   * 由ID获取用户信息
   *
   * @param id 用户ID
   */
  findById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().AUTH_USER,
      criterias: [
        {field: 'id', value: id}
      ],
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_USER_ROLE,
        localField: 'account',
        foreignField: 'account',
        as: 'userRoles',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/findOneByParam', param);
  }

  /**
   * 获取用户列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = GlobalConstants.getInstance().AUTH_USER;
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/findAllByParam', params);
  }

  /**
   * 判断账号是否存在
   *
   * @param account 账号
   */
  checkAccount(account: string): Observable<any> {
    const params = {
      'table': GlobalConstants.getInstance().AUTH_USER,
      'criterias': [
        {'field': 'account', 'value': account}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/isExist', params);
  }

  /**
   * 由ID删除用户信息
   *
   * @param id 用户ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().AUTH_USER,
      id: id,
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_USER_ROLE,
        localField: 'account',
        foreignField: 'account',
        as: 'userRoles',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }

}
