import { create, defaultLogger, Whatsapp } from '@wppconnect-team/wppconnect'
import type {
	ConnectByPIN,
	logLevel,
	PuppeteerLaunchOptions,
	WhatsappCallback,
} from './types'
import { logger } from '../logger'
import { ERRORS } from './messages/errors'

const numberRegex = /\D/
export class WhatsHerUp {
	public client: Whatsapp | null = null
	public sessionName: string = ''
	private onReady?: WhatsappCallback
	private _waitUntilReady?: WhatsappCallback
	constructor(sessionName: string, logLevel: logLevel = 'error') {
		defaultLogger.level = logLevel
		this.sessionName = sessionName
	}

	set setOnready(callback: (client: Whatsapp) => void) {
		this.onReady = callback
	}
	public async connectByQR() {
		try {
			return await new Promise(async (res) => {
				this.client = await create({
					session: this.sessionName,
					headless: 'shell',
					puppeteerOptions: this.puppeteerOptions,
					logQR: false,
					catchQR: (_, asciiQR) => res(asciiQR),
				})
				this.onReady?.(this.client)
				this._waitUntilReady?.(this.client)
			})
		} catch (error) {
			logger.error(error)
		}
	}

	public async connectByPIN({ callSing, phone }: ConnectByPIN) {
		const sing = callSing.toString().replace('+', '')
		const phoneNumber = sing + phone.toString()

		// Verify if the phone number is valid
		if (numberRegex.test(phoneNumber)) {
			logger.error(ERRORS.phoneError)
			throw new Error(ERRORS.phoneError)
		}

		try {
			return await new Promise(async (res) => {
				this.client = await create({
					phoneNumber,
					session: this.sessionName,
					headless: 'shell',
					puppeteerOptions: this.puppeteerOptions,
					catchLinkCode: (pin) => res(pin),
				})
				this._waitUntilReady?.(this.client)
				this.onReady?.(this.client)
			})
		} catch (error) {
			logger.error(error)
		}
	}

	public async waitUntilReady() {
		if (this.client) return this.client
		return new Promise<Whatsapp>((res) => (this._waitUntilReady = res))
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

export default WhatsHerUp
