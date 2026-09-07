import { request } from '@/utils/request'

export const authApi = {
  register: data => request({ url: '/auth/register', method: 'POST', data }),
  login: data => request({ url: '/auth/login', method: 'POST', data }),
  logout: () => request({ url: '/auth/logout', method: 'POST' })
}

export const userApi = {
  me: () => request({ url: '/me' }),
  update: data => request({ url: '/me', method: 'PUT', data })
}

export const elderApi = {
  list: () => request({ url: '/elders' }),
  create: data => request({ url: '/elders', method: 'POST', data }),
  createInvite: elderId => request({ url: `/elders/${elderId}/invite`, method: 'POST' }),
  invitePreview: token => request({ url: `/elder-invites/${token}` }),
  acceptInvite: (token, clientId) => request({ url: `/elder-invites/${token}/accept`, method: 'POST', data: { clientId } }),
  clientProfile: clientToken => request({ url: `/elder-client/profile?clientToken=${encodeURIComponent(clientToken)}` }),
  clientReminders: clientToken => request({ url: `/elder-client/reminders?clientToken=${encodeURIComponent(clientToken)}` }),
  completeReminder: (clientToken, reminderId) => request({ url: `/elder-client/reminders/${reminderId}/complete`, method: 'POST', data: { clientToken } }),
  sos: (clientToken, location = {}) => request({ url: '/elder-client/sos', method: 'POST', data: { clientToken, ...location } })
}

export const reminderApi = {
  list: elderId => request({ url: `/elders/${elderId}/reminders` }),
  create: (elderId, data) => request({ url: `/elders/${elderId}/reminders`, method: 'POST', data }),
  update: (elderId, id, data) => request({ url: `/elders/${elderId}/reminders/${id}`, method: 'PUT', data })
}

export const healthApi = {
  list: elderId => request({ url: `/elders/${elderId}/health-records` }),
  create: (elderId, data) => request({ url: `/elders/${elderId}/health-records`, method: 'POST', data })
}

export const deviceApi = {
  list: elderId => request({ url: `/elders/${elderId}/devices` }),
  create: (elderId, data) => request({ url: `/elders/${elderId}/devices`, method: 'POST', data })
}
