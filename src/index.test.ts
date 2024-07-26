import { describe, it, expect, mock, jest } from 'bun:test'
import { WhatsAppService } from '.'
import { ERRORS } from './messages/errors'

describe('whatsappService', () => {
	it('should be defined', () => {
		expect(WhatsAppService).toBeDefined()
	})
	it('connectByQR should return the QRCode', async () => {
		mock.module('@wppconnect-team/wppconnect', () => ({
			create: ({ catchQR }: any) => catchQR(null, 'test'),
		}))
		const wppService = new WhatsAppService('session')
		const qr = await wppService.connectByQR()
		expect(qr).toBe('test')
		jest.restoreAllMocks()
	})

	describe('connectByPIN', () => {
		it('connectByPIN must be return the pin', async () => {
			mock.module('@wppconnect-team/wppconnect', () => ({
				create: ({ catchLinkCode }: any) => catchLinkCode('test'),
			}))
			const wppService = new WhatsAppService('session')
			const PIN = await wppService.connectByPIN({
				callSing: 57,
				phone: 3,
			})
			expect(PIN).toBe('test')
			mock.restore()
		})

		it('should trhow and error when the phone number is invalid', async () => {
			mock.module('@wppconnect-team/wppconnect', () => ({
				create: ({ catchLinkCode }: any) => catchLinkCode('test'),
			}))
			const wppService = new WhatsAppService('session')

			expect(
				wppService.connectByPIN({
					callSing: '57 pepito',
					phone: 3,
				})
			).rejects.toThrow(new Error(ERRORS.phoneError))
			mock.restore()
		})
	})

	describe('waitUtilReady', () => {
		it('should be return the client when service is ready', () => {
			mock.module('@wppconnect-team/wppconnect', () => ({
				create: async ({ catchQR }: any) => {
					catchQR('test')
					return 'client'
				},
			}))
			const wppService = new WhatsAppService('session')
			wppService.connectByQR()
			expect(wppService.waitUntilReady()).resolves.toBe('client' as any)
			mock.restore()
		})

		it('should be return the client if this exist', () => {
			mock.module('@wppconnect-team/wppconnect', () => ({
				create: async ({ catchQR }: any) => {
					catchQR('test')
					return 'client'
				},
			}))
			const wppService = new WhatsAppService('session')
			wppService['client'] = 'client2' as any
			expect(wppService.waitUntilReady()).resolves.toBe('client2' as any)
			mock.restore()
		})
	})
})
