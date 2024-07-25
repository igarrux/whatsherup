import { describe, it, expect, mock, jest } from 'bun:test'
import { WhatsAppService } from '.'

describe('whatsappService', () => {
	it('should be defined', () => {
		expect(WhatsAppService).toBeDefined()
	})
	it('connectByQR should return the QRCode', async () => {
		mock.module('@wppconnect-team/wppconnect', () => ({
			create: ({ catchQR }: any) => catchQR(null, 'test'),
		}))
		const wppService = new WhatsAppService()
		const qr = await wppService.connectByQR('session')
		expect(qr).toBe('test')
		jest.restoreAllMocks()
	})

	describe('connectByPIN', () => {
		it('connectByPIN must be return the pin', async () => {
			mock.module('@wppconnect-team/wppconnect', () => ({
				create: ({ catchLinkCode }: any) => catchLinkCode('test'),
			}))
			const wppService = new WhatsAppService()
			const PIN = await wppService.connectByPIN({
				callSing: 57,
				phone: 3,
				session: 'miaw',
			})
			expect(PIN).toBe('test')
			mock.restore()
		})
	})
})
