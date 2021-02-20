import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { GlobalConstants } from '../../@core/constant/GlobalConstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  /**
   * 上传用户头像
   *
   * @param params
   */
  uploadAvatar(params: any): Observable<HttpEvent<any>> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuthUser/uploadAvatar', params,
      {observe: 'events', reportProgress: true});
  }

  /**
   * 个人信息修改
   *
   * @param params
   */
  profileSetting(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuthUser/profileSetting', params);
  }

  /**
   * 密码修改
   *
   * @param params
   */
  passwordEdit(params: any): Observable<any> {
    return this.http.post(GlobalConstants.getInstance().DM_SERVER + '/dmAuthUser/passwordEdit', {}, {params: params});
  }
}
