//在Vue.use(router)会执行install时保存Vue构造函数引用，以便需要的时候使用
let Vue;

//3.创建Router实例对象 绑定响应式变量，并监听hashchange事件
function MiniVueRouter(options) {
  //绑定路由表到Router实例上
  this.$options = options;

  // //绑定一个响应式数据current
  Vue.util.defineReactive(
    this,
    "current",
    window.location.hash.slice(1) || "/"
  );
  // // 监控hashchange事件,一旦发生更新就去更新响应式数据
  window.addEventListener("hashchange", () => {
    //#abc =>abc
    this.current = window.location.hash.slice(1);
  });
}

//2.Vue.use注册插件会执行install方法
/**
 * Vue.use的时候会执行对应插件的install静态方法，相当于做一起初始化的前置操作:1.将router实例挂载到每个vue组件上,通过this.$router访问 2.组件两个必须的路由全局组件)
 * @param _Vue Vue构造函数会在执行install的时候传入
 * @returns {VNode}
 */
MiniVueRouter.install = function (_Vue) {
  Vue = _Vue;
  // 混入：Vue.mixin({beforeCreate(){}})使得在vue组件创建之前就可以增强，使得每个组件实例身上都挂载了一个$router对象
  Vue.mixin({
    beforeCreate() {
      // 这里的this是组件实例
      // 如果当前this是根组件，它选项中必有一个router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 注册全局组件: router-link、
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // <router-link to="/about">xxx</router-link>
      // <a href="#/about">xxx</a>
      // return <a href={"#" + this.to}>{this.$slots.default}</a>
      return h("a", {attrs: {href: "#" + this.to}}, this.$slots.default);
    },
  });

  // 注册全局组件: router-view
  Vue.component("router-view", {
    //render函数会在初始化的时候执行一次
    // 当路由hash改变之后，我们注册到mini-vue-router实例的响应式数据被修改，会触发render重新执行，因为我们render函数使用了current这个响应式数据
    render(h) {
      let component = null;
      //在路由表中查找对应hash路径的route对象
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current//4.这一步是关键所在，使用了current这个响应式的数据，使得路由改变，router-view重新渲染（这个响应式的数据其实挂载到谁的身上都可以，这里是挂载到了router实例上）
      );
      //如果在路由表找到了对应的组件，则更新
      if (route) {
        component = route.component;
      }
      //h函数可以直接传递一个组件模版进行渲染
      return h(component);
    },
  });
};
export default MiniVueRouter;
