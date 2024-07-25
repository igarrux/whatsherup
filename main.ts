import wppconnect from '@wppconnect-team/wppconnect'
import { logger } from './logger'

class WhatsHerUp {}
console.log('xd')
wppconnect.defaultLogger.level = 'null'

wppconnect
	.create({
        logger,
		// session: 'pollaitol',
        phoneNumber: '',
		catchQR: (_,qr) => console.log('\x1b[35m', qr, '\x1b[0m'),
	})
	.then((client) => start(client))
	.catch((error) => console.log(error))
