import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ResponseResultModel } from '../../../@core/net/response-result.model';
import { removeToken, removeUserInfo, setToken } from '../../../@core/util/user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  /** 提交表单 */
  validateForm: FormGroup;
  /** 加载动画，默认关闭 */
  loading = false;

  constructor(private fb: FormBuilder,
              private login: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    // 表单验证
    this.validateForm = this.fb.group({
      account: ['test', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      password: ['1234', Validators.required],
      rememberMe: [false]
    });
  }

  /**
   * 监听回车事件
   */
  @HostListener('window:keyup.enter') onkeyupEnter() {
    this.submitForm();
  }

  /**
   * 表单提交（登陆）
   */
  submitForm() {
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      // 发送登录请求前删除原token和原用户信息
      removeToken();
      removeUserInfo();
      this.loading = true;
      this.login.login(this.validateForm.value).subscribe((res: ResponseResultModel) => {
        this.loading = false;
        if (res.status === 200) {
          // 存储token
          setToken(res.result);
          this.router.navigate(['/']);
        }
      });
    }
  }

  /**
   * 键盘事件中断，不做处理
   * 因已添加全局回车事件监听，该方法用于取消光标在输入框时，回车事件被触发两次
   */
  onkeyupBreak() {
  }

}
