export class DatabaseError extends Error {
  public readonly operation: string;

  constructor(operation: string, cause: Error) {
    super(`Database error in ${operation}: ${cause.message}`);

    this.name = 'DatabaseError';
    this.operation = operation;
    this.cause = cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}