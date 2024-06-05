// Aiven Jerel Desiderio
// Created: 6/2/2024
// Phaser: 3.70.0
//
// Final Project Implementation top down 2d horde slayer
//
// 
// 
// Art assets from Kenny Assets 

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1440,
    height: 900,
    scene: [Load, Adventure]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}, vfx {}};

const game = new Phaser.Game(config);