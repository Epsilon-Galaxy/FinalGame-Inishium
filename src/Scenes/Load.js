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
        this.load.multiatlas("kenny-particles", "kenny-particles.json");

        //Load bitmapfont
        this.load.bitmapFont("KennyPixel", "KennyPixelFont_0.png", "KennyPixelFont.fnt");
        //Load sounds
        this.load.audio("projectile", "projectileshot.ogg");
        this.load.audio("footstep", "footstep00.ogg");
        this.load.audio("click", "uiclick.ogg");
        this.load.audio("hit", "hitEffect.ogg");
        this.load.audio("heal", "health.ogg");
        this.load.audio("lose", "youLose.ogg");
        this.load.audio("win", "youwin.ogg");
        this.load.audio("nextLevel", "nextLevel.ogg");


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