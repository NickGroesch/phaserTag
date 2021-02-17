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
var myDude;
var platforms;
var cursors;


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

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    myDude = this.physics.add.sprite(100, 450, 'dude');

    myDude.setBounce(0.2);
    myDude.setCollideWorldBounds(true);

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

    this.physics.add.collider(myDude, platforms);
    this.physics.add.overlap(myDude, stars, collectStar, null, this);


    cursors = this.input.keyboard.createCursorKeys();

}

function update() {
    if (cursors.left.isDown) {
        myDude.setVelocityX(-160);
        myDude.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        myDude.setVelocityX(160);
        myDude.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        myDude.setVelocityY(-160);
        //player.anims.play('right', true);
    }
    else if (cursors.down.isDown) {
        myDude.setVelocityY(160);
        //player.anims.play('right', true);
    }
    else {
        myDude.setVelocityX(0);
        myDude.setVelocityY(0);

        myDude.anims.play('turn');
    }
    function tag(player, star) {
        score += 10;
        scoreText.setText('Score: ' + score);
    }
}