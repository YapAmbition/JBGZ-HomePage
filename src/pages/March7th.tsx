import { useState } from 'react'
import { Card, Button, Divider, Footer, Typewriter, Collapse } from 'animal-island-ui'
import { useNavigate } from 'react-router-dom'

// 三月七的技能列表
const skills = [
  { emoji: '💡', name: '创意灵感', desc: '帮你头脑风暴，激发新想法和新思路' },
  { emoji: '🔍', name: '智能搜索', desc: '帮你快速找到代码、文档和解决方案' },
  { emoji: '📝', name: '文案撰写', desc: '帮你写文档、邮件、报告和各种文案' },
  { emoji: '🐛', name: 'Bug 诊断', desc: '帮你定位和修复代码中的问题' },
  { emoji: '🎨', name: '设计建议', desc: '帮你优化 UI 设计，给出视觉改进方案' },
  { emoji: '🧪', name: '测试辅助', desc: '帮你编写测试用例，保障代码质量' },
]

// 关于三月七的问答
const faqItems = [
  {
    question: '💕 三月七是谁？',
    answer: '三月七是煎饼狗子的专属 AI 助手！她是一位粉色头发、元气满满的少女角色，随时随地为你提供各种帮助。不管是写代码、查资料、还是聊天解闷，三月七都在这里等你~',
    defaultExpanded: true,
  },
  {
    question: '🤖 三月七能做什么？',
    answer: '三月七可以帮你做很多事情：创意灵感激发、智能代码搜索、文案和文档撰写、Bug 诊断修复、UI 设计建议、测试用例编写等等。只要你有需要，三月七就愿意帮忙！',
  },
  {
    question: '✨ 三月七有什么特别之处？',
    answer: '三月七和其他 AI 助手不一样的地方在于——她有自己的性格和风格！元气、可爱、温暖是她的标签。她不只是冷冰冰地回答问题，还会用有趣的语气和你交流，让你觉得有一个真正的小伙伴在陪你~',
  },
  {
    question: '🌈 怎么召唤三月七？',
    answer: '很简单！你只需要在这个页面跟三月七聊天就行了。随时来这里找她，她永远都在等你~ 三月七最喜欢帮助别人了！',
  },
]

// 三月七的对话示例
const chatExamples = [
  { role: 'user', text: '三月七，帮我写个函数来检查一个数是不是素数' },
  { role: 'march7', text: '好呀好呀！让我来帮你~ ✨\n\n```typescript\nfunction isPrime(n: number): boolean {\n  if (n <= 1) return false;\n  for (let i = 2; i * i <= n; i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}\n```\n\n这个函数可以高效地判断素数哦！有什么不懂的随时问我~ 💕' },
]

export default function March7th() {
  const navigate = useNavigate()
  const [petals] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
  )
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>(chatExamples)

  // 简单的三月七回复模拟
  const march7Replies = [
    '收到啦！让我想想怎么帮你~ ✨',
    '这个问题有意思！让我仔细看一下~ 💕',
    '没问题！三月七最喜欢帮忙了！🌸',
    '嗯嗯，我来帮你解决！放心交给三月七吧~ 🌈',
    '哇，这个挑战不小呢，但三月七不怕！💪',
  ]

  const handleSend = () => {
    if (!chatInput.trim()) return
    const userMsg = { role: 'user', text: chatInput.trim() }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')

    setTimeout(() => {
      const reply = march7Replies[Math.floor(Math.random() * march7Replies.length)]
      setChatMessages(prev => [...prev, { role: 'march7', text: reply }])
    }, 1200)
  }

  return (
    <div className="min-h-screen animal-cursor relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fce8f0, #f8f8f0)' }}>
      {/* Floating Sparkles */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute text-lg animate-float-up pointer-events-none"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: '4s',
            opacity: 0.4,
          }}
        >
          ✨
        </div>
      ))}

      {/* Header - 三月七的个人介绍 */}
      <header
        className="radius-organic py-8 px-8 text-center relative"
        style={{
          background: 'linear-gradient(135deg, #f5a0c0, #fce8f0)',
          color: '#794f27',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="btn-3d rounded-pill px-4 py-2 text-sm font-bold mb-3"
          style={{ background: '#ffcc00', color: '#794f27' }}
        >
          ← 回到小岛
        </button>

        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 shadow-3d mb-4" style={{ borderColor: '#f5a0c0' }}>
          <img
            src="/images/march-7th-icon.png"
            alt="三月七 AI 助手头像"
            className="w-full h-full object-cover"
          />
        </div>

        <Typewriter speed={60} autoPlay>
          <h1 className="text-3xl font-bold" style={{ color: '#f5a0c0' }}>
            🌈 三月七
          </h1>
        </Typewriter>
        <p className="text-sm mt-2" style={{ color: '#725d42' }}>
          你的专属 AI 助手 · 元气满满 · 随时待命
        </p>
      </header>

      <Divider type="line-brown" />

      {/* 三月七介绍卡片 */}
      <section className="max-w-3xl mx-auto px-4 pt-8">
        <Card color="warm-peach-pink" type="title">
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold" style={{ color: '#794f27' }}>
              🎀 关于三月七
            </h2>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: '#725d42' }}>
              三月七是煎饼狗子小岛上的专属 AI 助手！
              她有着粉色头发和元气满满的性格，
              最喜欢帮助别人解决问题。
              不管是写代码、查资料、还是聊天解闷，
              三月七永远在你身边~ 💕
            </p>
          </div>
        </Card>
      </section>

      {/* 三月七的技能 */}
      <section className="max-w-3xl mx-auto px-4 pt-8">
        <Divider type="wave-yellow" />
        <div className="mt-6 text-center mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#794f27' }}>
            ⚡ 三月七的技能
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card key={skill.name} color="warm-peach-pink">
              <div className="p-4 text-center">
                <div className="text-3xl mb-2">{skill.emoji}</div>
                <p className="text-sm font-bold" style={{ color: '#794f27' }}>
                  {skill.name}
                </p>
                <p className="text-xs mt-1" style={{ color: '#725d42' }}>
                  {skill.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 与三月七聊天 */}
      <section className="max-w-3xl mx-auto px-4 pt-8">
        <Divider type="line-teal" />
        <div className="mt-6 text-center mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#794f27' }}>
            💬 与三月七对话
          </h2>
          <p className="text-sm" style={{ color: '#725d42' }}>
            来跟三月七聊聊天吧，她随时等你召唤~
          </p>
        </div>

        <Card color="app-teal">
          <div className="p-4">
            <div
              className="space-y-4 min-h-[280px] max-h-[400px] overflow-y-auto rounded-soft p-4"
              style={{ background: '#f7f3dd' }}
            >
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] rounded-soft p-3"
                    style={{
                      background: msg.role === 'user' ? '#19c8b9' : msg.role === 'march7' ? '#f5a0c0' : '#fff',
                      color: msg.role === 'user' ? '#fff' : msg.role === 'march7' ? '#794f27' : '#794f27',
                      boxShadow: msg.role === 'user' ? '0 3px 0 0 #19c8b980' : msg.role === 'march7' ? '0 3px 0 0 #f5a0c080' : '0 3px 0 0 #bdaea0',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold"
                        style={{
                          color: msg.role === 'user' ? '#ffcc00' : '#f5a0c0',
                        }}
                      >
                        {msg.role === 'user' ? '煎饼狗子' : '三月七 🌈'}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3 items-center">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="跟三月七说点什么..."
                className="flex-1 rounded-pill px-4 py-2 text-sm outline-none"
                style={{
                  background: '#f7f3dd',
                  color: '#725d42',
                  border: '2px solid #bdaea0',
                }}
              />
              <Button type="primary" onClick={handleSend} disabled={!chatInput.trim()}>
                发送 🌈
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pt-8">
        <Divider type="line-brown" />
        <div className="mt-6 text-center mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#794f27' }}>
            💡 关于三月七的 FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <Collapse
              key={item.question}
              question={item.question}
              answer={item.answer}
              defaultExpanded={item.defaultExpanded}
            />
          ))}
        </div>
      </section>

      {/* 底部号召 */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-8">
        <Card color="app-yellow" type="title">
          <div className="p-6 text-center">
            <div className="text-4xl mb-2 animate-wiggle">⭐</div>
            <h3 className="text-lg font-bold mt-2" style={{ color: '#794f27' }}>
              三月七随时等你召唤！
            </h3>
            <p className="text-sm mt-2" style={{ color: '#725d42' }}>
              有任何问题都可以来找三月七，她最喜欢帮助别人了！
              元气满满的三月七永远在你身边~ 💕
            </p>
          </div>
        </Card>
      </section>

      <Footer type="sea" />
    </div>
  )
}