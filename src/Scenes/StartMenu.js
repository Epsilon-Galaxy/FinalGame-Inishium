class StartMenu extends Phaser.Scene{
    constructor(){
        super("startScene");
    }

    create(){
    
        this.title = this.add.bitmapText(400, 100, "KennyPixel", "Inishium: Ghost Hunters", 64);
        this.startText = this.add.bitmapText(100, 200, "KennyPixel", "Arrow Keys to move. Mouse nd left click to shoot", 64)

        this.clickButton = this.add.bitmapText(400, 400, "KennyPixel", 'CLICK HERE TO Start Game!!!', 64)
          .setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            this.sound.play("click");
            this.scene.start("adventureScene");
        });

        this.goal = this.add.bitmapText(250, 600, "KennyPixel", "score points and find the exit to move on", 64);
    
    }

    update(){

    }
}