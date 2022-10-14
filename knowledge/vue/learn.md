# vue
## 架构
    事件：methods:{  };   
    过滤器：filters:{  };
    计算：conputed：{  }；
    观察者：watch:{  };
## 钩子函数
    created:function(){
    //创建  
    },
    mounted:function(){
    //挂载
    },
    updated:function(){
    //更新  
    },
    destoryed:function(){
    // 销毁 
    }
## 当前组件样式
    <style scoped></style>

## v-if 和 v-show
  一个不渲染节点，一个渲染节点但是display:none
## img 赋值
    正确(v-bind:src缩写:src),不能再用{{}}给v-bind:赋值
    <img src="{{item.img}}">
    <img :src="item.img">

## 操作dom
  注意$refs不是$ref
    <h2 ref='foo'>我是ref的值</h2>
    console.log(this.$refs.foo.innerHTML')

## 组件
