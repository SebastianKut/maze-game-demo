class HowtoComponent {
  constructor(game) {}

  create() {
    this.buttonContinue = this.add.button(
      0,
      0,
      'screen-howtoplay',
      this.startGame,
      this
    );
  }

  startGame() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener(
              'deviceorientation',
              this.handleOrientation,
              true
            );
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
      console.log('Non IOS device');
      window.addEventListener(
        'deviceorientation',
        this.handleOrientation,
        true
      );
    }

    this.game.state.start('Game');
  }

  handleOrientation(e) {
    // Device Orientation API
    var x = e.gamma; // range [-90,90], left-right
    var y = e.beta; // range [-180,180], top-bottom
    var z = e.alpha; // range [0,360], up-down
    Ball._player.body.velocity.x += x;
    Ball._player.body.velocity.y += y * 0.5;
  }
}

Ball.Howto = HowtoComponent;
