import { Scene } from "phaser";

export class PlayScene extends Scene {
  constructor() {
    super({ key: "PlayScene" });
  }

  preload() {
    // Carga de imágenes
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("mushroom", "assets/mushroom.jpg"); // Imagen del hongo
    this.load.image("platform", "assets/platform.png");
    this.load.image("leftArrow", "assets/leftarrow.png");
    this.load.image("rightArrow", "assets/rightarrow.png");
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // Configuración básica
    this.screenWidth = this.scale.width;
    this.screenHeight = this.scale.height;
    this.screenCenterX = this.screenWidth / 2;
    this.controlsAreaHeight = this.screenHeight * 0.2;
    this.gameAreaHeight = this.screenHeight - this.controlsAreaHeight;

    // Escala del hongo
    const starSize = this.textures.get("star").getSourceImage().width; // Tamaño de la estrella
    this.mushroomScale = starSize / this.textures.get("mushroom").getSourceImage().width;

    // Jugador, plataforma y controles
    this.platform = this.physics
      .add.staticImage(0, this.gameAreaHeight, "platform")
      .setOrigin(0, 0)
      .refreshBody();
    this.player = this.physics.add.sprite(
      this.screenCenterX,
      this.gameAreaHeight - 24,
      "player"
    );
    this.leftArrow = this.add
      .image(this.screenWidth * 0.1, this.gameAreaHeight + 40, "leftArrow")
      .setOrigin(0, 0)
      .setInteractive();
    this.rightArrow = this.add
      .image(this.screenWidth * 0.7, this.gameAreaHeight + 40, "rightArrow")
      .setOrigin(0, 0)
      .setInteractive();

    // Animaciones del jugador
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 4 }],
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Física del jugador
    this.player.body.setGravityY(300);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platform);

    // Controles
    this.moveLeft = false;
    this.moveRight = false;

    // Detectar las flechas para mover al jugador
    this.leftArrow.on("pointerdown", () => {
      this.moveLeft = true;
    });
    this.leftArrow.on("pointerup", () => {
      this.moveLeft = false;
    });

    this.rightArrow.on("pointerdown", () => {
      this.moveRight = true;
    });
    this.rightArrow.on("pointerup", () => {
      this.moveRight = false;
    });

    // Estrellas
    this.stars = this.physics.add.group({ gravityY: 300 });
    const createStar = () => {
      const x = Math.random() * this.screenWidth;
      this.stars.create(x, 0, "star");
    };
    const createStarLoop = this.time.addEvent({
      delay: 1000,
      callback: createStar,
      callbackScope: this,
      loop: true,
    });

    // Bombas
    this.bombs = this.physics.add.group({ gravityY: 900 });
    let bombDelay = 5000;
    const createBomb = () => {
      const x = Math.random() * this.screenWidth;
      const bomb = this.bombs.create(x, 0, "bomb");
      bomb.setScale(2).refreshBody();
    };
    const createBombLoop = this.time.addEvent({
      delay: bombDelay,
      callback: createBomb,
      callbackScope: this,
      loop: true,
    });

    // Hongos
    this.mushrooms = this.physics.add.group({ gravityY: 300 });
    const createMushroom = () => {
      const x = Math.random() * this.screenWidth;
      const mushroom = this.mushrooms.create(x, 0, "mushroom");
      mushroom.setScale(this.mushroomScale).refreshBody(); // Ajuste de tamaño dinámico
    };
    this.time.addEvent({
      delay: 5000,
      callback: createMushroom,
      callbackScope: this,
      loop: true,
    });

    // Colisiones y superposiciones
    this.physics.add.collider(this.stars, this.platform, (obj1, obj2) => {
      const star = obj1.key === "star" ? obj1 : obj2;
      star.destroy();
    });
    this.physics.add.collider(this.bombs, this.platform, (obj1, obj2) => {
      const bomb = obj1.key === "bomb" ? obj1 : obj2;
      bomb.destroy();
    });
    this.physics.add.collider(this.mushrooms, this.platform, (obj1, obj2) => {
      const mushroom = obj1.key === "mushroom" ? obj1 : obj2;
      mushroom.destroy();
    });

    this.score = 0;
    this.scoreText = this.add
      .text(this.screenCenterX, this.gameAreaHeight + 16, "Score: 0", {
        fontSize: "16px",
        fill: "#000",
      })
      .setOrigin(0.5, 0.5);

    this.physics.add.overlap(
      this.player,
      this.stars,
      (player, star) => {
        star.destroy();
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.mushrooms,
      (player, mushroom) => {
        mushroom.destroy();
        this.score += 20;
        this.scoreText.setText("Score: " + this.score);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.bombs,
      (player, bomb) => {
        bomb.destroy();
        createStarLoop.destroy();
        createBombLoop.destroy();
        this.physics.pause();
        const gameEndEvent = new CustomEvent("gameEnded", {
          detail: { score: this.score },
        });
        window.dispatchEvent(gameEndEvent);
        this.scene.stop("PlayScene");
        this.scene.start("ScoreScene", { score: this.score });
      },
      null,
      this
    );
  }

  update() {
    // Movimiento del jugador
    if (this.moveLeft && !this.moveRight) {
      this.player.setVelocityX(-200); // Movimiento hacia la izquierda
      this.player.anims.play("left", true);
    } else if (this.moveRight && !this.moveLeft) {
      this.player.setVelocityX(200); // Movimiento hacia la derecha
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0); // Detener movimiento horizontal
      this.player.anims.play("turn");
    }
  }
}
