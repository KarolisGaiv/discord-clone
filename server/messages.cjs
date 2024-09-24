const { generateRandomId } = require('./utils.cjs')
import moment from 'moment'

module.exports = {
  buildMessage: (session, message) => {
    return {
      id: generateRandomId(),
      userId: session.userId,
      username: session.username,
      message,
      timestamp: moment().toISOString(),
    }
  },
}
