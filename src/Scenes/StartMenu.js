class StartMenu extends Phaser.Scene{
    constructor(){
        super("startScene");
    }

    create(){
        let clickCount = 0;
        this.clickCountText = this.add.text(100, 200, '');
    
        this.clickButton = this.add.bitmapText(500, 400, "KennyPixel", 'Start Game!!!', 64)
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            this.scene.start("adventureScene");
        });
    
      }

    update(){

    }
}