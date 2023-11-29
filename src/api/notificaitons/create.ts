import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { BroadcastInstance } from '@types/broadcast'

export function createNotification(notification: BroadcastInstance) {
    const result = (await axios('notifications/create', {
        method: 'post',
        data: notification,
        withCredentials: true
    })).data as Response<string>
}