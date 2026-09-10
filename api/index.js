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

export const familyApi = {
  current: () => request({ url: '/families/current' }),
  members: () => request({ url: '/families/current/members' }),
  invite: data => request({ url: '/families/current/invites', method: 'POST', data }),
  invitePreview: token => request({ url: `/family-invites/${token}` }),
  acceptInvite: token => request({ url: `/family-invites/${token}/accept`, method: 'POST' }),
  removeMember: memberId => request({ url: `/families/current/members/${memberId}`, method: 'DELETE' })
}

export const elderApi = {
  list: () => request({ url: '/elders' }),
  create: data => request({ url: '/elders', method: 'POST', data }),
  update: (elderId, data) => request({ url: `/elders/${elderId}`, method: 'PUT', data }),
  createInvite: elderId => request({ url: `/elders/${elderId}/invite`, method: 'POST' }),
  unbind: elderId => request({ url: `/elders/${elderId}/unbind`, method: 'POST' }),
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
  update: (elderId, id, data) => request({ url: `/elders/${elderId}/reminders/${id}`, method: 'PUT', data }),
  remove: (elderId, id) => request({ url: `/elders/${elderId}/reminders/${id}`, method: 'DELETE' })
}

export const taskApi = {
  list: () => request({ url: '/care-tasks' }),
  detail: id => request({ url: `/care-tasks/${id}` }),
  create: data => request({ url: '/care-tasks', method: 'POST', data }),
  update: (id, data) => request({ url: `/care-tasks/${id}`, method: 'PUT', data }),
  complete: id => request({ url: `/care-tasks/${id}/complete`, method: 'POST' }),
  remove: id => request({ url: `/care-tasks/${id}`, method: 'DELETE' })
}

export const healthApi = {
  list: elderId => request({ url: `/elders/${elderId}/health-records` }),
  create: (elderId, data) => request({ url: `/elders/${elderId}/health-records`, method: 'POST', data }),
  update: (elderId, id, data) => request({ url: `/elders/${elderId}/health-records/${id}`, method: 'PUT', data }),
  remove: (elderId, id) => request({ url: `/elders/${elderId}/health-records/${id}`, method: 'DELETE' })
}

export const deviceApi = {
  list: elderId => request({ url: `/elders/${elderId}/devices` }),
  create: (elderId, data) => request({ url: `/elders/${elderId}/devices`, method: 'POST', data }),
  remove: (elderId, deviceId) => request({ url: `/elders/${elderId}/devices/${deviceId}`, method: 'DELETE' })
}

export const sosApi = {
  list: () => request({ url: '/sos-events' }),
  handle: id => request({ url: `/sos-events/${id}/handle`, method: 'POST' }),
  close: id => request({ url: `/sos-events/${id}/close`, method: 'POST' })
}

export const notificationApi = {
  get: () => request({ url: '/notification-settings' }),
  update: data => request({ url: '/notification-settings', method: 'PUT', data })
}

export const privacyApi = {
  get: () => request({ url: '/privacy-settings' }),
  update: data => request({ url: '/privacy-settings', method: 'PUT', data })
}

export const feedbackApi = {
  create: data => request({ url: '/feedbacks', method: 'POST', data })
}
