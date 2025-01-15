import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import homeStore from '@/features/stores/home'
import settingsStore from '@/features/stores/settings'
import webSocketStore from '@/features/stores/websocketStore'
import { EmotionType } from '@/features/messages/messages'

///取得したコメントをストックするリストの作成（receivedMessages）
interface TmpMessage {
  text: string
  role: string
  emotion: EmotionType
  type: string
}

interface Params {
  handleReceiveTextFromWs: (
    text: string,
    role?: string,
    emotion?: EmotionType,
    type?: string
  ) => Promise<void>
}

const useExternalLinkage = ({ handleReceiveTextFromWs }: Params) => {
  const { t } = useTranslation()
  const externalLinkageMode = settingsStore((s) => s.externalLinkageMode)
  const [receivedMessages, setTmpMessages] = useState<TmpMessage[]>([])

  const processMessage = useCallback(
    async (message: TmpMessage) => {
      await handleReceiveTextFromWs(
        message.text,
        message.role,
        message.emotion,
        message.type
      )
    },
    [handleReceiveTextFromWs]
  )

  useEffect(() => {
    if (receivedMessages.length > 0) {
      const message = receivedMessages[0]
      if (
        message.role === 'output' ||
        message.role === 'executing' ||
        message.role === 'console'
      ) {
        message.role = 'code'
      }
      setTmpMessages((prev) => prev.slice(1))
      processMessage(message)
    }
  }, [receivedMessages, processMessage])

  useEffect(() => {
    const ss = settingsStore.getState()
    if (!ss.externalLinkageMode) return

    const handleOpen = (event: Event) => {}
    const handleMessage = async (event: MessageEvent) => {
      const jsonData = JSON.parse(event.data)
      setTmpMessages((prevMessages) => [...prevMessages, jsonData])
    }
    const handleError = (event: Event) => {}
    const handleClose = (event: Event) => {}

    const handlers = {
      onOpen: handleOpen,
      onMessage: handleMessage,
      onError: handleError,
      onClose: handleClose,
    }

    const wsManager = webSocketStore.getState().wsManager

    function connectWebsocket() {
      if (wsManager?.isConnected()) return wsManager.websocket

      // Websocket関連の情報を取得
      const token = process.env.NEXT_PUBLIC_JWT_TOKEN
      const websocket_url =
        process.env.NEXT_PUBLIC_EXTERNAL_LINKAGE_URL || `ws://localhost:8000/ws`

      if (!token) {
        console.error('JWT token is not defined. Please check .env file')
        return null
      }

      console.log('Attempting to connect WebSocket with token:', websocket_url)
      return new WebSocket(websocket_url, [token])
    }

    webSocketStore.getState().initializeWebSocket(t, handlers, connectWebsocket)

    const reconnectInterval = setInterval(() => {
      const ss = settingsStore.getState()
      if (
        ss.externalLinkageMode &&
        wsManager?.websocket &&
        wsManager.websocket.readyState !== WebSocket.OPEN &&
        wsManager.websocket.readyState !== WebSocket.CONNECTING
      ) {
        homeStore.setState({ chatProcessing: false })
        console.log('try reconnecting...')
        wsManager.disconnect()
        webSocketStore
          .getState()
          .initializeWebSocket(t, handlers, connectWebsocket)
      }
    }, 2000)

    return () => {
      clearInterval(reconnectInterval)
      webSocketStore.getState().disconnect()
    }
  }, [externalLinkageMode, t])

  return null
}

export default useExternalLinkage
