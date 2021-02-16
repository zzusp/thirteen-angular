import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class DeptService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增部门
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().AUTH_DEPT,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_DEPT_ROLE,
        localField: 'code',
        foreignField: 'deptCode',
        as: 'deptRoles',
        unwind: false
      }],
      rule: {
        currentAccount: ['createBy'], currentDateTime: ['createTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/insert', insert);
  }

  /**
   * 修改部门
   *
   * @param params
   */
  update(params: any): Observable<any> {
    const update = {
      table: GlobalConstants.getInstance().AUTH_DEPT,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_DEPT_ROLE,
        localField: 'code',
        foreignField: 'deptCode',
        as: 'deptRoles',
        unwind: false
      }],
      rule: {
        currentAccount: ['updateBy'], currentDateTime: ['updateTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/update', update);
  }

  /**
   * 由ID获取部门信息
   *
   * @param id 部门ID
   */
  findById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().AUTH_DEPT,
      criterias: [
        {field: 'id', value: id}
      ],
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_DEPT_ROLE,
        localField: 'code',
        foreignField: 'deptCode',
        as: 'deptRoles',
        unwind: false
      }],
      sorts: [{field: 'orderNum', orderBy: 'ase'}]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/findOneByParam', param);
  }

  /**
   * 获取部门列表
   *
   * @param params
   */
  findAllByParam(params: any): Observable<any> {
    params['table'] = GlobalConstants.getInstance().AUTH_DEPT;
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/findAllByParam', {params});
  }

  /**
   * 获取所有部门列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/dm/findAll',
      {params: {'table': GlobalConstants.getInstance().AUTH_DEPT}});
  }

  /**
   * 判断编码是否存在
   *
   * @param code 编码
   */
  checkCode(code: string): Observable<any> {
    const params = {
      'table': GlobalConstants.getInstance().AUTH_DEPT,
      'criterias': [
        {'field': 'code', 'value': code}
      ]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuth/isExist', params);
  }

  /**
   * 由ID删除部门信息
   *
   * @param id 部门ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().AUTH_DEPT,
      id: id,
      lookups: [{
        from: GlobalConstants.getInstance().AUTH_DEPT_ROLE,
        localField: 'code',
        foreignField: 'deptCode',
        as: 'deptRoles',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }
}
