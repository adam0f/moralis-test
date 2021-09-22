import { getGameHeight, getGameWidth } from 'game/helpers'


interface Props {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  frame?: number;
}

export class Player extends Phaser.GameObjects.Sprite {
  private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
  private leftKey: Phaser.Input.Keyboard.Key
  private rightKey: Phaser.Input.Keyboard.Key
  private jumpKey: Phaser.Input.Keyboard.Key
  public traits?: Array<number>
  public speed = 200;

  constructor({ scene, x, y, key }: Props) {
    super(scene, x, y, key);

    // sprite
    this.setOrigin(0, 0);
    this.displayWidth = getGameWidth(this.scene) * 0.09
    this.displayHeight = getGameWidth(this.scene) * 0.09

    // Add animations
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [1] }),
      frameRate: 2,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 2 ]}),
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 4 ]}),
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers(key || '', { frames: [ 0 ]}),
    });

    // physics
    this.scene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).setGravityY(getGameHeight(this.scene) * 1.8);
    (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    (this.body as Phaser.Physics.Arcade.Body).setSize(getGameWidth(this.scene) * 0.09, getGameWidth(this.scene) * 0.09)   

    // input
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    this.jumpKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.scene.add.existing(this);
  }

  update(): void {
    if (this.leftKey?.isDown || this.cursorKeys?.left.isDown) 
    {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-getGameWidth(this.scene) * 0.5);
      this.anims.play('left', true);
    }
    else if (this.rightKey?.isDown || this.cursorKeys?.right.isDown)
    {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(getGameWidth(this.scene) * 0.5);
      this.anims.play('right', true);
    }
    else 
    {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
      this.anims.play('idle', true);
    }
  
    if ((this.jumpKey?.isDown || this.cursorKeys?.up.isDown || this.cursorKeys?.space.isDown) && (this.body as Phaser.Physics.Arcade.Body).touching.down)
    {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-getGameHeight(this.scene) * 1);
      this.anims.play('Jump');
    }
  }
  //   // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
  //   const velocity = new Phaser.Math.Vector2(0, 0);
  //   // Horizontal movement
  //   switch (true) {
  //     case this.cursorKeys?.left.isDown:
  //       velocity.x -= 1;
  //       this.anims.play('left', true);
  //       break;
  //     case this.cursorKeys?.right.isDown:
  //       velocity.x += 1;
  //       this.anims.play('right', true);
  //       break;
  //   }

  //   // Vertical movement
  //   switch (true) {
  //     case this.cursorKeys?.down.isDown:
  //       velocity.y += 1;
  //       this.anims.play('idle', false);
  //       break;
  //     case this.cursorKeys?.up.isDown:
  //       velocity.y -= 1;
  //       this.anims.play('up', true);
  //       break;
  //   }

  //   // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
  //   const normalizedVelocity = velocity.normalize();
  //   (this.body as Phaser.Physics.Arcade.Body).setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  // }
}
