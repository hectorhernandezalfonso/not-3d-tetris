class Shape {
  constructor(boardDimentions, scale) {
    //this.shape
    this.width = boardDimentions.width;
    this.deep = boardDimentions.deep;
    this.hight = boardDimentions.hight;
    this.position = {
      x: this.width >= 8 ? int(this.width / 2) : 0,
      y: this.hight + 1,
      z: int(this.width / 2),
    };
    this.scale = scale;
    this.collition = false;
    this.color = (224, 242, 0);
    this.shape = undefined;
  }

  getPosition() {
    return this.position;
  }

  getColor(idShape) {
    const colors = {
      0: color(0, 0, 0, 0),       // Transparent or no color
      1: color(240, 144, 0),      // Orange (L-Shape)
      2: color(255, 247, 0),      // Yellow (O-Shape)
      3: color(0, 255, 255),      // Cyan (I-Shape)
      4: color(0, 34, 255),       // Blue (J-Shape)
      5: color(255, 0, 255),       // purple (T-Shape)
      6: color(255, 0, 0),        // Red (S-Shape)
      7: color(0, 255, 26),      // green (Z-Shape)
    };
    return colors[idShape];
  }
  generateRamdonShape() {
    const shapes = {
      0: this.shape_0,
      1: this.shape_1,
      2: this.shape_2,
      3: this.shape_3,
      4: this.shape_4,
      5: this.shape_5,
      6: this.shape_6,
      7: this.shape_7,
      8: this.shape_8,
      9: this.shape_9,
    };
    //SI SE CAMBIA EL * 7 POR UN * 5 FUNCIONA SIN LAS FICHAS 
    //S Y Z PERFECTAMENTE, ARREGLAR PRIMERO TODO MENOS PIEZAS
    // S
    const selectorShape = Math.floor(Math.random() * 7) + 1; // Selects a number between 1 and 7
    this.color = this.getColor(selectorShape);
    this.shape = shapes[selectorShape]();
  }
  draw() {
    if (this.shape) {
      for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
          for (let h = 0; h < 4; h++) {
            if (this.shape[w][d][h] != 0) {
              push();
              translate(-width / 10, -height / 2, -width / 10); //ajuste para render al "centro"
              translate(
                (this.position.x + w) * this.scale,
                (this.position.y + h) * this.scale,
                (this.position.z + d) * this.scale
              );
              fill(this.color);
              box(this.scale);
              pop();
            }
          }
        }
      }
    }
  }
  moveDown() {
    let nextPosition = this.position.y - 1;
    if (nextPosition >= -3) this.position.y = nextPosition;
  }
  moveRight() {
    let nextPosition = this.position.x + 1;
    if (nextPosition < this.width) this.position.x = nextPosition;
  }
  moveLeft() {
    let nextPosition = this.position.x - 1;
    if (nextPosition >= 0) this.position.x = nextPosition;
  }
  moveFront() {
    let nextPosition = this.position.z + 1;
    if (nextPosition < this.deep) this.position.z = nextPosition;
  }
  moveBack() {
    let nextPosition = this.position.z - 1;
    if (nextPosition >= 0) this.position.z = nextPosition;
  }
  reset() {
    this.position = {
      x: this.width >= 8 ? int(this.width / 2) : 0,
      y: this.hight + 1,
      z: int(this.width / 2),
    };
    this.collition = false;
    this.color = "white";
    this.shape = undefined;
  }

  rotateY() {
    if (this.shape) {
      const real_shape = this.shape;
      let aux_shape = new Array(4)
        .fill()
        .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));
      for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
          for (let h = 0; h < 4; h++) {
            aux_shape[w][d][h] = real_shape[d][w][h];
          }
        }
      }
      return aux_shape;
    }
  }
  /*rotateY(direction) {
    const real_shape = this.shape;
    if (this.shape) {
        let result = new Array(4)
            .fill()
            .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

        for (let w = 0; w < 4; w++) {
            for (let d = 0; d < 4; d++) {
                for (let h = 0; h < 4; h++) {
                    if (direction == "right") result[d][3 - w][h] = real_shape[w][d][h];
                    else result[3 - d][w][h] = real_shape[w][d][h];
                }
            }
        }

        // Check if the rotated shape is within the boundaries of the board
        if (this.isValidPosition(result, this.position)) {
            return result;
        }
    }
    return real_shape;
}*/

isValidPosition(shape, position) {
    for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
            for (let h = 0; h < 4; h++) {
                if (shape[w][d][h] != 0) {
                    let newW = position.x + w;
                    let newD = position.z + d;
                    let newH = position.y + h;
                    if (newW < 0 || newW >= this.width || newD < 0 || newD >= this.deep || newH < 0 || newH >= this.hight) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}


  rotateZ(direction) {
    const real_shape = this.shape;
    if (this.shape) {
      let result = new Array(4)
        .fill()
        .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

      for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
          for (let h = 0; h < 4; h++) {
            if (direction == "up") result[3-h][d][w] = real_shape[w][d][h];
            else result[h][d][3-w] = real_shape[w][d][h];
          }
        }
      }
      return result;
    }
    return real_shape;
  }


  /*rotateZ() {
    if (this.shape) {
      const real_shape = this.shape;
      let aux_shape = new Array(4)
        .fill()
        .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));
      for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
          for (let h = 0; h < 4; h++) {
            aux_shape[w][d][h] = real_shape[h][d][w];
          }
        }
      }
      return aux_shape;
    }
  }*/


  rotateX(direction) {
    const real_shape = this.shape;
    if (this.shape) {
      let result = new Array(4)
        .fill()
        .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

      for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
          for (let h = 0; h < 4; h++) {
            if (direction == "up") result[w][3-h][d] = real_shape[w][d][h];
            else result[w][h][3-d] = real_shape[w][d][h];
          }
        }
      }
      return result;
    }
    return real_shape;
  }

  
  rotateZ(direction) {
    const real_shape = this.shape;
    if (this.shape) {
      let result = new Array(4)
        .fill()
        .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

      for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
          for (let h = 0; h < 4; h++) {
            if (direction == "up") result[3-h][d][w] = real_shape[w][d][h];
            else result[h][d][3-w] = real_shape[w][d][h];
          }
        }
      }
      return result;
    }
    return real_shape;
  }
  rotateX(direction) {
    const real_shape = this.shape;
    if (this.shape) {
      let result = new Array(4)
        .fill()
        .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

      for (let w = 0; w < 4; w++) {
        for (let d = 0; d < 4; d++) {
          for (let h = 0; h < 4; h++) {
            if (direction == "up") result[w][3-h][d] = real_shape[w][d][h];
            else result[w][h][3-d] = real_shape[w][d][h];
          }
        }
      }
      return result;
    }
    return real_shape;
  }


  // PIEZA L
  shape_1() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let i = 0; i < 3; i++) {
      newShape[i][0][0] = 1;
      if (i == 2) newShape[i][0][1] = 1;
    }

    return newShape;
  }

  //PIEZA O
  shape_2() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let w = 0; w < 2; w++) {
      for (let d = 0; d < 2; d++) {
        for (let h = 0; h < 2; h++) {
          newShape[w][d][h] = 2;
        }
      }
    }

    return newShape;
  }

  //PIEZA I 
  shape_3() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let i = 0; i < 4; i++) {
      newShape[i][0][0] = 3;
    }

    return newShape;
  }

  // PIEZA J
  shape_4() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let i = 0; i < 3; i++) {
      newShape[i][0][1] = 4;
      if (i == 2) newShape[i][0][0] = 4;
    }

    return newShape;
  }

  // PIEZA T
  shape_5() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let i = 0; i < 3; i++) {
      newShape[i][0][0] = 5;
      if (i == 1) newShape[i][0][1] = 5;
    }

    return newShape;
  }

  // PIEZA S
  shape_6() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    newShape[0][0][0] = 6;
    newShape[1][0][0] = 6;
    newShape[1][0][1] = 6;
    newShape[2][0][1] = 6;

    return newShape;
  }
  //PIEZA Z
  shape_7() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    newShape[0][0][1] = 7;
    newShape[1][0][1] = 7;
    newShape[1][0][0] = 7;
    newShape[2][0][0] = 7;

    return newShape;
  }

  // PIEZA S2
  shape_8() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let i = 0; i < 3; i++) {
      newShape[i][0][0] = 8;
      if (i == 2) newShape[i][0][1] = 8;
    }

    return newShape;
  }

  //PIEZA Z
  shape_9() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let i = 0; i < 3; i++) {
      newShape[i][0][0] = 8;
      if (i == 2) newShape[i][0][1] = 8;
    }

    return newShape;
  }
  shape_0() {
    let newShape = new Array(4)
      .fill()
      .map(() => new Array(4).fill().map(() => new Array(4).fill(0)));

    for (let i = 0; i < 3; i++) {
      newShape[i][0][0] = 8;
      if (i == 2) newShape[i][0][1] = 8;
    }

    return newShape;
  }
}
