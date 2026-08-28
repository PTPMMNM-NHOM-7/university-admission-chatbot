const API_BASE_URL = import.meta.env.VITE_MUCE_API_BASE_URL || '/api/muce'
const VISITOR_STORAGE_KEY = 'muce_assistant_vid'

export interface MuceSource {
  title?: string
  url?: string
}

export interface MuceChatResponse {
  ok: boolean
  name: string
  reply: string
  sources: Array<MuceSource | string>
  visitorId: string
  userName: string | null
  role: string | null
  contact: string | null
  honorific: string
  greetingLine: string
  needName: boolean
  needProfile: boolean
  topics: string[]
  usedHotline: boolean
  clarifyOptions: string[]
}

export interface MuceProfileInput {
  role: 'Sinh viên' | 'Phụ huynh' | 'Giảng viên'
  fullName: string
  contact: string
}

function createVisitorId() {
  return `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

function getVisitorId() {
  try {
    const savedVisitorId = localStorage.getItem(VISITOR_STORAGE_KEY)
    if (savedVisitorId && savedVisitorId.length >= 8) return savedVisitorId

    const visitorId = createVisitorId()
    localStorage.setItem(VISITOR_STORAGE_KEY, visitorId)
    return visitorId
  } catch {
    return createVisitorId()
  }
}

function saveVisitorId(visitorId: string) {
  if (!visitorId) return
  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, visitorId)
  } catch {
    // The current session can continue even when browser storage is unavailable.
  }
}

async function parseResponse(response: Response): Promise<MuceChatResponse> {
  if (!response.ok) {
    throw new Error(`MUCE API trả về mã ${response.status}.`)
  }

  const result = (await response.json()) as MuceChatResponse
  if (!result.ok) {
    throw new Error(result.reply || 'MUCE API không thể xử lý yêu cầu.')
  }

  saveVisitorId(result.visitorId)
  return result
}

async function postForm(path: string, fields: Record<string, string>) {
  const body = new URLSearchParams(fields)
  const response = await fetch(`${API_BASE_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body,
  })

  return parseResponse(response)
}

export async function getChatIntro() {
  const query = new URLSearchParams({ visitorId: getVisitorId() })
  const response = await fetch(`${API_BASE_URL}/Intro?${query.toString()}`)
  return parseResponse(response)
}

export function registerChatProfile(profile: MuceProfileInput) {
  return postForm('Register', {
    visitorId: getVisitorId(),
    role: profile.role,
    fullName: profile.fullName,
    contact: profile.contact,
  })
}

export function askAdmissionQuestion(message: string) {
  return postForm('Ask', { message, visitorId: getVisitorId() })
}
