import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'
import { proxyMuceRequest } from '../muceProxy.js'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('MUCE Vercel proxy', () => {
  it('forwards Intro query parameters to MUCE', async () => {
    let upstreamUrl
    globalThis.fetch = async (input) => {
      upstreamUrl = input.toString()
      return Response.json({ ok: true })
    }

    const request = new Request('https://example.vercel.app/api/muce/Intro?visitorId=visitor-test')
    const response = await proxyMuceRequest(request, 'Intro')

    assert.equal(response.status, 200)
    assert.equal(upstreamUrl, 'https://muce.edu.vn/TroLyAo/Intro?visitorId=visitor-test')
  })

  it('forwards form data for Register', async () => {
    let upstreamRequest
    globalThis.fetch = async (input, init) => {
      upstreamRequest = { url: input.toString(), init }
      return Response.json({ ok: true })
    }

    const body = new URLSearchParams({
      visitorId: 'visitor-test',
      role: 'Student',
      fullName: 'Test User',
      contact: 'test@example.com',
    })
    const request = new Request('https://example.vercel.app/api/muce/Register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body,
    })
    const response = await proxyMuceRequest(request, 'Register')

    assert.equal(response.status, 200)
    assert.equal(upstreamRequest.url, 'https://muce.edu.vn/TroLyAo/Register')
    assert.match(upstreamRequest.init.headers['User-Agent'], /^Mozilla\/5\.0/)
    assert.equal(upstreamRequest.init.headers.Origin, 'https://muce.edu.vn')
    assert.equal(upstreamRequest.init.headers.Referer, 'https://muce.edu.vn/')
    assert.equal(new TextDecoder().decode(upstreamRequest.init.body), body.toString())
  })

  it('rejects an invalid method without calling MUCE', async () => {
    globalThis.fetch = async () => {
      throw new Error('Upstream must not be called')
    }

    const request = new Request('https://example.vercel.app/api/muce/Ask')
    const response = await proxyMuceRequest(request, 'Ask')

    assert.equal(response.status, 405)
    assert.equal(response.headers.get('Allow'), 'POST')
  })

  it('rejects non-form POST requests', async () => {
    const request = new Request('https://example.vercel.app/api/muce/Ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello' }),
    })
    const response = await proxyMuceRequest(request, 'Ask')

    assert.equal(response.status, 415)
  })

  it('returns a controlled error when MUCE is unavailable', async () => {
    globalThis.fetch = async () => {
      throw new Error('Network error')
    }

    const request = new Request('https://example.vercel.app/api/muce/Intro')
    const response = await proxyMuceRequest(request, 'Intro')

    assert.equal(response.status, 502)
    assert.equal((await response.json()).ok, false)
  })
})
