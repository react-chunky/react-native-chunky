import { AppError } from 'react-chunky'

// Generic Errors
export const UNABLE_TO_LOAD_ROUTE            = (name, reason) => new AppError(`Unable to load route ${name}, because ${reason}`)
