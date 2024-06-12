class Load extends Phaser.Scene{
    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.setPath("./assets/");

        //Load Tilemap
        this.load.image("kenny_monochromeRPG_packed", "rpg_tilemap_packed.png");
        this.load.tilemapTiledJSON("levelOneMap", "adventure-level-1-map.json");
        //Load Tilemap as Spritesheet
        this.load.spritesheet("rpg_tilemap_sheet", "rpg_tilemap_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        //Load Particles as a multiatlas

        //Load bitmapfont
        this.load.bitmapFont("KennyPixel", "KennyPixelFont_0.png", "KennyPixelFont.fnt");
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

        this.anims.create({
            key: "health",
            defaultTextureKey: "rpg_tilemap_sheet",
            frames: [
                { frame: 127},
                { frame: 128},
                { frame: 129}
            ],
            frameRate: 5,
            repeat: -1
        })


        //Start the adventure
        this.scene.start("startScene")
    }
}