import { useState } from 'react'
import { Card, Button, Input, Divider, Footer } from 'animal-island-ui'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: number
  text: string
  sender: 'me' | 'other'
  name: string
  time: string
}

const initialMessages: Message[] = [
  { id: 1, text: '嗨！欢迎来到聊天室~ 🏝️', sender: 'other', name: '小岛管理员', time: '10:00' },
  { id: 2, text: '今天天气真好，适合在岛上散步呢！', sender: 'other', name: '邻居小花', time: '10:05' },
  { id: 3, text: '有没有人想一起去海边捡贝壳？', sender: 'other', name: '邻居阿柴', time: '10:12' },
]

const otherUsers = [
  { name: '邻居小花', color: '#f5a0c0' },
  { name: '邻居阿柴', color: '#19c8b9' },
  { name: '小岛管理员', color: '#ffcc00' },
]

export default function ChatRoom() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue.trim(),
      sender: 'me',
      name: '煎饼狗子',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages([...messages, newMessage])
    setInputValue('')

    // Simulate reply
    setTimeout(() => {
      const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)]
      const replies = [
        '好呀好呀！一起去吧~ 🌸',
        '听起来很有趣呢！✨',
        '煎饼狗子说得对！😊',
        '我也正想着同样的事情！',
        '哇，太棒了！🎈',
      ]
      const reply: Message = {
        id: messages.length + 2,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'other',
        name: randomUser.name,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, reply])
    }, 1500)
  }

  return (
    <div className="min-h-screen animal-cursor" style={{ background: '#f8f8f0' }}>
      {/* Header */}
      <header
        className="radius-organic py-6 px-8 text-center"
        style={{
          background: 'linear-gradient(135deg, #19c8b9, #19c8b9dd)',
          color: '#fff',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="btn-3d-sunny rounded-pill px-4 py-2 text-sm font-bold mb-3"
          style={{ background: '#ffcc00', color: '#794f27' }}
        >
          ← 回到小岛
        </button>
        <h1 className="text-2xl font-bold">💬 聊天室</h1>
        <p className="text-sm mt-1">和小岛居民们一起聊天吧~</p>
      </header>

      <Divider type="wave-yellow" />

      {/* Online Users */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl animate-leaf-sway">🍃</span>
          <span className="text-sm font-bold" style={{ color: '#794f27' }}>在线居民</span>
          <div className="flex gap-2">
            {otherUsers.map(user => (
              <span
                key={user.name}
                className="rounded-pill px-3 py-1 text-xs font-bold"
                style={{ background: user.color + '20', color: user.color, border: `2px solid ${user.color}` }}
              >
                {user.name}
              </span>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <Card color="app-teal">
          <div className="p-4">
            <div
              className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto rounded-soft p-4"
              style={{ background: '#f7f3dd' }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[70%] rounded-soft p-3"
                    style={{
                      background: msg.sender === 'me' ? '#19c8b9' : '#fff',
                      color: msg.sender === 'me' ? '#fff' : '#794f27',
                      boxShadow: msg.sender === 'me' ? '0 3px 0 0 #19c8b980' : '0 3px 0 0 #bdaea0',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold" style={{ color: msg.sender === 'me' ? '#ffcc00' : '#19c8b9' }}>
                        {msg.name}
                      </span>
                      <span className="text-xs opacity-60">{msg.time}</span>
                    </div>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="mt-4 flex gap-3 items-center">
              <div className="flex-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="说点什么吧..."
                  suffix={<span style={{ color: '#19c8b9' }}>😊</span>}
                />
              </div>
              <Button type="primary" onClick={handleSend} disabled={!inputValue.trim()}>
                发送 📬
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Footer type="sea" />
    </div>
  )
}