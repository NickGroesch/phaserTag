var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const truth = "this should make eslint throw travis"

var myDude;
var dude;
var greenDude;
var blueDude;

var platforms;
var cursors;

var myScore = 0;
var pinkScore = 0;
var blueScore = 0;
var gameOver = false;
var myDisp;
var blueDisp;
var pinkDisp;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('mydude', 'assets/mydude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('bluedude', 'assets/bluedude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('greendude', 'assets/greendude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground').setScale(.5).refreshBody();
    platforms.create(50, 250, 'ground').setScale(.8).refreshBody();
    platforms.create(750, 220, 'ground');

    myDude = this.physics.add.sprite(100, 150, 'mydude');
    myDude.setCollideWorldBounds(true);
    dude = this.physics.add.sprite(600, 450, 'dude');
    dude.setCollideWorldBounds(true);
    greenDude = this.physics.add.sprite(400, 450, 'greendude');
    greenDude.setCollideWorldBounds(true);
    blueDude = this.physics.add.sprite(100, 450, 'bluedude');
    blueDude.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'greenleft',
        frames: this.anims.generateFrameNumbers('greendude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'greenturn',
        frames: [{ key: 'greendude', frame: 4 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'greenright',
        frames: this.anims.generateFrameNumbers('greendude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'blueleft',
        frames: this.anims.generateFrameNumbers('bluedude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'blueturn',
        frames: [{ key: 'bluedude', frame: 4 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'blueright',
        frames: this.anims.generateFrameNumbers('bluedude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'myleft',
        frames: this.anims.generateFrameNumbers('mydude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'myturn',
        frames: [{ key: 'mydude', frame: 4 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'myright',
        frames: this.anims.generateFrameNumbers('mydude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    myDisp = this.add.text(16, 16, 'myDude: 0', { fontSize: '32px', fill: '#000' });
    blueDisp = this.add.text(16, 48, 'blueDudes: 0', { fontSize: '32px', fill: '#000' });
    pinkDisp = this.add.text(18, 80, 'pinkDudes: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(myDude, platforms);
    this.physics.add.collider(dude, platforms);
    this.physics.add.collider(greenDude, platforms);
    this.physics.add.collider(blueDude, platforms);

    this.physics.add.overlap(myDude, greenDude, greenCollision, null, this);
    this.physics.add.overlap(myDude, blueDude, blueCollision, null, this);
    this.physics.add.overlap(myDude, dude, dudeCollision, null, this);


    cursors = this.input.keyboard.createCursorKeys();

}

function update() {
    if (cursors.left.isDown) {
        myDude.setVelocityX(-160);
        myDude.anims.play('myleft', true);
    }
    else if (cursors.right.isDown) {
        myDude.setVelocityX(160);
        myDude.anims.play('myright', true);
    }
    else if (cursors.up.isDown) {
        myDude.setVelocityY(-160);
    }
    else if (cursors.down.isDown) {
        myDude.setVelocityY(160);
    }
    else {
        myDude.setVelocityX(0);
        myDude.setVelocityY(0);
        myDude.anims.play('myturn');
    }

    randomWalk(greenDude, 170, 97, 'green')
    randomWalk(blueDude, 80, 99, 'blue')
    randomWalk(dude, 280, 95, '')
}

function greenCollision(player, green) {
    console.log('You got me myDude')
    myScore += 1;
    myDisp.setText('myDude: ' + myScore);
}
function blueCollision(player, blue) {
    console.log('Blue got you myDude')
    blueScore += 5;
    blueDisp.setText('blueDudes: ' + blueScore);
}
function dudeCollision(player, dude) {
    console.log('Dude got you myDude')
    pinkScore += 1;
    pinkDisp.setText('pinkDudes: ' + pinkScore);
}
function randomWalk(npc, velocity, directedness, prefix) {
    const change = Math.floor(Math.random() * 100)//this behavior seems pretty logarithmic, might need another digit precision
    if (change < directedness) {
    } else {
        let key;
        const direction = Math.floor(Math.random() * 5)
        switch (direction) {
            case 0:
                npc.setVelocityX(-velocity)
                key = prefix + 'left'
                npc.anims.play(key, true);
                break;
            case 1:
                npc.setVelocityX(velocity)
                key = prefix + 'right'
                npc.anims.play(key, true);
                break;
            case 2:
                npc.setVelocityY(-velocity)
                break;
            case 3:
                npc.setVelocityY(velocity)
                break;
            case 4:
                npc.anims.play(prefix + 'turn')
                npc.setVelocityX(0)
                npc.setVelocityY(0)
                break;
        }
    }
}