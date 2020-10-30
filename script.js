window.onload = function () {
  new Squares();
};

class Squares {
  constructor(rows = 4, columns = 4, appId = "app") {
    this.rows = rows;
    this.columns = columns;
    this.targetCell = null;
    this.root = document.getElementById(appId);
    this.squaresWrapper = document.createElement("div");
    this.squares = document.createElement("table");

    this.addRowBtn = this.createBtn("addRow", "&plus;");
    this.addColBtn = this.createBtn("addColumn", "&plus;");
    this.addRowBtn.onclick = this.addRow.bind(this);
    this.addColBtn.onclick = this.addCol.bind(this);

    this.removeRowBtn = this.createBtn("removeRow", "&minus;");
    this.removeColBtn = this.createBtn("removeColumn", "&minus;");
    this.removeRowBtn.onclick = this.removeRow.bind(this);
    this.removeColBtn.onclick = this.removeCol.bind(this);
    this.removeRowBtn.onmouseleave = () =>
      this.removeRowBtn.classList.remove("fullOpacity");
    this.removeColBtn.onmouseleave = () =>
      this.removeColBtn.classList.remove("fullOpacity");

    this.squares.onmouseover = event => {
      const target = event.target;
      if (target.tagName === "TD") {
        this.removeColBtn.style.left = target.offsetLeft + 2 + "px";
        this.columns > 1
          ? this.removeColBtn.classList.add("fullOpacity")
          : null;

        this.removeRowBtn.style.top = target.offsetTop + 2 + "px";
        this.rows > 1 ? this.removeRowBtn.classList.add("fullOpacity") : null;

        this.targetCell = target;
      }
    };

    this.squares.onmouseleave = event => {
      const relatedTarget = event.relatedTarget;
      if (relatedTarget === this.removeColBtn) {
        this.removeRowBtn.classList.remove("fullOpacity");
      } else if (relatedTarget === this.removeRowBtn) {
        this.removeColBtn.classList.remove("fullOpacity");
      } else {
        this.removeColBtn.classList.remove("fullOpacity");
        this.removeRowBtn.classList.remove("fullOpacity");
      }
    };

    // Populate table with rows and cells
    for (let i = 1; i <= this.rows; i++) {
      this.squares.append(this.createRowWithSquares());
    }

    this.squaresWrapper.className = "squaresWrapper";
    this.squaresWrapper.append(
      this.squares,
      this.addRowBtn,
      this.addColBtn,
      this.removeRowBtn,
      this.removeColBtn
    );

    // "mount" Sqaures
    this.root.append(this.squaresWrapper);
  }

  createBtn(className, content) {
    const btn = document.createElement("div");
    btn.className = className;
    btn.innerHTML = content;
    return btn;
  }

  createSquare() {
    const square = document.createElement("td");
    return square;
  }

  createRowWithSquares() {
    const row = document.createElement("tr");
    for (let i = 1; i <= this.columns; i++) {
      row.append(this.createSquare());
    }
    return row;
  }

  addRow() {
    this.squares.append(this.createRowWithSquares());
    this.rows++;
  }

  addCol() {
    [...this.squares.children].forEach(row => row.append(this.createSquare()));
    this.columns++;
  }

  removeRow() {
    this.removeRowBtn.classList.remove("fullOpacity");
    this.targetCell.parentNode.remove();
    this.rows--;
  }

  removeCol() {
    this.removeColBtn.classList.remove("fullOpacity");
    const siblings = [...this.targetCell.parentNode.children];
    const index = siblings.indexOf(this.targetCell);

    [...this.squares.children].forEach(row =>
      [...row.children][index].remove()
    );
    this.columns--;
  }
}
