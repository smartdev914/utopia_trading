/* eslint-disable no-return-assign */
import * as SockJS from 'sockjs-client'
import Stomp from 'stompjs'

class StompClient {
    constructor() {
        if (StompClient.instance) {
            return StompClient.instance
        }

        StompClient.instance = this

        const socket = new SockJS('https://streaming.bitquery.io/stomp', null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            timeout: 5000,
        })

        this.client = Stomp.over(socket)
        this.client.reconnect_delay = 3000
    }
}
// eslint-disable-next-line import/prefer-default-export
export default StompClient
