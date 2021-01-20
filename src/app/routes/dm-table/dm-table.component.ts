import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { GlobalConstants } from "../../@core/constant/GlobalConstants";
import { DmTableModel } from "./dm-table.model";

@Component({
  selector: 'app-dm-table',
  templateUrl: './dm-table.component.html',
  styleUrls: ['./dm-table.component.scss']
})
export class DmTableComponent implements OnInit {

  /** 全局常量  */
  global: GlobalConstants = GlobalConstants.getInstance();
  /** 查询参数  */
  params: any = {
    code: '',
    name: '',
    active: ''
  };
  /** 是否启用  */
  activeArr: any[] = [];
  /** 当前页码  */
  pageNum: number = 1;
  /** 每页显示记录数  */
  pageSize: number = 10;
  /** 总记录数  */
  total: number = 0;
  /** 表格数据  */
  tableData: DmTableModel[] = [];
  /** 加载动画，默认关闭  */
  loading = false;
  /** 排序  */
  sortMap = {
    code: null,
    name: null,
    status: null,
    createTime: 'desc',
    updateTime: null
  };

  constructor(private dragulaService: DragulaService) {
    // use these if you want

    this.dragulaService.createGroup("VAMPIRES", {
      // ...
    });

    this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
      console.log(args);
    });
  }

  ngOnInit(): void {
  }

  /**
   * 获取列表信息
   */
  findAllByParam(): void {
    // // 加载动画开启
    // this.loading = true;
    // const param = {
    //   'criterias': [
    //     {'feild': 'code', 'operator': 'like', 'value': this.params.code ? '%' + this.params.code + '%' : null},
    //     {'feild': 'name', 'operator': 'like', 'value': this.params.name ? '%' + this.params.name + '%' : null},
    //     {'feild': 'active', 'value': this.params.active}
    //   ],
    //   'page': {
    //     'pageSize': this.pageSize,
    //     'pageNum': this.pageNum - 1
    //   },
    //   'sorts': this.getSorts()
    // };
    // this.bizTypeService.findAllByParam(new HttpParams().set('param', JSON.stringify(param))).subscribe((res: ResponseResultModel) => {
    //   // 判断返回结果是否为空或null
    //   if (res && res.result) {
    //     const result: PagerResultModel = res.result;
    //     this.tableData = result.list;
    //     this.total = result.total;
    //   }
    //   // 加载动画关闭
    //   this.loading = false;
    // });
  }

  /**
   * 过滤方法
   *
   * @param active
   */
  filter(active: string): void {
    this.params.active = !!active ? active : '';
    this.findAllByParam();
  }

  /**
   * 排序监听
   *
   * @param name
   * @param value
   */
  sort(name: string, value: string): void {
    for (const key of Object.keys(this.sortMap)) {
      if (key === name) {
        this.sortMap[key] = value;
      }
    }
    this.findAllByParam();
  }

  /**
   * 获取排序参数
   */
  getSorts(): any[] {
    const arr = [];
    for (const key of Object.keys(this.sortMap)) {
      if (this.sortMap[key] != null) {
        arr.push({field: key, orderBy: this.sortMap[key].replace('end', '')});
      }
    }
    return arr;
  }

  /**
   * 获取排序参数
   */
  getOrderBy(): string {
    const arr = [];
    for (const key of Object.keys(this.sortMap)) {
      if (this.sortMap[key] != null) {
        arr.push(key + ' ' + this.sortMap[key].replace('end', ''));
      }
    }
    return arr.toString();
  }

}
