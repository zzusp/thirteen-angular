import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '../profile.service';
import { ResponseResultModel } from '../../../@core/net/response-result.model';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent implements OnInit {

  /** 编辑表单 */
  editForm: FormGroup;

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    // 表单验证
    this.editForm = this.fb.group({
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      passwordConfirmation: [null,
        {updateOn: 'blur'},
        [Validators.required]
      ]
    });
    this.editForm.get('passwordConfirmation').setValidators(this.validateConfirm('confirm'));
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
      this.profileService.passwordEdit(this.editForm.value).subscribe((res: ResponseResultModel) => {
        if (res.status === 200) {
          // 清空表单
          this.editForm.reset();
          // 返回上一页
          this.router.navigate(['/pages/login']);
        }
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
   * 确认验证
   *
   * @param {string} name 名称（验证失败时返回对象的key）
   * @returns {ValidatorFn}
   */
  validateConfirm(name: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      // 获取当前控件的内容
      const str = control.value;
      // 如果验证通过则返回 null 否则返回一个对象（包含我们自定义的属性）
      return str === this.editForm.value['newPassword'] ? null : {[name]: str};
    };
  }
}
