class FinalGame extends Phaser.Scene{
    constructor(){
        super("finalGameScene");
    }
    create(){
        this.sound.play("win");
        this.titleText = this.add.bitmapText(400, 300, "KennyPixel", "Inishium: Undead Hunters", 64);
        this.creatorText = this.add.bitmapText(400, 500, "KennyPixel", "Credits: Aiven Jerel Desiderio", 64);
        this.assetsText = this.add.bitmapText(400, 600, "KennyPixel", "Asset Credits: Kenny Assets", 64);
        this.clickButton = this.add.bitmapText(400, 400, "KennyPixel", 'CONGRATULATIONS YOU WIN!!!!', 64)
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            this.sound.play("click");
            this.scene.start("adventureScene");
        });
    
    }
    update(){
        
    }
}