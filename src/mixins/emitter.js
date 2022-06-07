/**
 * [broadcast 上下传递]
 * @param  {[type]} componentName [组件别名]
 * @param  {[type]} eventName     [事件别名]
 * @param  {[type]} params        [事件回调参数]
 */
function broadcast(componentName, eventName, params) {
  // 遍历当前实例的children节点
  this.$children.forEach(child => {
    var name = child.$options.componentName;
    // 如果子节点名称和组件别名相同，则当前子节点为目标节点
    if (name === componentName) {
      // 找到目标节点后，触发事件别名对应的回调，并将参数传入
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // 如果子节点名称和组件别名不相同，继续遍历子节点的子节点，以此类推，直到找到目标节点
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    /**
    * [dispatch 向上传递]
    * @param  {[type]} componentName [组件别名]
    * @param  {[type]} eventName     [事件别名]
    * @param  {[type]} params        [事件回调参数]
    */
    // dispatch 的作用是向祖先组件传值，它会一直寻找父组件，直到找到组件名和当前传入的组件名一致的祖先组件，就会触发其身上的 $emit 事件，将数据传给它
    // dispatch方法实现了向最近的特定父级组件发送事件的逻辑
    // 参数（父级组件名称，事件名称，事件参数）
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      // 向上找目标父节点，如果上一级父节点不符合，则继续往上查询
      // 不断地取到自己的父组件，判断是否是目标组件，
      // 如果不是继续去其父组件判断，如果是则在父组件上调用$emit触发事件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }

      // 找到目标父节点后，触发事件别名对应的回调，并将参数传入
      if (parent) {
        // 不能写成parent.$emit(eventName,...params)
        // 必须用apply定$emit的调用目标对象，因为是在父组件上触发该事件而不是在dispatch里，
        // 这里你可能会说parent.$emit不就是在父组件上调用么？其实不是，parent.$emit仅仅是拿到了emit这个方法而已，并没有说明在哪里调用
        // console.log('parent---',parent)
        // console.log('eventName---',eventName)
        // console.log('params---',params)
        // console.log('[eventName].concat(params)---',[eventName].concat(params)) // ['handleChange', 3] 格式
        parent.$emit.apply(parent, [eventName].concat(params)); // 在parent上调用parent.$emit方法，参数是[eventName].concat(params)
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
