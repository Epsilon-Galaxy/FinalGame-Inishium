class StartMenu extends Phaser.Scene{
    constructor(){
        super("startScene");
    }

    create(){
    
        this.clickButton = this.add.bitmapText(500, 400, "KennyPixel", 'Start Game!!!', 64)
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            this.scene.start("bossBattleScene");
        });
    
    }

    update(){

    }
}