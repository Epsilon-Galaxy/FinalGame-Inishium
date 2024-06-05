class Load extends Phaser.Scene{
    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.setPath("./assets/");

        //Load Tilemap

        //Load Tilemap as Spritesheet

        //Load Particles as a multiatlas

        //Load bitmapfont

        //Load sounds


    }

    create(){
        // Create animations here
        /*
        this.anims.create({
            key: //Name for animation,
            defaultTextureKey: //TilemapSpritesheet,
            frames: //[
                { frame: },
                { frame: }
            ],
            frameRate: ,
            repeat: -1
        })
        */


        //Start the adventure
        this.scene.start("adventureScene")
    }
}