class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }
    create(){
    
        this.clickButton = this.add.bitmapText(450, 400, "KennyPixel", 'GAME OVER. Restart???', 64)
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            this.scene.start("adventureScene");
        });
    
    }
    update(){
        
    }
}