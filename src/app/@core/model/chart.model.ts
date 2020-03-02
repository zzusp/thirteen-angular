/**
 * 通用图表返回结果
 */
import { SeriesModel } from './series.model';

export class ChartModel {

  /** 图表名称 */
  name: string;
  /** X轴数据 */
  axisx: string[];
  /** 核心数据集合 */
  series: SeriesModel[];

}
