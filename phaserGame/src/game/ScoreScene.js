import { Scene } from "phaser";

export class ScoreScene extends Scene {
  constructor() {
    super({ key: "ScoreScene" });
  }

  init(data) {
    this.finalScore = data.score;
  }

  preload() {
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Creates the score scene displaying the final score, rank, and game over texts.
 * Sets game dimensions based on screen size and calculates score rank.
 * Adds score, rank, and game over texts to the screen along with a restart prompt.
 * Animates the restart text with a pulsing effect and sets up a pointerdown
 * event to restart the game by transitioning to the PlayScene.
 */
/******  906e5375-a1e9-4351-a393-2a00326a69ce  *******/    // Cargar la imagen de fondo
    this.load.image("background", "assets/fondo.jpg"); // Asegúrate de que el archivo esté en la ruta correcta.
  }

  create() {
    // Establecer las dimensiones de la pantalla
    this.screenWidth = this.scale.width;
    this.screenHeight = this.scale.height;
    this.screenCenterX = this.screenWidth / 2;

    // Cambiar el fondo de la escena
    this.add.image(0, 0, "background")  // Usamos la imagen cargada "background".
      .setOrigin(0, 0)  // Establece el origen en la esquina superior izquierda.
      .setDisplaySize(this.screenWidth, this.screenHeight)  // Ajusta el tamaño al de la pantalla.
      .setDepth(-1);  // Coloca el fondo detrás de otros elementos.

    // Calcula el rango basado en la puntuación
    this.scoreRank = this.finalScore > 500 ? 'A: Prime Protocol!' : 
                     this.finalScore > 300 ? 'B: Efficient Engine' : 
                     this.finalScore > 100 ? 'C: Routine Maintenance' : 
                     'F: Gears Jammed';

    // Texto de puntuación final
    this.scoreText = this.add.text(this.screenCenterX, this.screenHeight / 2 - 100, 'Score: ' + this.finalScore, { 
      fontSize: '20px', 
      fill: 'green' 
    }).setOrigin(0.5, 0.5);

    // Texto de rango
    this.rankText = this.add.text(this.screenCenterX, this.screenHeight / 2 - 50, 'Rank ' + this.scoreRank, { 
      fontSize: '20px', 
      fill: '#ffffff' 
    }).setOrigin(0.5, 0.5);

    // Texto de "Game Over"
    this.gameOverText = this.add.text(this.screenCenterX, this.screenHeight / 2, "Game Over", {
      fontSize: "32px",
      fill: "red",
    }).setOrigin(0.5, 0.5);

    // Texto de "Tap to Restart"
    this.restartText = this.add.text(this.screenCenterX, this.screenHeight / 3 + 200, "Tap to restart", {
      fontSize: "15px",
      fill: "#ffffff",
    }).setOrigin(0.5, 0.5);

    // Animación de pulso para el texto de reinicio
    this.tweens.add({
      targets: this.restartText,
      scaleX: 1.5, // Escala al 150% de su tamaño original
      scaleY: 1.5,
      duration: 1000, // Duración de un pulso
      ease: "Sine.easeInOut", // Suaviza la animación
      yoyo: true, // Reversa la animación, creando el efecto de "pulso"
      repeat: -1, // Repite indefinidamente
    });

    // Agregar un manejador de eventos para reiniciar el juego
    this.input.once("pointerdown", () => {
      this.scene.stop("ScoreScene");
      this.scene.start("PlayScene");
    });
  }
}
