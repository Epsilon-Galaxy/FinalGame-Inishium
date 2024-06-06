class Adventure extends Phaser.Scene{
    constructor(){
        super("adventureScene");
    }

    init() {
        this.SCALE = 2.0;
        // this adds gravity this.physics.world.gravity.y = 100;

        this.VELOCITY = 200;

    }

    create(){
        this.map = this.add.tilemap("levelOneMap", 16, 16, 148, 25);
        this.tileset = this.map.addTilesetImage("kenny-monochrome-pirates", "kenny_monochromeRPG_packed");

        this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);



        my.sprite.player = this.physics.add.sprite(100, 100, "rpg_tilemap_sheet", 119);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        my.sprite.player.setCollideWorldBounds(true);


        // Create CAMERA 
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(50, 70);
        this.cameras.main.setZoom(this.SCALE);

        cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey('R');
    }

    update(){
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
    }

}