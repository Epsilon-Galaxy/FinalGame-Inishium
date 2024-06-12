class FinalGame extends Phaser.Scene{
    constructor(){
        super("finalGameScene");
    }
    create(){
    
        this.clickButton = this.add.bitmapText(450, 400, "KennyPixel", 'CONGRATULATIONS YOU WIN!!!!', 64)
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            this.scene.start("adventureScene");
        });
    
    }
    update(){
        
    }
}