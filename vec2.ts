export default class Vec2 {
	public readonly x: number = 0;
	public readonly y: number = 0;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	//================================ Math operations ================================

	/**
	* Add two vectors - element wise
	**/
	add(other: Vec2) {
		return new Vec2(this.x + other.x, this.y + other.y);
	}

	/**
	* Subtract the other vector from the current vector - element wise
	**/
	subtract(other: Vec2) {
		return new Vec2(this.x - other.x, this.y - other.y);
	}

	/**
	* Scalar multiply the vector with a scalar
	**/
	multiply(value: number) {
		return new Vec2(this.x * value, this.y * value);
	}

	/**
	* Dot product of two vectors
	**/
	dot(other: Vec2) {
		return this.x * other.x + this.y * other.y;
	}

	/**
	*	Get magnitude of the current vector
	**/
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	* Scalar divide the vector by a number
	**/
	divide(other: number) {
		if (!other) throw new Error("Cannot divide by zero");
		return new Vec2(this.x / other, this.y / other);
	}

	/**
	* Distance between two vectors
	**/
	distance(other: Vec2) {
		return this.subtract(other).magnitude();
	}

	/**
	*	Equivalent to multiply the current vector by -1
	**/
	invert() {
		return new Vec2(-this.x, -this.y);
	}

	/**
	*	Get the clockwise perpendicular vector
	**/
	perpendicular() {
		return new Vec2(this.y, -this.x);
	}

	/**
	*	Normalize the vector
	*	@return Vec2 - a unit of the original vector
	**/
	normalize() {
		return this.divide(this.magnitude());
	}

	absolute(): Vec2 {
		return new Vec2(Math.abs(this.x), Math.abs(this.y));
	}

	/**
	* @return number - angle between vector and the x axis
	**/
	angle(): number {
		return Math.atan2(this.y, this.x);
	}

	//================================ Conveniences ================================

	/**
	*	Whether this point is inside a bounding box
	*	@param Vec2 lower - lower bound of the bounding box
	*	@param Vec2 upper - upper bound of the bounding box
	**/
	isInBoundingBox(lower: Vec2, upper: Vec2) {
		return this.x >= lower.x &&
			this.x <= upper.x &&
			this.y >= lower.y &&
			this.y <= upper.y;
	}

	/**
	*	@return [x, y]
	**/
	toArray() {
		return [this.x, this.y];
	}

	/**
	*	Create a copy of the original vector. Preventing JavaScript object reference
	**/
	copy() {
		return new Vec2(this.x, this.y);
	}

	//================================ Four Direction Translation ================================

	/**
	*	Moved to the right by "unit"
	**/
	right(unit: number = 1) {
		return this.add(new Vec2(unit, 0));
	}

	/**
	*	Moved to the left by "unit"
	**/
	left(unit: number = 1) {
		return this.add(new Vec2(-unit, 0));
	}

	/**
	*	Moved up by "unit"
	**/
	up(unit: number = 1) {
		return this.add(new Vec2(0, -unit));
	}

	/**
	*	Moved the vector down by "unit"
	**/
	down(unit: number = 1) {
		return this.add(new Vec2(0, unit));
	}

	/**
	*	Create a vector moved to the right by "unit"
	**/
	static right(unit: number = 1) {
		return new Vec2(unit, 0);
	}

	/**
	*	Create a vector moved to the left by "unit"
	**/
	static left(unit: number = 1) {
		return new Vec2(-unit, 0);
	}

	/**
	*	Create a vector moved up by "unit"
	**/
	static up(unit: number = 1) {
		return new Vec2(0, -unit);
	}

	/**
	*	Create a vector moved down by "unit"
	**/
	static down(unit: number = 1) {
		return new Vec2(0, unit);
	}

	/**
	*	Create a zero vector
	**/
	static zero() {
		return new Vec2(0, 0);
	}

	/**
	*	Create a vector with one for x and y
	**/
	static one() {
		return new Vec2(1, 1);
	}

	/**
	* Get min x and y from two Vectors
	**/
	static min(a: Vec2, b: Vec2) {
		return new Vec2(Math.min(a.x, b.x), Math.min(a.y, b.y));
	}

	/**
	* Get max x and y from two Vectors
	**/
	static max(a: Vec2, b: Vec2) {
		return new Vec2(Math.max(a.x, b.x), Math.max(a.y, b.y));
	}

	/**
	*	Create a vector from polar coordinate using standard trig formula
	*		(r cos(theta), r sin(theta))
	*	@param number r - radius
	*	@param number theta - angle in radian, clockwise from x axis
	**/
	static fromPolar(theta: number, r: number) {
		return new Vec2(r * Math.cos(theta), r * Math.sin(theta));
	}

	/**
	 * recursively replace all vectors in an object that follow the format { x: number, y: number }
	 * with a Vec2 object
	 **/
	static deserializeVectorOnObject(obj: any): any {
		if (typeof obj !== "object" || obj === null) return obj;

		// Check if current object matches {x: number, y: number} pattern
		if (typeof obj.x === "number" && typeof obj.y === "number") {
			return new Vec2(obj.x, obj.y);
		}

		// Handle arrays
		if (Array.isArray(obj)) {
			return obj.map(Vec2.deserializeVectorOnObject);
		}

		// Recursively process object properties
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [key, Vec2.deserializeVectorOnObject(value)])
		);
	}
}
