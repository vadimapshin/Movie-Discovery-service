import { AppError } from './app-error.js';

export class DatabaseError extends AppError {
  constructor(message = 'Database error') {
    super(message, 500);
  }
}