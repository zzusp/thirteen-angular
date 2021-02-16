import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalConstants} from '../../@core/constant/GlobalConstants';

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
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuthUser/insert', params);
  }

  /**
   * 修改用户
   *
   * @param params
   */
  update(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/update', params);
  }

  /**
   * 由ID获取用户信息
   *
   * @param id 用户ID
   */
  findById(id: string): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/findById',
      {params: {'id': id, 'table': 'auth_user'}});
  }

  /**
   * 获取用户列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = 'auth_user';
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/findAllByParam', params);
  }

  /**
   * 判断账号是否存在
   *
   * @param account 账号
   */
  checkAccount(account: string): Observable<any> {
    const params = {
      'table': 'auth_user',
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
    return this.http.delete(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', {params: {'id': id}});
  }

}
