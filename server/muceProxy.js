const MUCE_API_BASE_URL = 'https://muce.edu.vn/TroLyAo'
const MAX_REQUEST_BODY_BYTES = 16 * 1024
const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'

const endpointMethods = new Map([
  ['Intro', 'GET'],
  ['Register', 'POST'],
  ['Ask', 'POST'],
])

function jsonResponse(body, status, additionalHeaders = {}) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...additionalHeaders,
    },
  })
}

export async function proxyMuceRequest(request, endpoint) {
  const expectedMethod = endpointMethods.get(endpoint)
  if (!expectedMethod) {
    return jsonResponse({ ok: false, error: 'Not found.' }, 404)
  }

  if (request.method !== expectedMethod) {
    return jsonResponse(
      { ok: false, error: `Method ${request.method} is not allowed for ${endpoint}.` },
      405,
      { Allow: expectedMethod },
    )
  }

  const requestUrl = new URL(request.url)
  const upstreamUrl = new URL(`${MUCE_API_BASE_URL}/${endpoint}`)
  upstreamUrl.search = requestUrl.search

  const upstreamInit = {
    method: request.method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
      Origin: 'https://muce.edu.vn',
      Referer: 'https://muce.edu.vn/',
      'User-Agent': BROWSER_USER_AGENT,
      'X-Requested-With': 'XMLHttpRequest',
    },
  }

  if (request.method === 'POST') {
    const contentType = request.headers.get('Content-Type') || ''
    if (!contentType.toLowerCase().startsWith('application/x-www-form-urlencoded')) {
      return jsonResponse({ ok: false, error: 'Unsupported content type.' }, 415)
    }

    const body = await request.arrayBuffer()
    if (body.byteLength > MAX_REQUEST_BODY_BYTES) {
      return jsonResponse({ ok: false, error: 'Request body is too large.' }, 413)
    }

    upstreamInit.body = body
    upstreamInit.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, upstreamInit)
    const responseBody = await upstreamResponse.arrayBuffer()

    return new Response(responseBody, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': upstreamResponse.headers.get('Content-Type') || 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return jsonResponse(
      { ok: false, error: 'Unable to connect to the MUCE assistant service.' },
      502,
    )
  }
}
