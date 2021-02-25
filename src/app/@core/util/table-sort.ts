/**
 * 获取排序参数
 */
export function getSorts(sortMap: any): any[] {
  const arr = [];
  for (const key of Object.keys(sortMap)) {
    if (sortMap[key] != null) {
      arr.push({field: key, orderBy: sortMap[key].replace('end', '')});
    }
  }
  return arr;
}
