import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class RentContractService {

  constructor(private http: HttpClient) {
  }

  /**
   * 新增
   *
   * @param params
   */
  insert(params: any): Observable<any> {
    const insert = {
      table: GlobalConstants.getInstance().RENT_CONTRACT,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().RENT_CONTRACT_CATEGORY,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentContractCategories',
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
      table: GlobalConstants.getInstance().RENT_CONTRACT,
      model: params,
      lookups: [{
        from: GlobalConstants.getInstance().RENT_CONTRACT_CATEGORY,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentContractCategories',
        unwind: false
      }],
      rule: {
        currentAccount: ['updateBy'], currentDateTime: ['updateTime']
      }
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/update', update);
  }

  /**
   * 由ID获取信息级联查询类别品名
   *
   * @param id ID
   */
  findWithCategoryById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().RENT_CONTRACT,
      criterias: [
        {field: 'id', value: id}
      ],
      lookups: [{
        from: GlobalConstants.getInstance().RENT_CONTRACT_CATEGORY,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentContractCategories',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/findOneByParam', param);
  }


  /**
   * 由ID获取信息级联查询所有关联信息
   *
   * @param id ID
   */
  findCascadeById(id: string): Observable<any> {
    const param = {
      table: GlobalConstants.getInstance().RENT_CONTRACT,
      criterias: [
        {field: 'id', value: id}
      ],
      lookups: [{
        from: GlobalConstants.getInstance().RENT_RENTER,
        localField: 'renterId',
        foreignField: 'id',
        as: 'rentRenter',
        unwind: true
      }, {
        from: GlobalConstants.getInstance().RENT_CONTRACT_CATEGORY,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentContractCategories',
        unwind: false
      }, {
        from: GlobalConstants.getInstance().RENT_TRANSPORT,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentTransports',
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
    params['table'] = GlobalConstants.getInstance().RENT_CONTRACT;
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/rent/findAllByParam', params);
  }

  /**
   * 获取所有列表
   */
  findAll(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/rent/findAll',
      {params: {'table': GlobalConstants.getInstance().RENT_CONTRACT}});
  }

  /**
   * 获取所有列表并将关联数据查出
   */
  findAllCascade(): Observable<any> {
    return this.http.get(GlobalConstants.getInstance().DM_SERVER + '/rent/findAll',
      {params: {'table': GlobalConstants.getInstance().RENT_CONTRACT}});
  }

  /**
   * 由ID删除信息
   *
   * @param id ID
   */
  deleteById(id: string): Observable<any> {
    const del = {
      table: GlobalConstants.getInstance().RENT_CONTRACT,
      id: id,
      lookups: [{
        from: GlobalConstants.getInstance().RENT_CONTRACT_CATEGORY,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentContractCategories',
        unwind: false
      }, {
        from: GlobalConstants.getInstance().RENT_TRANSPORT,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentTransports',
        unwind: false
      }, {
        from: GlobalConstants.getInstance().RENT_TRANSPORT_SPEC,
        localField: 'id',
        foreignField: 'contractId',
        as: 'rentTransportSpecs',
        unwind: false
      }]
    };
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dm/deleteById', del);
  }
}
