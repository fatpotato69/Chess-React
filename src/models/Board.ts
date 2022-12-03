import { Figure } from "./figures/Figure";
import { Rook } from "./figures/Rook";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Colors } from "./Colors";
import { Cell } from "./Cell";

export class Board {
	// инициализация ячеек шахматной доски через двумерный массив
	cells: Cell[][] = [];
	lostBlackFigures: Figure[] = [];
	lostWhiteFigures: Figure[] = [];
	private boardSize = 8;
	public initCells() {
		// пробегаемся по всем стоблцам
		for (let i = 0; i < this.boardSize; i++) {
			const row: Cell[] = [];
			// а затем по всем ячейкам этого столбца
			for (let j = 0; j < this.boardSize; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null)); // черные ячейки
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null)); // белые ячейки
				}
			}

			this.cells.push(row);
		}
	}
	// просто делаем копию доски и возвращаем ее, чтобы реакт перерендерил доску
	public getCopyBoard(): Board {
		const newBoard = new Board();
		newBoard.cells = this.cells;

		newBoard.lostWhiteFigures = this.lostWhiteFigures;
		newBoard.lostBlackFigures = this.lostBlackFigures;
		return newBoard;
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}
	// двумерным циклом пробегаемся по доске, получая в каждой строке потенциальную ячейку для хода, и проверяем это через метод canMove, передавая текущую ячейку
	public hightlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < 8; i++) {
			const row = this.cells[i];

			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.available = !!selectedCell?.figure?.canMove(target);
				// явное преобразования в boolean чтобы ts не ругался
			}
		}
	} // сделать for each?
	/**
	  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target)
      }
    }
  }
	 */
	private addPawns() {
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.BLACK, this.getCell(i, 1));
			new Pawn(Colors.WHITE, this.getCell(i, 6));
		}
	}
	private addKings() {
		new King(Colors.BLACK, this.getCell(4, 0));
		new King(Colors.WHITE, this.getCell(4, 7));
	}
	private addBishops() {
		new Bishop(Colors.BLACK, this.getCell(2, 0));
		new Bishop(Colors.WHITE, this.getCell(2, 7));
		new Bishop(Colors.BLACK, this.getCell(5, 0));
		new Bishop(Colors.WHITE, this.getCell(5, 7));
	}
	private addQueens() {
		new Queen(Colors.BLACK, this.getCell(3, 0));
		new Queen(Colors.WHITE, this.getCell(3, 7));
	}
	private addKnights() {
		new Knight(Colors.BLACK, this.getCell(1, 0));
		new Knight(Colors.WHITE, this.getCell(1, 7));
		new Knight(Colors.BLACK, this.getCell(6, 0));
		new Knight(Colors.WHITE, this.getCell(6, 7));
	}
	private addRooks() {
		new Rook(Colors.BLACK, this.getCell(0, 0));
		new Rook(Colors.WHITE, this.getCell(7, 7));
		new Rook(Colors.BLACK, this.getCell(7, 0));
		new Rook(Colors.WHITE, this.getCell(0, 7));
	}
	public addFigures() {
		this.addPawns();
		this.addBishops();
		this.addKings();
		this.addKnights();
		this.addQueens();
		this.addRooks();
	}
}
