class LevelTwo extends Phaser.Scene{
    constructor(){
        super("levelTwoScene");
    }

    init(){
        this.SCALE = 2.0;

        this.VELOCITY = 200;
        this.MAX_ENEMIES = 20;
        this.score = 0;

        this.nextStage = false;
        this.nextStageTimer = 0
        this.nextStageCount = 150;

        my.sprite.projectile = [];

        this.spawnTimer = 60;
        this.spawnCounter = 0;

        this.health = 100;

        my.sprite.enemies = [];
        this.enemyGroup = this.add.group(my.sprite.enemies);
    }


    create(){



        this.map = this.add.tilemap("levelOneMap", 16, 16, 148, 25);
        this.tileset = this.map.addTilesetImage("kenny-monochrome-pirates", "kenny_monochromeRPG_packed");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);




        my.sprite.player = this.physics.add.sprite(100, 100, "rpg_tilemap_sheet", 119);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        my.sprite.player.setCollideWorldBounds(true);

        this.nextStageText = this.add.bitmapText(my.sprite.player.x - 100, my.sprite.player.y + 100, "KennyPixel", "Collect 1000 points and find the exit to go to the next stage", 30);
        this.nextStage = true;


        // Create OBJECTS from OBJECT LAYER

        // OBJECT SPAWNERS
        this.spawner = this.map.createFromObjects("Terrain", {
            name: "spawner",
            key: "rpg_tilemap_sheet",
            frame: 52
        })
        this.spawnerGroup = this.add.group(this.spawner);
        console.log(this.spawner);
        console.log(this.spawnerGroup);

        // OBJECT TREES
        this.tree = this.map.createFromObjects("Terrain", {
            name: "tree",
            key: "rpg_tilemap_sheet",
            frame: 13
        })
        this.physics.world.enable(this.tree, Phaser.Physics.Arcade.STATIC_BODY);
        this.treeGroup = this.add.group(this.tree);
        this.physics.add.collider(my.sprite.player, this.treeGroup);

        // OBJECT PATH
        this.path = this.map.createFromObjects("Terrain", {
            name: "path",
            key: "rpg_tilemap_sheet",
            frame: 87
        })
        this.physics.world.enable(this.path, Phaser.Physics.Arcade.STATIC_BODY);
        this.pathGroup = this.add.group(this.path);

        this.physics.add.overlap(my.sprite.player, this.pathGroup, (obj1, obj2) =>{

            if(this.score < 1000){
                this.nextStage = true;
                this.nextStageText.visible = true;
                this.nextStageText.setText("This is the exit collect 1000 points to move on");
                this.nextStageText.x = my.sprite.player.x;
                this.nextStageText.y = my.sprite.player.y + 100;
            }
            else{
                console.log("Loading Boss Battle");
                this.scene.start("bossBattleScene");
            }
            //this.sound.play("deathSound");
        })

        this.projGroup = this.add.group(my.sprite.projectile);
        console.log(this.projGroup);


        // Create CAMERA 
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(0, 0);
        this.cameras.main.setZoom(this.SCALE);

        cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey('R');


        this.input.on('pointerdown', function (pointer)
        {

            console.log('Pointer x: ', pointer.x);
            console.log('Pointer y: ', pointer.y);
            this.projectile = this.physics.add.sprite(my.sprite.player.x, my.sprite.player.y, "rpg_tilemap_sheet", 126)
            my.sprite.projectile.push(this.projectile);
            
            //use world X to move towards definite position due to the use of the camera
            this.physics.moveTo(this.projectile, pointer.worldX, pointer.worldY, 300);

            console.log(my.sprite.projectile.length);   
            this.projGroup = this.add.group(my.sprite.projectile);

            this.physics.add.overlap(this.projGroup, this.treeGroup, (obj1, obj2) =>{
                /*
                this.add.particles(obj2.x, obj2.y, "kenny-particles", {
                    frame: ["slash_01.png", "slash_02.png", "slash_03.png", "slash_04.png"],
                    random: true,
                    scale: {start: 0.5, end: 0.05},
                    maxAliveParticles: 3,
                    lifespan: 300,
                    duration: 300
                });
                */
                obj1.visible = false;
                obj1.destroy();
                console.log("yo");
                //this.sound.play("deathSound");
            })
  


        }, this);


        this.scoreText = this.add.bitmapText(my.sprite.player.x - 100, my.sprite.player.y + 200,"KennyPixel",  "SCORE: 0", 32);
        this.healthText = this.add.bitmapText(my.sprite.player.x + 100, my.sprite.player.y + 200, "KennyPixel", "HEALTH: 100", 32);
    }

    update(){
        if(this.nextStage == true){
            this.nextStageText.visible = true;
            this.nextStageTimer++;
            if(this.nextStageTimer >= this.nextStageCount){
                this.nextStageText.visible = false;
                this.nextStage = false;
                this.nextStageTimer = 0;
            }
        }

        if(this.health <= 0){
            this.scene.start("gameOverScene");
        }

        if(my.sprite.player.x < 325){
            this.scoreText.x = 10;
            this.healthText.x = 550;
        }
        else if(my.sprite.player.x > 2000){
            this.scoreText.x = 2000 - 325;
            this.healthText.x = 2200;
        }
        else{
            this.scoreText.x = my.sprite.player.body.x - 325;
            this.healthText.x = my.sprite.player.body.x + 200;
        }

        if(my.sprite.player.y < 175){
            this.scoreText.y = 10;
            this.healthText.y = 10;
        }
        else if(my.sprite.player.y > 650){
            this.scoreText.y = 650 - 250;
            this.healthText.y = 650 - 250;
        }
        else{
            this.scoreText.y = my.sprite.player.body.y - 175;
            this.healthText.y = my.sprite.player.body.y - 175;
        }
        this.scoreText.setText("SCORE: " + this.score);
        this.healthText.setText("HEALTH: " + this.health);

        this.spawnCounter++;

        this.physics.add.overlap(this.projGroup, this.enemyGroup, (obj1, obj2) =>{
            /*
            this.add.particles(obj2.x, obj2.y, "kenny-particles", {
                frame: ["slash_01.png", "slash_02.png", "slash_03.png", "slash_04.png"],
                random: true,
                scale: {start: 0.5, end: 0.05},
                maxAliveParticles: 3,
                lifespan: 300,
                duration: 300
            });
            */
            obj1.visible = false;
            obj1.destroy();

            obj2.healthAmount -= 1;
            if(obj2.healthAmount <= 0){
                obj2.visible = false;
                obj2.destroy();
    
                this.score += 100;
    
                console.log(this.score);
                //this.sound.play("deathSound");
            }



        })

        this.physics.add.overlap(my.sprite.player, this.enemyGroup, (obj1, obj2) =>{
            /*
            this.add.particles(obj2.x, obj2.y, "kenny-particles", {
                frame: ["slash_01.png", "slash_02.png", "slash_03.png", "slash_04.png"],
                random: true,
                scale: {start: 0.5, end: 0.05},
                maxAliveParticles: 3,
                lifespan: 300,
                duration: 300
            });
            */

            obj2.visible = false;
            obj2.destroy();


            this.health -= 10;

            if (this.health <= 0){
                console.log("GAME OVER");
            }

            //this.sound.play("deathSound");
        })

        if(this.spawnCounter >= this.spawnTimer){

            this.spawnCounter = 0;
            
            for(let i = 0; i < this.spawner.length; i++){
                if(my.sprite.enemies.length <= this.MAX_ENEMIES){
                    this.enemy = this.physics.add.sprite(this.spawner[i].x, this.spawner[i].y, "rpg_tilemap_sheet", 123);
                    this.enemy.healthAmount = 2;
                    console.log("Spawned enemy at: ", this.spawner[i].x, " ", this.spawner[i].y)
                    console.log("Enemy Health: " + this.enemy.healthAmount);
                    my.sprite.enemies.push(this.enemy);
                }
            }

            this.enemyGroup = this.add.group(my.sprite.enemies);
            this.enemyFollows();



        }


        if(cursors.left.isDown) {
            my.sprite.player.setVelocityX(-this.VELOCITY);
            my.sprite.player.setFlip(true, false);

        } else if(cursors.right.isDown) {
            my.sprite.player.setVelocityX(this.VELOCITY);

            my.sprite.player.resetFlip();


        } else {

            my.sprite.player.setVelocityX(0);
        }

        if(cursors.up.isDown) {
            my.sprite.player.setVelocityY(-this.VELOCITY);

        } else if(cursors.down.isDown) {
            my.sprite.player.setVelocityY(this.VELOCITY);

        } else {

            my.sprite.player.setVelocityY(0);
        }

        my.sprite.enemies = my.sprite.enemies.filter((enemy) => (enemy.visible == true));

        my.sprite.projectile = my.sprite.projectile.filter((projectile) => (projectile.x > 0 && projectile.x < this.map.widthInPixels && projectile.y > 0 && projectile.y < this.map.widthInPixels && projectile.visible == true));
    }

    enemyFollows() {
        my.sprite.enemies = my.sprite.enemies.filter((enemy) => (enemy.visible == true));
        for(let i = 0; i < my.sprite.enemies.length; i++){
            this.physics.moveToObject(my.sprite.enemies[i], my.sprite.player, 300);
        }
    }


}