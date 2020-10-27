window.onload = function () {
  new Squares().buildSquares();
};

class Squares {
  constructor(rows = 4, columns = 4, length = 50, gap = 3, appId = "app") {
    this.rows = rows;
    this.columns = columns;
    this.length = length;
    this.gap = gap;
    this.root = document.getElementById(appId);
    this.squaresWrapper = document.createElement("div");
    this.squares = document.createElement("div");

    this.addRowBtn = this.createBtn("addRow", "&plus;");
    this.addRowBtn.addEventListener("click", this.addRow.bind(this));
    this.addColBtn = this.createBtn("addColumn", "&plus;");
    this.addColBtn.addEventListener("click", this.addCol.bind(this));

    this.removeRowBtn = this.createBtn("removeRow", "&minus;");
    this.removeRowBtn.addEventListener("click", this.removeRow.bind(this));
    this.removeColBtn = this.createBtn("removeColumn", "&minus;");
    this.removeColBtn.addEventListener("click", this.removeCol.bind(this));

    this.squares.addEventListener("mouseover", event => {
      const target = event.target;
      if (target.className === "square") {
        if (this.columns > 1) {
          this.removeColBtn.style.left = `${target.offsetLeft}px`;
          this.removeColBtn.style.visibility = "visible";
        }
        if (this.rows > 1) {
          this.removeRowBtn.style.top = `${target.offsetTop}px`;
          this.removeRowBtn.style.visibility = "visible";
        }
      }
    });

    this.squares.addEventListener("mouseout", event => {
      const relatedTarget = event.relatedTarget;
      if (
        relatedTarget.className != "removeColumn" ||
        relatedTarget.className != "removeRow"
      ) {
        this.removeColBtn.style.visibility = "hidden";
        this.removeRowBtn.style.visibility = "hidden";
      }
    });

    document.addEventListener("mouseover", event => {
      const target = event.target;
      if (this.rows > 1 && this.columns > 1) {
        if (
          target.className === "removeRow" ||
          target.className === "removeColumn"
        ) {
          this.removeColBtn.style.visibility = "visible";
          this.removeRowBtn.style.visibility = "visible";
        }
      } else if (this.rows > 1 && this.columns == 1) {
        this.removeColBtn.style.visibility = "hidden";
        if (target.className === "removeRow") {
          this.removeRowBtn.style.visibility = "visible";
        }
      } else if (this.columns > 1 && this.rows == 1) {
        this.removeRowBtn.style.visibility = "hidden";
        if (target.className === "removeColumn") {
          this.removeColBtn.style.visibility = "visible";
        }
      }
    });

    document.addEventListener("mouseout", event => {
      const target = event.target;
      if (
        target.className === "removeRow" ||
        target.className === "removeColumn"
      ) {
        this.removeColBtn.style.visibility = "hidden";
        this.removeRowBtn.style.visibility = "hidden";
      }
    });
  }

  createBtn(className, content) {
    let btn = document.createElement("div");
    btn.className = className;
    btn.innerHTML = content;
    btn.style.width = this.length + "px";
    btn.style.height = this.length + "px";
    return btn;
  }

  createSquare() {
    let square = document.createElement("div");
    square.className = "square";
    square.style.width = this.length + "px";
    square.style.height = this.length + "px";
    return square;
  }

  addRow() {
    for (let i = 1; i <= this.columns; i++) {
      this.squares.append(this.createSquare());
    }
    this.rows++;
    this.squares.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
  }

  addCol() {
    for (let i = 1; i <= this.rows; i++) {
      this.squares.append(this.createSquare());
    }
    this.columns++;
    this.squares.style.gridTemplateColumns = `repeat(${this.columns}, 50px)`;
  }

  removeRow() {
    if (this.rows > 1) {
      this.rows--;
      this.removeRowBtn.style.visibility = "hidden";
      this.removeColBtn.style.visibility = "hidden";

      let offsetTop = this.removeRowBtn.offsetTop;
      let squares = [...document.querySelectorAll(".square")];
      let coll = squares.filter(square => square.offsetTop == offsetTop);

      if (this.removeRowBtn.offsetTop === squares.slice(-1)[0].offsetTop) {
        this.removeRowBtn.style.top = `${offsetTop - this.length - this.gap}px`;
      }
      coll.forEach(square => square.remove());
      this.squares.style.gridTemplateRows = `repeat(${this.rows}, ${this.length}px)`;
    }
  }

  removeCol() {
    if (this.columns > 1) {
      this.columns--;
      this.removeRowBtn.style.visibility = "hidden";
      this.removeColBtn.style.visibility = "hidden";

      let offsetLeft = this.removeColBtn.offsetLeft;
      let squares = [...document.querySelectorAll(".square")];
      let coll = squares.filter(square => square.offsetLeft == offsetLeft);
      if (this.removeColBtn.offsetLeft === squares.slice(-1)[0].offsetLeft) {
        this.removeColBtn.style.left = `${
          offsetLeft - this.length - this.gap
        }px`;
      }
      coll.forEach(square => square.remove());
      this.squares.style.gridTemplateColumns = `repeat(${this.columns}, ${this.length}px)`;
    }
  }

  buildSquares() {
    this.squaresWrapper.className = "squaresWrapper";

    for (let i = 1; i <= this.columns * this.rows; i++) {
      this.squares.append(this.createSquare());
    }

    this.squares.className = "squares";
    this.squares.style.gridTemplateColumns = `repeat(${this.columns}, ${this.length}px)`;
    this.squares.style.gridTemplateRows = `repeat(${this.rows}, ${this.length}px)`;
    this.squares.style.gridGap = `${this.gap}px`;

    this.squaresWrapper.append(this.squares);

    this.squares.after(this.addRowBtn, this.removeRowBtn);
    this.squares.before(this.addColBtn, this.removeColBtn);

    this.root.append(this.squaresWrapper);
  }
}
