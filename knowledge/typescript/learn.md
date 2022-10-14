# typescript
## 基础类型
  “: type” 来表示类型

    //布尔
    let isDone: boolean = false;
    //数字
    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;
    //字符串
    let name: string = "bob";
    name = "smith";
    //数组
    let list: number[] = [1, 2, 3];
    //数组泛型
    let list: Array<number> = [1, 2, 3];
## 模版字符串
    定义时，字符串是被反引号包围（ `）
    使用时，${ expr }
    let name: string = `Gene`;
    let sentence: string = `Hello, my name is ${ name }.
## 元组
    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ['hello', 10]; // OK
    // Initialize it incorrectly
    x = [10, 'hello']; // Error

## 学习地址
  [https://www.tslang.cn/docs/handbook/basic-types.html](https://www.tslang.cn/docs/handbook/basic-types.html)

## end