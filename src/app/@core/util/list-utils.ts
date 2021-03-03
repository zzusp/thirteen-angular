/**
 * list分组
 *
 * @param list list数据
 * @param key 根据list中的该key获取数据，该数据作为结果json的key
 */
export function listGroupBy(list: any[], key: string) {
  const map: any = {};
  list.forEach(v => {
    if (!map[v[key]]) {
      map[v[key]] = [];
    }
    map[v[key]].push(v);
  });
  return map;
}

/**
 * list转json
 *
 * @param list list数据
 * @param key 根据list中的该key获取数据，该数据作为结果json的key
 */
export function listToJson(list: any[], key: string) {
  const map: any = {};
  list.forEach(v => {
    map[v[key]] = v;
  });
  return map;
}
