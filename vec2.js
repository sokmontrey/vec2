export default class Vec2 {
	x = 0
	y = 0

	constructor(x, y) {
		this.x = x
		this.y = y
	}

	//================================ Math operations ================================

	/**
	 * Add two vectors - element wise
	 * 
	 * @param {Vec2} other 
	 **/
	add(other) {
		return new Vec2(this.x + other.x, this.y + other.y)
	}

	/**
	 * Subtract the other vector from the current vector - element wise
	 * 
	 * @param {Vec2} other 
	 **/
	subtract(other) {
		return new Vec2(this.x - other.x, this.y - other.y)
	}

	/**
	 * Scalar multiply the vector with a scalar
	 **/
	multiply(value) {
		return new Vec2(this.x * value, this.y * value)
	}

	/**
	 * Dot product of two vectors
	 * 
	 * @param {Vec2} other 
	 **/
	dot(other) {
		return this.x * other.x + this.y * other.y
	}

	/**
	 *	Get magnitude of the current vector
	 **/
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}

	/**
	 * Scalar divide the vector by a number
	 * 
	 * @param {number} other 
	 **/
	divide(other) {
		if (!other) throw new Error("Cannot divide by zero")
		return new Vec2(this.x / other, this.y / other)
	}

	/**
	 * Distance between two vectors
	 * 
	 * @param {Vec2} other 
	 **/
	distance(other) {
		return this.subtract(other).magnitude()
	}

	/**
	 *	Equivalent to multiply the current vector by -1
	 **/
	invert() {
		return new Vec2(-this.x, -this.y)
	}

	/**
	 *	Get the clockwise perpendicular vector
	 **/
	perpendicular() {
		return new Vec2(this.y, -this.x)
	}

	/**
	 *	Normalize the vector
	 * 
	 *	@return Vec2 - a unit of the original vector
	 **/
	normalize() {
		return this.divide(this.magnitude())
	}

	absolute() {
		return new Vec2(Math.abs(this.x), Math.abs(this.y))
	}

	/**
	 * @return number - angle between vector and the x axis
	 **/
	angle() {
		return Math.atan2(this.y, this.x)
	}

	//================================ Conveniences ================================

	/**
	 *	Whether this point is inside a bounding box
	 * 
	 *	@param {Vec2} lower - lower bound of the bounding box
	 *	@param {Vec2} upper - upper bound of the bounding box
	 **/
	isInBoundingBox(lower, upper) {
		return (
			this.x >= lower.x &&
			this.x <= upper.x &&
			this.y >= lower.y &&
			this.y <= upper.y
		)
	}

	/**
	 *	@return [number - x, number - y]
	 **/
	toArray() {
		return [this.x, this.y]
	}

	/**
	 *	Create a copy of the original vector. Preventing JavaScript object reference
	 **/
	copy() {
		return new Vec2(this.x, this.y)
	}

	//================================ Four Direction Translation ================================

	/**
	 *	Moved to the right by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	right(unit = 1) {
		return this.add(new Vec2(unit, 0))
	}

	/**
	 *	Moved to the left by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	left(unit = 1) {
		return this.add(new Vec2(-unit, 0))
	}

	/**
	 *	Moved up by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	up(unit = 1) {
		return this.add(new Vec2(0, -unit))
	}

	/**
	 *	Moved the vector down by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	down(unit = 1) {
		return this.add(new Vec2(0, unit))
	}

	/**
	 *	Create a vector moved to the right by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	static right(unit = 1) {
		return new Vec2(unit, 0)
	}

	/**
	 *	Create a vector moved to the left by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	static left(unit = 1) {
		return new Vec2(-unit, 0)
	}

	/**
	 *	Create a vector moved up by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	static up(unit = 1) {
		return new Vec2(0, -unit)
	}

	/**
	 *	Create a vector moved down by "unit"
	 * 
	 *  @param {number} [unit=1] 
	 **/
	static down(unit = 1) {
		return new Vec2(0, unit)
	}

	/**
	 *	Create a zero vector
	 **/
	static zero() {
		return new Vec2(0, 0)
	}

	/**
	 *	Create a vector with one for x and y
	 **/
	static one() {
		return new Vec2(1, 1)
	}

	/**
	 * Get min x and y from two Vectors
	 * 
	 * @param {Vec2} a 
	 * @param {Vec2} b 
	 **/
	static min(a, b) {
		return new Vec2(Math.min(a.x, b.x), Math.min(a.y, b.y))
	}

	/**
	 * Get max x and y from two Vectors
	 * 
	 * @param {Vec2} a 
	 * @param {Vec2} b 
	 **/
	static max(a, b) {
		return new Vec2(Math.max(a.x, b.x), Math.max(a.y, b.y))
	}

	/**
	 *	Create a vector from polar coordinate using standard trig formula
	 *		(r cos(theta), r sin(theta))
	 * 
	 *	@param {number} r - radius
	 *	@param {number} theta - angle in radian, clockwise from x axis
	 **/
	static fromPolar(theta, r) {
		return new Vec2(r * Math.cos(theta), r * Math.sin(theta))
	}

	/**
	 * recursively replace all vectors in an object that follow the format { x: number, y: number }
	 * with a Vec2 object
	 * 
	 * @param {object} obj 
	 **/
	static deserializeVectorOnObject(obj) {
		if (typeof obj !== "object" || obj === null) return obj

		// Check if current object matches {x: number, y: number} pattern
		if (typeof obj.x === "number" && typeof obj.y === "number") {
			return new Vec2(obj.x, obj.y)
		}

		// Handle arrays
		if (Array.isArray(obj)) {
			return obj.map(Vec2.deserializeVectorOnObject)
		}

		// Recursively process object properties
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				key,
				Vec2.deserializeVectorOnObject(value)
			])
		)
	}
}
