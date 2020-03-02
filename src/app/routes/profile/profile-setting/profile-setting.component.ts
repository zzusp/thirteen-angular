import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../../../@core/constant/GlobalConstants';
import { forkJoin, Observable, Observer } from 'rxjs';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { DictModel } from '../../dict/dict.model';
import { Location } from '@angular/common';
import { UserModel } from '../../user/user.model';
import { setUserInfo } from '../../../@core/util/user-info';
import { Router } from '@angular/router';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { LoginService } from '../../pages/login/login.service';
import { applicationToSidebar, LayoutData } from '../../../@layout/interface/layout-data';
import { LayoutService } from '../../../@layout/@layout.service';
import { validatePerms } from '../../../@core/util/perms-validators';
import { DictService } from '../../dict/dict.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 编辑表单 */
  editForm: FormGroup;
  /** 性别下拉框数据 */
  genders: DictModel[];
  /**
   * 用户头像路径
   */
  photo: string;
  /** 页面权限校验  */
  perms = {
    uploadAvatar: false,
    profileSetting: false
  };
  /**
   * 自定义上传方法
   */
  uploadAvatar: any = (item: UploadXHRArgs) => {
  };
  /**
   * 上传前操作，如校验
   */
  beforeUpload: any = (file: File) => {
  };

  constructor(private dictService: DictService,
              private profileService: ProfileService,
              private loginService: LoginService,
              private layoutService: LayoutService,
              private fb: FormBuilder,
              private router: Router,
              private location: Location,
              private messageService: NzMessageService) {
  }

  ngOnInit() {
    this.perms = {
      uploadAvatar: validatePerms(['profile:uploadAvatar']),
      profileSetting: validatePerms(['profile:profileSetting'])
    };
    const dicteReq = this.dictService.findAllByBizTypeCode(this.global.BIZ_TYPE_GENDER);
    // 发出请求
    forkJoin([dicteReq])
      .subscribe((results: ResponseResultModel[]) => {
        const dictRes = results[0];
        this.genders = dictRes.result.list;
      });
    // 表单验证
    this.editForm = this.fb.group({
      id: [null],
      code: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      account: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      name: [null, Validators.required],
      gender: [null, Validators.required],
      mobile: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      remark: [null, Validators.maxLength(250)]
    });
    this.editForm.get('code').disable();
    this.editForm.get('account').disable();
    this.initInfo();
    this.initUpload();
  }

  /**
   * 初始化上传请求
   */
  initUpload() {
    // 初始化上传请求
    this.uploadAvatar = (item: UploadXHRArgs) => {
      // 构建一个 FormData 对象，用于存储文件或其他参数
      const formData = new FormData();
      // tslint:disable-next-line:no-any
      formData.append('avatar', item.file as any);
      // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
      return this.profileService.uploadAvatar(formData).subscribe(
        (event: HttpEvent<{}>) => {
          // 判断是否在上传
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total > 0) {
              // （由已上传大小/总大小）*100计算上传的百分比
              (event as any).percent = (event.loaded / event.total) * 100;
            }
            // 处理上传进度条，必须指定 `percent` 属性来表示进度
            item.onProgress(event, item.file);
          } else if (event instanceof HttpResponse) {
            // 处理成功
            item.onSuccess(event.body, item.file, event);
            this.messageService.success('用户头像更新成功');
            this.initInfo();
          }
        },
        err => {
          // 处理失败
          item.onError(err, item.file);
        }
      );
    };
    this.beforeUpload = (file: File) => {
      return new Observable((observer: Observer<boolean>) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.messageService.error('只支持JPG/PNG文件!');
          observer.complete();
          return;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.messageService.error('图片大小需小于2MB!');
          observer.complete();
          return;
        }
        // check height
        this.checkImageDimension(file).then(dimensionRes => {
          // if (!dimensionRes) {
          //   this.messageService.error('Image only 300x300 above');
          //   observer.complete();
          //   return;
          // }
          // observer.next(isJPG && isLt2M && dimensionRes);
          observer.next(isJPG && isLt2M);
          observer.complete();
        });
      });
    };
  }

  /**
   * 初始化信息
   */
  initInfo() {
    // 从服务器段获取到当前用户信息，更新布局数据
    this.loginService.getCurrentUser()
      .subscribe((res: ResponseResultModel) => {
        if (res.result) {
          const result: UserModel = res.result;
          // 表单重置
          this.editForm.reset({
            id: result.id,
            code: result.code,
            account: result.account,
            name: result.name,
            gender: result.gender,
            mobile: result.mobile,
            email: result.email,
            remark: result.remark
          });
          // 设置头像路径
          this.photo = result.photo;
          // 更新布局数据
          const layoutData: LayoutData = {
            userBlock: {
              name: result.name,
              photo: result.photo,
              role: result.roles.map((role) => {
                return role.name;
              }).join('，')
            },
            sidebarMenu: applicationToSidebar(result.applications, this.global.AUTHORIZATION_SERVER_CODE)
          };
          this.layoutService.setLayoutData(layoutData);
          // 更新localStorage中的用户信息
          setUserInfo(result);
        }
      });
  }

  /**
   * 表单提交
   */
  submitForm() {
    for (const key of Object.keys(this.editForm.controls)) {
      this.editForm.controls[key].markAsDirty();
      this.editForm.controls[key].updateValueAndValidity({onlySelf: true});
    }
    if (this.editForm.valid) {
      this.profileService.profileSetting(this.editForm.value).subscribe((res: ResponseResultModel) => {
        // 清空表单
        this.editForm.reset();
        // 刷新表单
        this.initInfo();
      });
    }
  }

  /**
   * 返回上一页
   */
  goBack() {
    this.location.back();
  }

  /**
   * 校验图片大小
   *
   * @param file
   */
  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      // create image
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src);
        resolve(width === height && width >= 300);
      };
    });
  }
}
