class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }
    create(){
        this.sound.play("lose");
        this.clickButton = this.add.bitmapText(300, 400, "KennyPixel", 'GAME OVER. CLICK HERE To Restart???', 64)
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            this.sound.play("click");
            this.scene.start("adventureScene");
        });
    
    }
    update(){
        
    }
}