import { proxyMuceRequest } from '../../server/muceProxy.js'

export default {
  fetch(request) {
    return proxyMuceRequest(request, 'Intro')
  },
}
