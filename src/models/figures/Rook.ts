import { Cell } from "./../Cell";
import { Colors } from "./../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from "../../assets/black-rook.png";
import whitelogo from "../../assets/white-rook.png";
export class Rook extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
		this.name = FigureNames.ROOK;
	}
	canMove(target: Cell): boolean {
		// если родительский класс возвращает false, то мы тоже не ебемся
		if (!super.canMove(target)) return false;
		if (this.cell.isEmptyVert(target)) return true;
		if (this.cell.isEmptyHorizontal(target)) return true;
		return false;
	}
}
