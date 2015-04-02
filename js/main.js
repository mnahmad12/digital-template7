window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    /*
		Game Overview:
			Theme: Stranger's Cell Phone
			...One day you are walking to school and discover a phone on the sidewalk,
				just when you are about to move on it rings...
				
				.."Hello George, a zombie outbreak is happening now in your city, you have to find the vial
					of cure, they are coming George, hurry! ..
					
					..what do you mean..who are you..."1 hour George, hurry they are on the way"
	
			Game details: 
				1) You start in the middle of the map and can shoot
				2) The map is dark and you can't see around, you have a flashlight that lights up an area
				3) There are zombies (in red) that are moving around the map, if they run into you, you
					lose a life point
				4) Find the zombies, kill them
				5) There is a vial somewhere on the map, if you find it you cure the city if you dont (within 2 min)
					you die, everyone becomes a zombie..
	
	*/
	
	var P2Game = {};
	
	P2Game.StateA = function (game) {

		
		
	};
	
	P2Game.StateA.prototype = 
	{
		//PRELOAD
		preload: function()
		{
			
			
		},
		

		update: function()
		{
					
		},
		
		
		
		
		
		//Go To State B
		gotoStateB: function () 
		{

			this.state.start('StateB');

		}
	
	}
	
	
	
	
	
	

    //STATE B
	
	P2Game.StateB = function(game)
		{
			
			this.keys;
			this.text;
			this.style;
			this.people;
		}
	
	
	
	P2Game.StateB.prototype=
	{
		preload: function() 
		{
        //pre-loading the zombies
			this.load.spritesheet('people', 'assets/people.png');
			this.game.stage.backgroundColor = '#000000';
		},
    

	
		create: function() 
		{
			
		//world boundary
			this.world.setBounds(0,0,800,600);
			
		//starting physics:
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//creating the patients
			this.people = this.add.group();
		
			
		//creating 10 patients that show up in a random fashion	
		
		
			this.people.createMultiple(10,"people",0,false);
			this.game.physics.enable(this.people,Phaser.Physics.ARCADE);
		
		//spawning patients			
			this.game.time.events.repeat(Phaser.Timer.SECOND*this.rnd.integerInRange(30, 45),10, this.resurrect,this );
			
	
	
		// Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "Don't Let the Monsters Get You!.", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
		
		
			this.keys = this.input.keyboard.createCursorKeys();
		
			Window.alert('hello?');
		},
	
	
		resurrect: function()
		{
			
		
			
		 //Get the first not-currently spawned item
			var item = this.people.getFirstDead();
			var xCord=50;
			var yCord=100;
			var colorArray=[0x00CC00,0xFFFF00,0xFF6600,0xFF0000]
			
			if (item)
			{
				//And bring it back to life
				item.reset(xCord+20, yCord);
			
				var colorStatus=this.rnd.integerInRange(0,4);
				item.tint=colorArray[colorStatus];
			}

			
		},
	
		update: function()
		{
			
			
		
		},
		
		goToStateC: function () 
		{

			this.state.start('StateC');

		},
		
		goToStateD: function () 
		{

			this.state.start('StateD');

		}
	}
	
		P2Game.StateC = function (game) {

		this.message;
		this.cursors;
		this.logo;
		this.text;
		this.style;
		
	};
	
	//STATE C: END GAME STATE
	
	P2Game.StateC.prototype = 
	{
		
		
		 gotoStateB: function () 
		{

			this.state.start('StateB');

		},
		
		
	
		
		update: function()
		{
			
			this.cursors = this.input.keyboard.createCursorKeys();
			
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "You Lose! Want to Play Again? Press The Left Arrow!", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
			
			if (this.cursors.left.isDown)
			{
				this.gotoStateB();
			}
		
		}
	
	}
	
	P2Game.StateD=function(game){
		this.cursors;
		this.style;
		this.text;
	}
	
	P2Game.StateD.prototype=
	{
		gotoStateA: function () 
		{

			this.state.start('StateA');

		},
		
		update: function()
		{
			
			this.cursors = this.input.keyboard.createCursorKeys();
			
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "You Win!\nTo play the next level please\nSend your credit card info to mahmad15@gmu.edu\n(To Restart press the left arrow)", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
			
			if (this.cursors.left.isDown)
			{
				this.gotoStateA();
			}
			
			
		}
	
	}
	
	var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
	//game.state.add('StateA', P2Game.StateA);
	game.state.add('StateB', P2Game.StateB);
	game.state.add('StateC', P2Game.StateC);
	game.state.add('StateD', P2Game.StateD);
	//game.state.start('StateA');
    
    
 };
