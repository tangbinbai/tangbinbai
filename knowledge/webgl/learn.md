# webgl
## 置顶

[debug,glsl-unit](https://www.youtube.com/watch?v=7sad-UGSOXE)
[综合好例](https://www.youtube.com/watch?v=s6t0mJsgUKw)
[阅读](https://github.com/ajweeks/RaymarchingWorkshop)


## 交互式计算机图形学
    光栅（像素阵列）
    帧缓存（图像的分辨率）
    深度（像素的比特数，默认3位8bit RGB）传统cpu用正数255，现在的用0.0-1.0的浮点数
  
## 新建webgl
    /**
     * initwebgl 初始化webgl
     * @param canvas 对象
     * @param VSHADER_SOURCE 顶点着色器代码
     * @param FSHADER_SOURCE 顶点着色器代码
     */
    
    function initwebgl(canvas,VSHADER_SOURCE, FSHADER_SOURCE){
      //webgl object
      var gl; 
      //定宽高（适配retina）
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      //获取gl
      gl = canvas.getContext('webgl');
      //定视图区
      gl.viewport(0, 0, canvas.width, canvas.height);
      //定色彩模型
      gl.clearColor(23 / 255, 48 / 250, 41 / 255, 1.0);
      //清理画布
      gl.clear(gl.COLOR_BUFFER_BIT);
      var vertexShader = createShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
      // var vertexShaderDebug = gl.getExtension('WEBGL_debug_shaders').getTranslatedShaderSource(vertexShader);
      var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
      // var fragmentShaderDebug = gl.getExtension('WEBGL_debug_shaders').getTranslatedShaderSource(fragmentShader);
      //创建一个程序
      gl.program = createProgram(gl, vertexShader, fragmentShader);
      gl.useProgram(gl.program);
      gl.vertexShader = vertexShader;
      gl.fragmentShader = fragmentShader;
      return gl;
    }
## 新建着色器
    /**
     * Create 着色器对象
     * @param gl webgl
     * @param 不同类型着色器对象
     * @param 着色器源程序（字符串）
     */
    function createShader(gl, type, source) {
      //创建着色器
      var shader = gl.createShader(type);
      //给着色器添加着色代码
      gl.shaderSource(shader, source);
      //编译着色器
      gl.compileShader(shader);
      //检查着色器的编译状态
      //gl.getShaderParameter(shader,gl.COMPILE_STATUS)
      return shader;
    }
## 创建一个程序，基于着色器
    /**
     * 创建webgl使用的程序对象
     * @param vshader 顶点着色器
     * @param fshader 片源着色器
     */
    function createProgram(gl, vshader, fshader) {
      //创建顶点着色器和片元着色器;
      //创建程序对象，程序对象涵盖了着色器，可以和着色器进行数据交互
      var program = gl.createProgram();
      //为程序对象分配顶点着色器和片元着色器
      gl.attachShader(program, vshader);
      gl.attachShader(program, fshader);
      //连接着色器
      gl.linkProgram(program);
      // 检查连接结果
      var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log('程序连接失败: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(vshader);
        gl.deleteShader(fshader);
        return null;
      }
      return program;
    }

## 纹理映射
  纹理映射，就是将一张图片映射到一个几何图形的表面上去。   
  被映射的图片叫做纹理图片或“纹理”
  纹理其实就是一个颜色集合，为栅格后的每个“片元”涂上合适和颜色    
  组成纹理图像的像素我们称之为“纹素”   
  步骤：

    1.准备好纹理图像
    2.为几何图形配置纹理映射的方式
    3.对纹理进行一些配置后在webgl中使用
    4.片元着色器中将相应的纹素在纹理中取出来，并将纹素的颜色赋值给片元

  纹理坐标
  用来确定纹理图像哪个部分使用在几何图形上。   
  纹理坐标是一套新的坐标系统   
  坐标规范：

    1.使用st坐标系统（区分xy坐标系统，其他系统可能使用uv坐标系统，意思是一样。）
    2.左下角是0.0,0.0 ；右上角是1.0,1.0；即原点在左下角

  纹理单元texture unit

    1.管理纹理图像
    2.实现同时使用多个纹理
    3.webgl不能直接操作纹理图像,必须使用纹理单元/
  uniform sampler2D u_Sampler;  

    sampler2D 2D的采样器，用在片元着色器中;其他还有立方体采样器,samplerCube

  texture2D(sampler2D sampler,vec2 coord) 

    内置函数

  createTexture();
  
    //通过gl创建一个纹理对象
    var texture=gl.createTexture()  

    //纹理默认y反转了，修正一下。
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 

    //激活纹理单元0。 0纹理单元，0纹理单元
    gl.activeTexture(gl.TEXTURE0) 
    
    //绑定纹理对象，和绑定缓冲区对象很像。
    //2d纹理绑定给类型TEXTURE_2D，立方体纹理绑定给TEXTURE_CUBE_MAP
    gl.bindTexture(gl.TEXTURE_2D, texture); 
    
    //配置纹理的一些映射参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    
    //配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0 ,gl.RGB,gl.UNSIGNED_BYTE,IMAGE)

    //将0号纹理给着色器
    gl.uniform1i(u_Sampler, 0)

  gl.texParameterf(GLenum target, GLenum pname, GLfloat param);//映射参数

    gl.texParameterf(GLenum target, GLenum pname, GLfloat param);
    target:
      gl.TEXTURE_2D
      gl.TEXTURE_CUBE_MAP
    pname:
      gl.TEXTURE_MAG_FILTER 放大纹理
      gl.TEXTURE_MIN_FILTER 缩小纹理
      gl.TEXTURE_WRAP_S 水平填充
      gl.TEXTURE_WRAP_T 垂直填充
    pname:对应上面的默认值，还存在其他值。
      //指颜色获取的方式，毕竟片元和纹理不会与纹理图片像素一一对应，
      //需要计算出一个合理的颜色。
      gl.LINEAR
      gl.NEAREST_MIPMAP_LINEAR
      gl.REPEAT
      gl.REPEAT

  gl.texImage2D(target, level, internalformat, format, type, image)//纹理图分配给纹理对象

    target //gl.TEXTURE_2D 或 TEXTURE_CUBE_MAP
    level //默认0
    internalformat //图像的内部格式 gl.RGB, gl.RGBA, gl.ALPHA等
    //注意
    //internalformat的值会决定，最后取样器取出来的色值。
    //即texture2D(u_Sampler, v_TexCoord)
    //注意。 
    //注意
    format // 必须和internalformat一样
    type // 颜色数据的类型，关于rgba等分量。 UNSIGNED_BYTE 最高咯
      gl.UNSIGNED_BYTE: 8 bits per channel for gl.RGBA
      gl.UNSIGNED_SHORT_5_6_5: 5 red bits, 6 green bits, 5 blue bits.
      gl.UNSIGNED_SHORT_4_4_4_4: 4 red bits, 4 green bits, 4 blue bits, 4 alpha bits.
      gl.UNSIGNED_SHORT_5_5_5_1: 5 red bits, 5 green bits, 5 blue bits, 1 alpha bit.
    image //终于到了image对象了！new Image()

  gl.uniform1i(u_Sampler, 0)

    将纹理单元传递给片元着色器

  加载纹理，示例

    function initTextures() {
      cubeTexture = gl.createTexture();
      cubeImage = new Image();
      cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
      cubeImage.src = "cubetexture.png";
    }

    function handleTextureLoaded(image, texture) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

  例子：
  [一张图片](./webgl/example/glsl/dist/html/index.html)
## 贴图,待细化
    //获取gl
    var gl=initwebgl(
      document.getElementById("webgl_demo"),
      data[0], 
      data[1]
    );


    var n = initVertexBuffers(gl);
    // Set texture
    initTextures(gl, n)

    function initVertexBuffers(gl) {
      var verticesTexCoords = new Float32Array([
        -0.5,  0.5,   0.0, 1.0,
        -0.5, -0.5,   0.0, 0.0,
         0.5,  0.5,   1.0, 1.0,
         0.5, -0.5,   1.0, 0.0,
      ]);
      var n = 4; 
      var vertexTexCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
      var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
      //console.dir(verticesTexCoords)
      var position = gl.getAttribLocation(gl.program, 'position');
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, FSIZE * 4, 0);
      gl.enableVertexAttribArray(position);  

      var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
      gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
      gl.enableVertexAttribArray(a_TexCoord);  
      return n;
    }

    function initTextures(gl, n) {
      var image = new Image();
      image.onload = function(){ 
        var texture = gl.createTexture();
        var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
        loadTexture(gl, n, texture, u_Sampler, image); 
      };
      image.src = '../img/sky.png';
    }

    function loadTexture(gl, n, texture, u_Sampler, image) {
      //解决png的问题
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.uniform1i(u_Sampler, 0);
      //gl.clearColor(255/255, 255/250, 255/255, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT); 
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
    }
## float
    vec2 vec3 vec4
    //多意义
    void myVec(vec4 position){
      float x=position.x;
      float y=position.y;
      float z=position.z;
      float w=position.w;
    }
    void myVec(vec4 color){
      float r=color.r;
      float g=color.g;
      float b=color.b;
      float a=color.a;
    }
    void myVec(vec4 texture){
      float s=texture.s;
      float t=texture.t;
      float p=texture.p;
      float q=texture.q;
    }
    //特殊缩写
    void myfunction(){
      vec3 color=vec3(1.0,1.0,1.0);//==vec3(1.0)
      vec4 color1=vec4(color,1.0);
    }
    //数组
    void myVec(){
      vec2[3] coords=vec2[3](
        vec2(1.0,1.0),
        vec2(1.0,1.0),
        vec2(1.0,1.0),
      )
      vec2 firstCoord=coords[0];
      vec2 secondCoord=coords[1];
    }
    //多下标
    vec4 v4;
    v4.rgba;  // is a vec4 and the same as just using v4,
    v4.rgb;   // is a vec3,
    v4.b;     // is a float,
    v4.xy;    // is a vec2,
    vec4 pos = vec4(1.0, 2.0, 3.0, 4.0);
    //部分重新赋值
    pos.xw = vec2(5.0, 6.0);
    pos.wx = vec2(7.0, 8.0);
    pos.xx = vec2(3.0, 4.0);
    pos.xy = vec3(1.0, 2.0, 3.0);
## int
    ivec2 ivec3 ivec4 
## array
    const float c[3] = float[3](5.0, 7.2, 1.1);
## mat
    mat2 mat3 mat4
    //矩阵
    void myMat(){
      mat3 myMat3=mat3{
        1.0,1.0,1.0,
        1.0,1.0,1.0,
        1.0,1.0,1.0
      }
    }
    mat2(vec2, vec2);             // one column per argument
    mat3(vec3, vec3, vec3);       // one column per argument
    mat4(vec4, vec4, vec4, vec4)

    mat4(
      float, float, float, float,  // first column
      float, float, float, float,  // second column
      float, float, float, float,  // third column
      float, float, float, float
    ); // fourth column

## struct
    struct light {
        float intensity;
        vec3 position;
    };
    light lightVar = light(3.0, vec3(1.0, 2.0, 3.0));
## bool
## sampler2d(采样器)
## 运算
    vector*vector
    vector*matrix
    matrix*vector
    matrix*matrix
    //点积
    vec3(x1,y1,z1)*vec3(x2,y2,z2) == vec3(x1*x2,y1*y2,z1*z2)   
    dot(vec3(x1,y1,z1),vec3(x2,y2,z2)) == vec3(x1*x2,y1*y2,z1*z2)   
    //向量积,暂和角度有关，下次换算推算
    cross(vec3(x1,y1,z1),vec3(x2,y2,z2))==vec3(y1*z2-z1*y2,z1*x2-x1*z2,x1*y2-y1*x2);
## sin,关注类型
    sin(vec3(x,y,z))==vec3(sin(x),sin(y),sin(z)) 
## min max
    min(.2,.4)//.2
    max(.2,.4)//.4
## length
    length(vec2(1.0,.3))//伪代码==Math.sqrt(1.0*1.0+0.3*.0.3
## distance
    distance(A,B)==length(B-A);
## normalize(vector) 统一化向量
    normalize(vector)==vector/length(vector)
    //任何向量缩短或变长成为一个同方向，长度为1的向量
## mix(a,b,ratio) 混合（加权平均算法）
    //a混合b，混合的比例食用ratio
    mix(a,b,ratio)==a*(1.0-ratio)+b*ratio 
    //好例子
    mix(RED,YELLOW,position.x);//加权位置-1.0~1.0;
## clamp,给值设定范围，区范围内的值
    clamp(x,min,max)==min(max(x,min),max)
    clamp(color,0.0,1.0)
## step(edge,x) ,edge（边界，阀值）
    //基于一个阀值判断，小于取0,0，大于取1.0。
    step(.3,.1)//return 0.0
    color=step(screen.width/2,x)//伪代码，左屏幕取0，右屏幕取1
## smoothstep(start,end,x) 
    //基于2个阀值判断，小于start取0,0，大于end取1.0。中间平滑过渡，使用平滑埃尔米特差值
    opacity=smoothstep(0.0,5000.0,time)//随着时间变化改变透明度

## dFdx(value) //下回学习原因
  a==3.0
  a==5.0
  a==7.0
  dFdx(a)==2.0 
## dFdy(value)
## fwidth(value)
    待续

## storage qualifiers（存储限定符）
    const //常量，不可以修改。一定要赋值
    attribute//顶点着色器和opengl每个顶点数据之间的联系
        只读
        attribute qualifier can be used only with float, floating-point vectors, and matrices，Attribute variables cannot be declared as arrays or structures.

         attribute vec4 position;
         attribute vec3 normal;
         attribute vec2 texCoord;
    uniform//
    varying//顶点和片源着色器之间同步数据

## 预处理器Preprocessor
    #
    #define
    #undef
    #if
    #ifdef
    #ifndef
    #else
    #elif
    #endif
    #error
    #pragma
    #extension
    #version
    #line

## Keywords
    attribute const uniform varying centroid
    break continue do for while
    if else
    in out inout
    float int void bool true false
    invariant
    discard return
    mat2 mat3 mat4
    mat2x2 mat2x3 mat2x4
    mat3x2 mat3x3 mat3x4
    mat4x2 mat4x3 mat4x4
    vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow
    struct

    //未来会有，需要避免
    asm
    class union enum typedef template this packed
    goto switch default
    inline noinline volatile public static extern external interface long short double half fixed unsigned
    lowp mediump highp precision
    input output
    hvec2 hvec3 hvec4 dvec2 dvec3 dvec4 fvec2 fvec3 fvec4 sampler2DRect sampler3DRect sampler2DRectShadow
    sizeof cast
    namespace using

## 注释
    /*


    */
    //

## function
    //返回的
    float sun(float a,float b){
      return a+b
    }
    //空函数
    void myfunction(){
      float a=2.0;
    }
    //多变量
    void myfunction(){
      float a=2.0,b=3.0;
    }
## glsl function
## TRIANGLE_STRIP
## gl_FragCoord
    vec2 st = gl_FragCoord.xy/resolution;
## gl_FragCoord
    vec2 st = gl_FragCoord.xy/resolution; //当前的绘制坐标
## gl.drawingBufferWidth,gl.drawingBufferHeight 绘制区域的宽高


## 实验：片元着色器动态计算颜色
[demo](fragment1/dist/html/index.html)
### 代码
    'void main() {',
      '  gl_FragColor = vec4(abs(cos(time/180.0*3.1415)),abs(sin(time/180.0*3.1415)),abs(tan(time/180.0*3.1415)),1.0);', 
    '}'

    var timeNum=1;
    function ticker(){
      gl.uniform1f(time,++timeNum);//rgba
      //统一绘制
      gl.drawArrays(gl.TRIANGLE_STRIP , 0, vertices.length/2);
      requestAnimationFrame(arguments.callee);
    }
    ticker();

### 结论
  测试结果，特别耗电，特别耗电，特别耗电，特别耗电，特别耗电。
  猜想，对着片元着色器计算，每个像素的几何计算量太大，加上60fps实时计算


## 实验：着色器
[demo](shader1/dist/html/index.html)
## 实验： 顶点着色器
[demo](vertex1/dist/html/index.html)
## FAQ

  那个屏幕+灯光+雨水的动画效果怎么做成的？
  
  1.0,0.0,0.0对应的rgb到底是多少，为什么显示色彩和预期不一样？

  关于三角形的绘制顺序，

  三角形的顶点绘制顺序是逆时针（CounterClockWise，CCW）或者顺时针（ClockWise，CW）。
  绘制顺序之所以重要，是因为它决定了三角形的面是否朝向观察者。朝向观察者的三角形为正面三角形，否则为背面三角形。
  剔除背面三角形：

    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);// CULL意为“剔除”
    gl.cullFace(gl.BACK);

  canvas最多的数量？ chrome 超过16个就会报错

    WARNING: Too many active WebGL contexts. Oldest context will be lost.
      
  图片跨域解决方案

    var img = new Image();
    img.crossOrigin = '';
      
  图片不是2的n次方尺寸报错问题？ 加入下面的代码

    // 设置材质，这样我们可以对任意大小的图像进行像素操作
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      
  
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset)

    index 指定要修改的顶点属性的索引即key
    size 指定每个顶点属性值的数量，一般最多4个，xyzw。
    type 现在用的基本是浮点数，来提高精度
      gl.BYTE：带符号的8位整数，值为[-128,127]
      gl.SHORT：带符号的16位整数，其值为[-32768,32767]
      gl.UNSIGNED_BYTE：无符号8位整数，值为[0,255]
      gl.UNSIGNED_SHORT：无符号16位整数，值为[0,65535]
      gl.FLOAT：32位IEEE浮点数
    normalized 归一化处理【-1，1】 浮点型没意义，此处为false
      对于类型gl.BYTE和gl.SHORT，如果为true，则将值标准化为[-1,1]。
      对于类型gl.UNSIGNED_BYTE和gl.UNSIGNED_SHORT，归一化的值，以[0，1]如果为真。
      对于类型gl.FLOAT和gl.HALF_FLOAT，此参数无效。
    stride  指定连续顶点属性开头之间的偏移量
      不能大于255.如果stride为0，则假定属性紧密打包，即属性不是交错的，但每个属性都在一个单独的块中，下一个顶点'属性紧跟在当前顶点之后。
    offset
      指定顶点属性数组中第一个组件的偏移量（以字节为单位）。必须是字节长度的倍数  type。

  gl.drawArrays（mode，first，count）

    mode 绘图的方式
      gl.POINTS：绘制一个点。
      gl.LINE_STRIP：绘制直线到下一个顶点。
      gl.LINE_LOOP：绘制一条直线到下一个顶点，并将最后一个顶点连接回第一个顶点。
      gl.LINES：在一对顶点之间绘制一条线。
      gl.TRIANGLE_STRIP
      gl.TRIANGLE_FAN
      gl.TRIANGLES：为一组三个顶点绘制一个三角形。
    first
      指定向量点数组中的起始索引。
    count
      指定要呈现的索引数。要绘制的顶点总数量
      
  TRIANGLES 或 TRIANGLE_STRIP 或 TRIANGLE_FAN   
  三角形F 和 顶点N开销

    TRIANGLES F== 3n
    TRIANGLE_STRIP F== n-2
    TRIANGLE_FAN F== n-2
## gl.drawElements(mode, count, type, offset);



## 三角形绘制的详文
  <a href="https://blog.csdn.net/u011294404/article/details/53605873" target="_blank">https://blog.csdn.net/u011294404/article/details/53605873</a> 外部

  [https://blog.csdn.net/u011294404/article/details/53605873](https://blog.csdn.net/u011294404/article/details/53605873) 内跳




# glsl
## 内置函数

  |名字|中文|解释|demo|
  |-|-|-|-|
  mix(a,b,ratio)|混合|混合进一个数，用一定的比列。例如：mix(1.0,.2,.5)等于.6，color = mix(colorA, colorB, pct)；非常非常非常适合通道之间用来混合颜色|[demo](./webgl/example/181221glslmix/dist/html/index.html)|
  |step(a,val)|插值函数|设定一个阀值，传入要输入的值,小于伐值得0，大于伐值得1|[demo](./webgl/example/181224glslstep/dist/html/index.html)|
  |smoothstep(a,b,val)|过渡插值函数|设定一个区间伐值，传入一个值进去，如果小于区间得0，大于区间得1，否则平滑0-1平滑过度（按照值在区间中的位置比例，即左区间边界为0，右区间边界为1）；a，b的位置会影响到绘制效果|[demo](./webgl/example/181225glslsmoothstep/dist/html/index.html)|
  |fract|取小数部分|利用无序的小数当随机数据，制作一些随机图像，如噪点|[demo](./webgl/example/20181229glslfract/dist/html/index.html)|
  |mix|混合|可以使用百分比混合2个不同的值|[demo](./webgl/example/181221glslmix/dist/html/index.html)|
  
## 语句
    vec2 uv = fragCoord.xy / iResolution.xy; // 得到一个0-1的几何位置
    uv -= .5; //调整坐标系原点
    uv.x *= iResolution.x/iResolution.y;  //防止百分比宽引起的变形

## glsl-demo

  [绘制一条线](./webgl/example/181221glsldrawline/dist/html/index.html)

    vec2 st = gl_FragCoord.xy/resolution;
    float y = st.x;
    float pct = smoothstep( y-0.01, y, st.y)-smoothstep( y, y+0.01, st.y);
    vec3 color = pct*vec3(1.0,0.0,0.0);;
    gl_FragColor = vec4(color,1.0);


  [绘制sin](./webgl/example/181226glslsin/dist/html/index.html)

    vec2 st = gl_FragCoord.xy/resolution;
    float y = sin(st.x*3.1415926);//关键
    float pct = smoothstep( y-0.01, y, st.y)-smoothstep( y, y+0.01, st.y);
    vec3 color = pct*vec3(1.0,0.0,0.0);;
    gl_FragColor = vec4(color,1.0);



  [绘制网格](./webgl/example/181226glslgrid/dist/html/index.html)

    vec2 st = gl_FragCoord.xy/resolution;
    float x=sin(M_PI*st.x*30.0);
    x=smoothstep(.994,1.0,x);
    float y=sin(M_PI*st.y*30.0);
    y=smoothstep(.994,1.0,y);
    gl_FragColor = vec4(x,y,0.5,1.0);

[无序噪点](./webgl/example/20181229glslfract/dist/html/index.html)

    vec2 st = gl_FragCoord.xy/resolution.xy;
    //随机值
    float random=fract(
      sin(
        dot(st.xy,vec2(10000.0,1002.0)) //横行和纵向“随机”乘积
      )*1000.0
    );
    //赋值
    gl_FragColor = vec4(vec3(random), 1.0);


[有序噪点](./webgl/example/20181229glslorderfract/dist/html/index.html)

    float random (vec2 st) {
      return fract(sin(dot(st.xy,vec2(5.0,8.0))*1000.0));
    }
    void main() {
      vec2 st = gl_FragCoord.xy/resolution.xy;
      st *= 4.0; // Scale the coordinate system by 10
      vec2 ipos = floor(st);  // get the integer coords
      vec2 fpos = fract(st);  // get the fractional coords
      // vec3 color = vec3(random( ipos ));
      vec3 color = vec3(random( fpos ));
      gl_FragColor = vec4(color,1.0);
    }


[迷宫](./webgl/example/20190104glslmaze/dist/html/index.html)

    //main入口
    float random (in vec2 _st) {
        return fract(sin(dot(_st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
    }
    vec2 truchetPattern(in vec2 _st, in float _index){
        _index = fract(((_index-0.5)*2.0));
        if (_index > 0.75) {
            _st = vec2(1.0) - _st;
        } else if (_index > 0.5) {
            _st = vec2(1.0-_st.x,_st.y);
        } else if (_index > 0.25) {
            _st = 1.0-vec2(1.0-_st.x,_st.y);
        }
        return _st;
    }
    void main() {
        vec2 st = gl_FragCoord.xy/resolution.xy;
        st *= 10.0;
        st = (st-vec2(5.0))*(abs(sin(time/1000.0*0.2))*5.);
        st.x += time/1000.0*10.0;

        vec2 ipos = floor(st);  // integer
        vec2 fpos = fract(st);  // fraction
        vec2 tile = truchetPattern(fpos, random( ipos ));
        float color = 0.0;
        // Maze
        color = smoothstep(tile.x-0.1,tile.x,tile.y)-
                smoothstep(tile.x,tile.x+0.1,tile.y);
        gl_FragColor = vec4(.0,vec3(color).xy,1.0);
    }




[旋转一个球]   

    float DistLine(vec3 ro, vec3 rd, vec3 p) {
      return length(cross(p-ro, rd))/length(rd);
    }
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      float t = iTime;
        vec2 uv = fragCoord.xy / iResolution.xy; // 0 <> 1
        uv -= .5;
        uv.x *= iResolution.x/iResolution.y;
        vec3 ro = vec3(0.,0.,-1.);
        vec3 rd = vec3(uv.x,uv.y,0.)-ro;
        vec3 p=vec3(sin(t),0.,1.+cos(t));
        float d=DistLine(ro,rd,p);
        d=smoothstep(.1,.09,d);
      fragColor = vec4(d);
    }
    
[lookat](./webgl/example/20190205lockat/dist/html/index.html)

    float DistLine(vec3 ro, vec3 rd, vec3 p) {
      return length(cross(p-ro, rd))/length(rd);
    }

    float DrawPoint(vec3 ro, vec3 rd, vec3 p) {
      float d = DistLine(ro, rd, p);
        d = smoothstep(.06, .05, d);
        return d;
    }
    //main入口
    void main() {
      //渲染色彩
      float t = time/1000.0;
      
      vec2 uv = gl_FragCoord.xy / resolution.xy; // 0 <> 1
      uv -= .5;
      uv.x *= resolution.x/resolution.y;
      
      vec3 ro = vec3(3.*sin(t), 2., -3.*cos(t));
      
      vec3 lookat = vec3(.5);
      
      float zoom = 1.;
      
      vec3 f = normalize(lookat-ro);
      vec3 r = cross(vec3(0., 1., 0.), f);
      vec3 u = cross(f, r);
      
      vec3 c = ro + f*zoom;
      vec3 i = c + uv.x*r + uv.y*u;
      vec3 rd = i-ro;
      

      float d = 0.;
      
      d += DrawPoint(ro, rd, vec3(0., 0., 0.));
      d += DrawPoint(ro, rd, vec3(0., 0., 1.));
      d += DrawPoint(ro, rd, vec3(0., 1., 0.));
      d += DrawPoint(ro, rd, vec3(0., 1., 1.));
      d += DrawPoint(ro, rd, vec3(1., 0., 0.));
      d += DrawPoint(ro, rd, vec3(1., 0., 1.));
      d += DrawPoint(ro, rd, vec3(1., 1., 0.));
      d += DrawPoint(ro, rd, vec3(1., 1., 1.));
      
      gl_FragColor = vec4(d);
    }







