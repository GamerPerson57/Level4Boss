//Declare my variables
var canvas;
var context;
var timer;
var interval;
var player;
var gameOver = false;
var clearObj = false;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:100, y:canvas.height/2-100});

	platform0 = new GameObject();
		platform0.width = 400;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";
	
	platform1 = new GameObject();
		platform1.width = 400;
		platform1.x = platform1.width/2 + 600;
		platform1.y = canvas.height - platform1.height/2;
		platform1.color = "#66ff33";
	
	enemy = new GameObject({x:900, y:canvas.height/2+250});
	enemy.color = "#2600ff";
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	
	context.fillStyle = "black";
	context.font = "20px Arial";
	context.textAlign = "center";
	context.fillText("Jump Mechanic: Press W to jump over gaps and jump on enemies!", canvas.width/2, canvas.height/2);

	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}

	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	
	// Platform 0 Collision
	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}

	// Platform 1 Collision
	while(platform1.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform1.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform1.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}

	//enemy collision
	while(enemy.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(enemy.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(enemy.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}
		
	
	
	platform0.drawRect();
	platform1.drawRect();

	//Show hit points
	player.drawRect();
	enemy.drawCircle();

	if(player.hitTestObject(enemy))
	{
		 if (player.bottom().y <= enemy.top().y + 5 && player.vy > 0) 
    {
        clearObj = true;
        player.vy = player.jumpHeight * 0.7; // bounce upward after stomping
    }

	}

	if (clearObj) 
	{
		enemy.y = 1000;	
	}
}

