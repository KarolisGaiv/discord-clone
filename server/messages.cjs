import { generateRandomId } from './utils.cjs'

export const buildMessage = (session, message) => {
  return {
    id: generateRandomId(),
    userId: session.userId,
    username: session.username,
    message,
  }
}
