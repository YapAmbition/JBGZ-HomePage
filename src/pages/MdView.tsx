import { useState } from 'react'
import { Card, Button, Divider, Footer } from 'animal-island-ui'
import { useNavigate } from 'react-router-dom'

const sampleMarkdown = `# 🏝️ 煎饼狗子的小岛日记

## 今日天气

今天是岛上又一个阳光明媚的日子！早上起来就看到窗外樱花飘落...

### 上午活动

- 🌸 在花园里种了新的花
- 📬 收到了邻居的来信
- 🎒 去海边捡了漂亮的贝壳

### 下午计划

1. 去博物馆参观新的展览
2. 和小花一起做 DIY 手工
3. 给远方的朋友写一封信

> *每一天在小岛上都是新的冒险，珍惜和朋友们在一起的时光~*

---

**煎饼狗子** · 动森小岛居民 🐾`

// Simple markdown to HTML renderer
const renderMarkdown = (text: string): string => {
  let html = text
    .replace(/^### (.*$)/gm, '<h3 style="color:#794f27;font-weight:700;margin:16px 0 8px">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 style="color:#794f27;font-weight:700;margin:20px 0 12px">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 style="color:#794f27;font-weight:700;margin:24px 0 16px;font-size:1.5em">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gm, '<strong style="color:#794f27">$1</strong>')
    .replace(/\*(.*?)\*/gm, '<em>$1</em>')
    .replace(/^> (.*$)/gm, '<blockquote style="background:#f7f3dd;border-left:4px solid #19c8b9;padding:12px 16px;border-radius:8px;margin:12px 0;color:#725d42">$1</blockquote>')
    .replace(/^---$/gm, '<hr style="border:none;height:2px;background:linear-gradient(90deg,#19c8b9,#ffcc00);margin:20px 0;border-radius:1px"/>')
    .replace(/^- (.*$)/gm, '<li style="color:#725d42;padding:4px 0;list-style:none">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li style="color:#725d42;padding:4px 0;margin-left:8px;list-style:none">$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')

  if (html.includes('<li')) {
    html = html.replace(/(<li[^>]*>.*<\/li>(?:<br\/>)?)+/g, (match) => {
      return `<ul style="list-style:none;padding-left:0;margin:8px 0">${match}</ul>`
    })
  }

  return html
}

const tabItems = [
  { key: 'preview', label: '✨ 预览' },
  { key: 'edit', label: '📝 编辑' },
  { key: 'source', label: '💻 源码' },
]

export default function MdView() {
  const navigate = useNavigate()
  const [mdContent, setMdContent] = useState(sampleMarkdown)
  const [activeTab, setActiveTab] = useState('preview')

  return (
    <div className="min-h-screen animal-cursor" style={{ background: '#f8f8f0' }}>
      {/* Header */}
      <header
        className="radius-organic py-6 px-8 text-center"
        style={{
          background: 'linear-gradient(135deg, #ffcc00, #ffcc00cc)',
          color: '#794f27',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="btn-3d-teal rounded-pill px-4 py-2 text-sm font-bold mb-3"
          style={{ background: '#19c8b9', color: '#fff' }}
        >
          ← 回到小岛
        </button>
        <h1 className="text-2xl font-bold">📖 文档阅读</h1>
        <p className="text-sm mt-1" style={{ color: '#725d42' }}>用 Markdown 记录小岛上的每一天~</p>
      </header>

      <Divider type="line-yellow" />

      {/* Custom Tabs */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div
          className="flex gap-2 mb-6 rounded-pill p-2"
          style={{ background: '#ede4d0' }}
        >
          {tabItems.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="rounded-pill px-5 py-2 text-sm font-bold transition-all"
              style={{
                background: activeTab === tab.key ? '#ffcc00' : 'transparent',
                color: activeTab === tab.key ? '#794f27' : '#725d42',
                boxShadow: activeTab === tab.key ? '0 3px 0 0 #bdaea0' : 'none',
                transform: activeTab === tab.key ? 'translateY(-1px)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview */}
        {activeTab === 'preview' && (
          <Card color="app-yellow">
            <div
              className="p-6 min-h-[400px]"
              style={{ background: '#f7f3dd', borderRadius: '24px', lineHeight: '1.8' }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(mdContent) }}
            />
          </Card>
        )}

        {/* Edit */}
        {activeTab === 'edit' && (
          <Card color="app-yellow">
            <div className="p-4">
              <textarea
                value={mdContent}
                onChange={(e) => setMdContent(e.target.value)}
                className="w-full min-h-[400px] p-4 rounded-soft text-sm"
                style={{
                  background: '#f7f3dd',
                  color: '#725d42',
                  border: '2px solid #bdaea0',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: '1.6',
                  fontFamily: 'Nunito, "Noto Sans SC", sans-serif',
                }}
                placeholder="在这里写下你的 Markdown..."
              />
              <div className="flex gap-3 mt-4">
                <Button type="primary" onClick={() => setActiveTab('preview')}>
                  查看预览 ✨
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Source */}
        {activeTab === 'source' && (
          <Card color="app-yellow">
            <div className="p-4">
              <div
                className="p-4 rounded-soft min-h-[400px] text-sm"
                style={{
                  background: '#2b2118',
                  color: '#e8d5b7',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {mdContent}
              </div>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Card color="app-teal">
            <div className="p-4 text-center">
              <div className="text-3xl mb-2 animate-leaf-sway">🍃</div>
              <p className="text-sm font-bold" style={{ color: '#794f27' }}>新建文档</p>
            </div>
          </Card>
          <Card color="app-yellow">
            <div className="p-4 text-center">
              <div className="text-3xl mb-2 animate-wiggle">⭐</div>
              <p className="text-sm font-bold" style={{ color: '#794f27' }}>收藏文档</p>
            </div>
          </Card>
          <Card color="warm-peach-pink">
            <div className="p-4 text-center">
              <div className="text-3xl mb-2 animate-float-up">💕</div>
              <p className="text-sm font-bold" style={{ color: '#794f27' }}>分享文档</p>
            </div>
          </Card>
        </div>
      </div>

      <Footer type="tree" />
    </div>
  )
}