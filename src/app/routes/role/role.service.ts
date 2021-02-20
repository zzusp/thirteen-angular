import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增角色
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().AUTH_ROLE,
      model: params,
      rule: {
        currentAccount: ['createBy'], currentDateTime: ['createTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/insert', insert);
  }

  /**
   * 修改角色
   *
   * @param params
   */
  update(params: any): Observable<any> {
    const update = {
      table: GlobalConstants.getInstance().AUTH_ROLE,
      model: params,
      rule: {
        currentAccount: ['updateBy'], currentDateTime: ['updateTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/update', update);
  }

  /**
   * 由ID获取角色信息
   *
   * @param id 角色ID
   */
  findById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().AUTH_ROLE,
      criterias: [
        {field: 'id', value: id}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/findOneByParam', param);
  }

  /**
   * 由ID获取角色详细信息
   *
   * @param id 角色ID
   */
  findDetailById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().AUTH_ROLE,
      criterias: [
        {field: 'id', value: id}
      ],
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_ROLE_APP,
        localField: 'code',
        foreignField: 'roleCode',
        as: 'apps',
        unwind: false
      }, {
        from: GlobalConstants.getInstance().AUTH_ROLE_PERMISSION,
        localField: 'code',
        foreignField: 'roleCode',
        as: 'permissions',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/findOneByParam', param);
  }

  /**
   * 角色授权
   *
   * @param params
   */
  authorize(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuthRole/authorize', params);
  }

  /**
   * 获取角色列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = GlobalConstants.getInstance().AUTH_ROLE;
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/findAllByParam', params);
  }

  /**
   * 获取所有角色列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/findAll',
      {params: {'table': GlobalConstants.getInstance().AUTH_ROLE}});
  }

  /**
   * 由组织编码获取所有角色列表
   */
  findAllByGroupCode(groupCode: any): Observable<any> {
    const param = {
      'criterias': [
        {'field': 'groupCode', 'value': groupCode, 'require': true}
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
      'table': GlobalConstants.getInstance().AUTH_ROLE,
      'criterias': [
        {'field': 'code', 'value': code}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/isExist', params);
  }

  /**
   * 由ID删除角色信息
   *
   * @param id 角色ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().AUTH_ROLE,
      id: id
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }

}
