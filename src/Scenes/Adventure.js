class Adventure extends Phaser.Scene{
    constructor(){
        super("adventureScene");
    }

    init() {
        this.SCALE = 2.0;
        // this adds gravity this.physics.world.gravity.y = 100;

        this.VELOCITY = 200;

        my.sprite.projectile = [];

        this.spawnTimer = 60;
        this.spawnCounter = 0;

        my.sprite.enemies = [];

    }

    create(){
        this.map = this.add.tilemap("levelOneMap", 16, 16, 148, 25);
        this.tileset = this.map.addTilesetImage("kenny-monochrome-pirates", "kenny_monochromeRPG_packed");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);



        my.sprite.player = this.physics.add.sprite(100, 100, "rpg_tilemap_sheet", 119);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        my.sprite.player.setCollideWorldBounds(true);


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

        this.projGroup = this.add.group(my.sprite.projectile);
        console.log(this.projGroup);


        // Create CAMERA 
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(50, 70);
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
    }

    update(){
        this.spawnCounter++;
        this.enemyFollows();
        if(this.spawnCounter >= this.spawnTimer){

            this.spawnCounter = 0;
            
            for(let i = 0; i < this.spawner.length; i++){
                this.enemy = this.physics.add.sprite(this.spawner[i].x, this.spawner[i].y, "rpg_tilemap_sheet", 123);
                console.log("Spawned enemy at: ", this.spawner[i].x, " ", this.spawner[i].y)
                my.sprite.enemies.push(this.enemy);
            }

            this.enemyGroup = this.add.group(my.sprite.enemies);



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
        for(let i = 0; i < my.sprite.enemies.length; i++){
            this.physics.moveToObject(my.sprite.enemies[i], my.sprite.player, 100);
        }
    }


}