window.addEventListener('load', (event) => {
	onReady();
});
window.addEventListener('resize', resize);

window.onorientationchange = resize;

var width = 480;
var height = 320;

var wabbitTexture;
var pirateTexture;

var bunnys = [];
var gravity = 0.5//1.5 ;

var maxX = width;
var minX = 0;
var maxY = height;
var minY = 0;

var startBunnyCount = 2;
var isAdding = false;
var isRemoving = false;
var count = 0;
var container;

var amount = 100;

function onReady()
{
	
	renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor:0xEEEEEE});
	stage = new PIXI.Stage(0xEEEEEE);

	amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;
	if(amount == 5)
	{
		renderer.context.mozImageSmoothingEnabled = false
		renderer.context.webkitImageSmoothingEnabled = false;
		
	}
	
	renderer.view.style["transform"] = "translatez(0)";
	//alert(amount)
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";

	requestAnimationFrame(update);
	
	wabbitTexture = new PIXI.Texture.fromImage("../img/qq.png")

	counter = document.createElement("div");
	counter.className = "counter";
	document.body.appendChild( counter);
	count = startBunnyCount;
	counter.innerHTML = "Total: " + count + " sprites";
	
	
	container = new PIXI.DisplayObjectContainer();
	container = new PIXI.ParticleContainer(200000, [false, true, false, false, false]);
	stage.addChild(container);

	bunny1 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.math.Rectangle(0, 0, 969, 1135));
	bunny2 = bunny1;
	bunny3 = bunny1;
	bunny4 = bunny1;
	bunny5 = bunny1;

	// bunny1 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 47, 26, 37));
	// bunny2 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 86, 26, 37));
	// bunny3 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 125, 26, 37));
	// bunny4 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 164, 26, 37));
	// bunny5 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 2, 26, 37));

	bunnyTextures = [bunny1, bunny2, bunny3, bunny4, bunny5];
	bunnyType = 2;
	currentTexture = bunnyTextures[bunnyType];

	for (var i = 0; i < startBunnyCount; i++) 
	{
		var bunny = new PIXI.Sprite(currentTexture);
		bunny.width = 969 * 0.03;
		bunny.height = 1135 * 0.03
		bunny.speedX = Math.random() * 10;
		bunny.speedY = (Math.random() * 10) - 5;
		
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 1;
		bunnys.push(bunny);
	//	bunny.filters = [filter];	
	//	bunny.position.x = Math.random() * 800;
	//	bunny.position.y = Math.random() * 600;
			

		container.addChild(bunny);
	}
	

	
	renderer.view.addEventListener("mousedown", (event) => {
		onTouchStart(event)
	})
	
	renderer.view.addEventListener("mouseup", () => {
		// bunnyType++
		// bunnyType %= 5;
		// currentTexture = bunnyTextures[bunnyType];
		onTouchEnd(event)
	})

	renderer.view.addEventListener("touchstart", onTouchStart, true);
	renderer.view.addEventListener("touchend", onTouchEnd, true);
	
	
	resize();
}

function onTouchStart(event)
{
	var posX;
	if (event.targetTouches) {
		posX = (event.targetTouches && event.targetTouches[0].clientX);
	} else { 
		posX =event.clientX
	}
	if (posX > document.body.clientWidth / 2) {
		isRemoving = true;
	} else { 
		isAdding = true;
	}
}

function onTouchEnd(event)
{
	// bunnyType++
	// bunnyType %= 5;
	// currentTexture = bunnyTextures[bunnyType];
	isAdding = false;
	isRemoving = false;
}

function resize()
{

	var width = window.innerWidth; 
	var height = window.innerHeight; 
	
	
	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;
	
	var w = window.innerWidth / 2 - width/2;
	var h = window.innerHeight / 2 - height/2;
	
	renderer.view.style.left = window.innerWidth / 2 - width/2 + "px"
	renderer.view.style.top = window.innerHeight / 2 - height/2 + "px"
	

	counter.style.position = "fixed";
	counter.style.left =  "0px";
	counter.style.bottom = "0px";
	counter.style.fontSize = "14px";
	counter.style.height = "24px";
	counter.style.paddingLeft = "5px";
	counter.style.width = "100%";
	counter.style.lineHeight = "24px";
	counter.style.color = "yellow";
	counter.style.backgroundColor = "rgba(0,0,0,.4)";
	
	
	
	renderer.resize(width, height);
}

function update()
{
	if (isRemoving) { 
		container.removeChildren(2, 102)
		count -= 100;
		if (count < 2) { 
			count = 2;
		}
		counter.innerHTML = "Total: " + count + " sprites";
	}
	if(isAdding)
	{
		if(count < 200000)
		{

			for (var i = 0; i < amount; i++) 
			{
				var bunny = new PIXI.Sprite(currentTexture);
				bunny.speedX = Math.random() * 10;
				bunny.speedY = (Math.random() * 10) - 5;
				bunny.anchor.y = 1;
				//bunny.alpha = 0.3 + Math.random() * 0.7;
				bunnys.push(bunny);
				bunny.scale.set(0.5 + Math.random()*0.5);

				bunny.rotation = (Math.random()-0.5)
			
				//bunny.rotation = Math.random() - 0.5;
				var random = Math2.randomInt(0, container.children.length - 2);

				bunny.width = 969*0.03;
				bunny.height = 1135*0.03;
				container.addChild(bunny)//, random);
				
				count++;
			}
		}

		counter.innerHTML = "Total: "+ count + " sprites";
	}
	
	for (var i = 0; i < bunnys.length; i++) 
	{
		var bunny = bunnys[i];
		//bunny.rotation += 0.1
	
		bunny.position.x += bunny.speedX;
		bunny.position.y += bunny.speedY;
		bunny.speedY += gravity;
		
		if (bunny.position.x > maxX)
		{
			bunny.speedX *= -1;
			bunny.position.x = maxX;
		}
		else if (bunny.position.x < minX)
		{
			bunny.speedX *= -1;
			bunny.position.x = minX;
		}
		
		if (bunny.position.y > maxY)
		{
			bunny.speedY *= -0.85;
			bunny.position.y = maxY;
			bunny.spin = (Math.random()-0.5) * 0.2
			if (Math.random() > 0.5)
			{
				bunny.speedY -= Math.random() * 6;
			}
		} 
		else if (bunny.position.y < minY)
		{
			bunny.speedY = 0;
			bunny.position.y = minY;
		}
	}
	renderer.render(stage);
	requestAnimationFrame(update);
}
const addCalculation = document.createElement("div");
addCalculation.innerHTML = "左边+"
const addMemory = document.createElement("div");
addMemory.innerHTML = "右边-"

addCalculation.setAttribute("class", "btn1")
addMemory.setAttribute("class", "btn2")

document.body.appendChild(addCalculation);
document.body.appendChild(addMemory);
