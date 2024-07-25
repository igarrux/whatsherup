import { create, defaultLogger, Whatsapp } from '@wppconnect-team/wppconnect'
import type { ConnectByPIN, PuppeteerLaunchOptions } from './types'
import { logger } from '../../../logger'
import { ERRORS } from './messages/errors'

defaultLogger.level = 'null'
const numberRegex = /\d/
export class WhatsAppService {
	public client: Whatsapp | null = null

	public async connectByQR(sessionName: string) {
		try {
			return await new Promise(async (res) => {
				this.client = await create({
					session: sessionName,
					headless: 'shell',
					puppeteerOptions: this.puppeteerOptions,
					logQR: false,
					catchQR: (_, asciiQR) => res(asciiQR),
				})
			})
		} catch (error) {
			logger.error(error)
		}
	}

	public async connectByPIN({ callSing, phone, session }: ConnectByPIN) {
		const sing = callSing.toString().replace('+', '')
		const phoneNumber = sing + phone.toString()

		// Verify if the phone number is valid
		if (!numberRegex.test(phoneNumber)) {
			logger.error(ERRORS.phoneError)
			throw new Error(ERRORS.phoneError)
		}

		try {
			return await new Promise(async (res) => {
				this.client = await create({
					phoneNumber,
					session,
					headless: 'shell',
					puppeteerOptions: this.puppeteerOptions,
					catchLinkCode: (pin) => res(pin),
				})
			})
		} catch (error) {
			logger.error(error)
		}
	}

	private puppeteerOptions: PuppeteerLaunchOptions = {
		headless: 'shell',
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--no-first-run',
			'--no-zygote',
			'--disable-gpu',
		],
	}
}

/**
 * Done: Metodo para obtener el QR
 * Done: Medoto para iniciar session por pin
 * Todo: Callback para recibir mensajes
 * TODO Metodo para enviar mensajes
 */
