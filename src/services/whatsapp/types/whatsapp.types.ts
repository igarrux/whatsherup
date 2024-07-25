import { type CreateConfig } from '@wppconnect-team/wppconnect'
export type PuppeteerLaunchOptions = CreateConfig['puppeteerOptions']
export interface ConnectByPIN {
	callSing: string | number
	phone: string | number
	session: string
}
