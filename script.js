window.onload = function () {
  new Squares();
};

class Squares {
  constructor(rows = 4, columns = 4, size = 50, appId = "app") {
    this.rows = rows;
    this.columns = columns;
    this.size = size;
    this.root = document.getElementById(appId);
    this.squaresWrapper = document.createElement("div");
    this.squares = document.createElement("table");

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
          this.removeColBtn.style.left = target.offsetLeft + "px";
          this.removeColBtn.style.display = "block";
        }
        if (this.rows > 1) {
          this.removeRowBtn.style.top = target.offsetTop + "px";
          this.removeRowBtn.style.display = "block";
        }
      }
    });

    this.squares.addEventListener("mouseleave", event => {
      const relatedTarget = event.relatedTarget;
      if (
        relatedTarget.className !== "removeColumn" ||
        relatedTarget.className !== "removeRow"
      ) {
        this.removeColBtn.style.display = "none";
        this.removeRowBtn.style.display = "none";
      }
    });

    document.addEventListener("mouseover", event => {
      const target = event.target;
      if (this.rows > 1 && this.columns > 1) {
        if (
          target.className === "removeRow" ||
          target.className === "removeColumn"
        ) {
          this.removeColBtn.style.display = this.removeRowBtn.style.display =
            "block";
        }
      } else if (this.rows > 1 && this.columns == 1) {
        this.removeColBtn.style.display = "none";
        if (target.className === "removeRow") {
          this.removeRowBtn.style.display = "block";
        }
      } else if (this.columns > 1 && this.rows == 1) {
        this.removeRowBtn.style.display = "none";
        if (target.className === "removeColumn") {
          this.removeColBtn.style.display = "block";
        }
      }
    });

    document.addEventListener("mouseout", event => {
      const target = event.target;
      if (
        target.className === "removeRow" ||
        target.className === "removeColumn"
      ) {
        this.removeColBtn.style.display = this.removeRowBtn.style.display =
          "none";
      }
    });

    for (let i = 1; i <= this.rows; i++) {
      this.squares.append(this.createRowWithSquares());
    }
    this.squares.className = "squares";

    this.squaresWrapper.className = "squaresWrapper";
    this.squaresWrapper.append(this.squares);

    this.squares.after(
      this.addRowBtn,
      this.addColBtn,
      this.removeRowBtn,
      this.removeColBtn
    );

    this.root.append(this.squaresWrapper);
  }

  createBtn(className, content) {
    const btn = document.createElement("div");
    btn.className = className;
    btn.innerHTML = content;
    btn.style.width = btn.style.height = btn.style.lineHeight =
      this.size + "px";
    btn.style.textAlign = "center";
    return btn;
  }

  createRowWithSquares() {
    const row = document.createElement("tr");
    for (let i = 1; i <= this.columns; i++) {
      row.append(document.createElement("td"));
    }
    return row;
  }

  createSquare() {
    const square = document.createElement("td");
    square.className = "square";
    square.style.width = square.style.height = this.size + "px";
    return square;
  }

  addRow() {
    this.rows++;
    this.squares.append(this.createRowWithSquares());
  }

  addCol() {
    this.columns++;
    [...this.squares.children].forEach(row => row.append(this.createSquare()));
  }

  removeRow() {
    if (this.rows > 1) {
      const offsetTop = this.removeRowBtn.offsetTop;
      const squares = [...document.querySelectorAll(".square")].slice(
        -this.columns
      );

      this.removeRowBtn.style.display = "none";
      this.rows--;
      squares.forEach(square => square.remove());
      this.squares.style.gridTemplateRows = `repeat(${this.rows}, ${this.size}px)`;
    }
  }

  removeCol() {
    if (this.columns > 1) {
      const offsetLeft = this.removeColBtn.offsetLeft;
      this.removeColBtn.style.display = "none";

      let squares = [...document.querySelectorAll(".square")];
      let coll = squares.filter((square, i) => (i + 1) % this.columns === 0);
      if (offsetLeft === squares.slice(-1)[0].offsetLeft) {
        this.removeColBtn.style.left = offsetLeft - this.size - this.gap + "px";
      }
      this.columns--;
      coll.forEach(square => square.remove());
      this.squares.style.gridTemplateColumns = `repeat(${this.columns}, ${this.size}px)`;
    }
  }
}
