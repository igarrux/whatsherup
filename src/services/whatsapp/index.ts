import {
	create,
	defaultLogger,
	type Whatsapp,
	type CreateConfig,
} from '@wppconnect-team/wppconnect'
import { logger } from '../../../logger'
defaultLogger.level = 'null'

type PuppeteerLaunchOptions = CreateConfig['puppeteerOptions']

export class WhatsAppService {
	private client: Whatsapp | null = null

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
 * TODO Medoto para iniciar session por pin
 * Todo: Callback para recibir mensajes
 * TODO Metodo para enviar mensajes
 */
