export default function(target) {
  console.log('arguments--',arguments)
  // arguments是函数中一个默认的伪数组对象
  // arguments接收用户传递的实参信息
  // 没有接触arguments之前,通过形参接收实参信息的
  // 在函数中接收实参信息除了形参之外,还可以通过arguments来接收
  // 参数通过arguments接收后以伪数组对象的形式存在
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      // if (source.hasOwnProperty(prop)) { // 有副作用
      if (Object.hasOwnProperty.call(source, prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}
