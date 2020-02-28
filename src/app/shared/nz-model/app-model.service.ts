import { Injectable } from '@angular/core';
import { ConfirmType, ModalOptionsForService, NzModalRef, NzModalService } from 'ng-zorro-antd';
/**
 * 重写ng-zorro modal组件的service方法
 * 注：打包后无效，原因未找到
 */
@Injectable({
  providedIn: 'root'
})
export class AppModalService extends NzModalService {

  /**
   * 重写确认框模式，使之可以点击蒙层隐藏确认框
   *
   * 官方回答如下：
   * 并不是无效, 设计就是这样, 你在用 confirm 的时候 closable 是不能配置的, 你可以看 Ant Design 的设计: https://codepen.io/wendzhue/pen/wEdxRq?&editors=001
   * 用 confirm, 就应该让用户明确的返回一个结果. 浏览器自带的 confirm() 也是不能通过点击外部关闭的.
   *
   * @param options
   * @param confirmType
   */
  confirm<T>(options?: ModalOptionsForService<T>, confirmType?: ConfirmType): NzModalRef<T> {
    if ('nzFooter' in options) {
      // this.log.warn(`The Confirm-Modal doesn't support "nzFooter", this property will be ignored.`);
    }
    if (!('nzWidth' in options)) {
      options.nzWidth = 416;
    }
    if (typeof options.nzOnOk !== 'function') { // NOTE: only support function currently by calling confirm()
      options.nzOnOk = () => {
      }; // Leave a empty function to close this modal by default
    }

    options.nzModalType = 'confirm';
    options.nzClassName = `ant-modal-confirm ant-modal-confirm-${confirmType} ${options.nzClassName || ''}`;
    // options.nzMaskClosable = false;
    return this.create(options);
  }
}
