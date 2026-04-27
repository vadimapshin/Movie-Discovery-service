export class AppError extends Error {
  public readonly stausCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.stausCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype)
  }
}