class Board {
  constructor(width, deep, hight) {
    this.width = width;
    this.deep = deep;
    this.hight = hight;
    this.scale = 800 / (width * 2.5);
    this.board3D = new Array(width)
      .fill()
      .map(() => new Array(deep).fill().map(() => new Array(hight).fill(0)));
    this.drawPrincipalFloor();
  }
  drawPrincipalFloor() {
    for (let w = this.width - 1; w >= 0; w--) {
      for (let d = this.deep - 1; d >= 0; d--) {
        for (let h = 1 - 1; h >= 0; h--) {
          if (h == 0) this.board3D[w][d][h] = "-1";
        }
      }
    }
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

  
  draw() {
    for (let w = this.width - 1; w >= 0; w--) {
      for (let d = this.deep - 1; d >= 0; d--) {
        for (let h = this.hight ; h >= 0; h--) {
          let cellValue = this.board3D[w][d][h];
          if (cellValue) {
            push();
            translate(-width / 10, -height / 2, -width / 10); //ajuste para render al "centro"
            translate(w * this.scale, h * this.scale, d * this.scale);
            if (cellValue != "-1") {
              fill(this.getColor(cellValue));
            } else {
              fill(133,0,60);
              stroke(153);
            }
            box(this.scale);
            pop();
          }
        }
      }
    }
  }
  saveState(shape, position) {
    for (let w = 0; w < 4; w++) {
      for (let d = 0; d < 4; d++) {
        for (let h = 0; h < 4; h++) {
          if (shape[w][d][h] != 0)
            this.board3D[position.x + w][position.z + d][position.y + h] =
              shape[w][d][h];
        }
      }
    }
  }
  checkCollision(shape, newPositions) {
    for (let w = 0; w < 4; w++) {
      for (let d = 0; d < 4; d++) {
        for (let h = 0; h < 4; h++) {
          let w_aux = newPositions.x + w;
          let d_aux = newPositions.z + d;
          let h_aux = newPositions.y + h;
          if ((w_aux > this.width || d_aux > this.deep || h_aux < 1) && shape[w][d][h] != 0){
            //fuara de los limites, sin contar la ficha naciente
            return false;
          }
          //las partes de la ficha no toquen con otras 
          else if (shape[w][d][h] != 0 && this.board3D[w_aux][d_aux][h_aux]!=0 && this.board3D[w_aux][d_aux][h_aux]!=undefined){
            return false;
          }
          
        }
      }
    }
    return true;
  }
  getDimentions() {
    let dimentions = {
      width: this.width,
      hight: this.hight,
      deep: this.deep,
    };

    return dimentions;
  }
  getScale() {
    return this.scale;
  }
  async checkPoints() {
    let point = 0;
    for (let h = this.hight - 1; h > 0; h--) {
      let flag = true;
      for (let w = this.width - 1; w >= 0; w--) {
        for (let d = this.deep - 1; d >= 0; d--) {
          flag = true;
          if (this.board3D[w][d][h] == 0) {
            w = -1;
            d = -1;
            flag = false;
          }
        }
      }
      if (flag) {
        await this.deleteFloor(h);
        point += 1000;
      }
    }
    return point;
  }
  deleteFloor(to_delete) {
    for (let h = to_delete; h < this.hight - 1; h++) {
      for (let w = 0; w < this.width; w++) {
        for (let d = 0 - 1; d < this.deep; d++) {
          setTimeout(
            () => (this.board3D[w][d][h] = this.board3D[w][d][h + 1]),
            d * 50
          );
        }
      }
    }
    this.board3D[this.width - 1][this.deep - 1][this.hight - 1] = 0;
  }

  drawTestFloor(h) {
    for (let w = this.width - 1; w >= 0; w--) {
      for (let d = this.deep - 1; d >= 0; d--) {
        this.board3D[w][d][h] = 3;
      }
    }
  }
}