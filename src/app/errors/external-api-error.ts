import { AppError } from './app-error.js';

export class ExternalApiError extends AppError {
  constructor(message = 'External Api error') {
    super(message, 502);
  }
}