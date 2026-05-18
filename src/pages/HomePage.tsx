import { Card, Button, Time, Footer, Divider, Typewriter } from 'animal-island-ui'
import { useState } from 'react'

const features = [
  {
    path: '/chat-room',
    title: '聊天室',
    subtitle: '和小伙伴们一起聊聊天吧',
    emoji: '💬',
    image: '/images/chat-room-icon.png',
    cardColor: 'app-teal' as const,
    description: '在这里你可以和朋友自由交流，分享生活中的点滴',
  },
  {
    path: '/md-view',
    title: '文档阅读',
    subtitle: '用 Markdown 记录世界',
    emoji: '📖',
    image: '/images/md-view-icon.png',
    cardColor: 'app-yellow' as const,
    description: '支持 Markdown 格式渲染，让文档变得优雅好看',
  },
  {
    path: '/march-7th',
    title: '三月七',
    subtitle: '你的专属 AI 助手',
    emoji: '🌈',
    image: '/images/march-7th-icon.png',
    cardColor: 'warm-peach-pink' as const,
    description: '元气满满的粉色少女助手，随时帮你解决问题',
  },
]

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen animal-cursor" style={{ background: 'linear-gradient(180deg, hsl(174 75% 43% / 0.06), #f8f8f0)' }}>
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          {/* Time widget */}
          <div className="flex justify-center mb-6">
            <div style={{ transform: 'scale(0.85)' }}>
              <Time />
            </div>
          </div>

          {/* Avatar and Welcome */}
          <div className="flex flex-col items-center gap-4 animate-bounce-in">
            <div
              className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-3d"
              style={{ borderColor: '#19c8b9' }}
            >
              <img
                src="/images/avatar.png"
                alt="煎饼狗子头像"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <Typewriter speed={80} autoPlay>
                <h1
                  className="text-4xl font-bold tracking-wide"
                  style={{ color: '#794f27' }}
                >
                  煎饼狗子的小岛
                </h1>
              </Typewriter>
              <p
                className="mt-3 text-lg font-medium"
                style={{ color: '#725d42' }}
              >
                欢迎来到我的动森小岛，这里有好多好玩的地方等你探索~
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-8 rounded-organic overflow-hidden shadow-float">
            <img
              src="/images/hero-island.png"
              alt="煎饼狗子的动森小岛全景"
              className="w-full object-cover"
              style={{ maxHeight: '320px' }}
              loading="lazy"
            />
          </div>
        </div>

        <Divider type="wave-yellow" />
      </header>

      {/* Feature Cards Section */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2
            className="text-2xl font-bold radius-organic inline-block px-8 py-3"
            style={{
              color: '#794f27',
              background: 'linear-gradient(135deg, #f7f3dd, #ede4d0)',
            }}
          >
            🏝️ 小岛设施
          </h2>
          <p className="mt-3 text-base" style={{ color: '#725d42' }}>
            煎饼狗子为你准备了三个特别的去处，快来看看吧！
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.path}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
              onMouseEnter={() => setHoveredCard(feature.path)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card color={feature.cardColor} type="title">
                <div className="p-6">
                  {/* Card Image */}
                  <div
                    className="w-full h-40 rounded-soft overflow-hidden mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #f7f3dd, #ede4d0)',
                      transform: hoveredCard === feature.path ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover rounded-soft"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Title */}
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: '#794f27' }}
                  >
                    {feature.emoji} {feature.title}
                  </h3>
                  <p
                    className="text-sm mb-2 font-medium"
                    style={{ color: '#19c8b9' }}
                  >
                    {feature.subtitle}
                  </p>
                  <p
                    className="text-sm mb-4"
                    style={{ color: '#725d42' }}
                  >
                    {feature.description}
                  </p>

                  {/* Action Button */}
                  <Button type="primary">
                    <a href={feature.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                      前往 {feature.title} →
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>

      {/* Fun Facts Section */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <Divider type="line-teal" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card color="app-teal">
            <div className="p-6 text-center">
              <div className="text-4xl mb-2 animate-leaf-sway">🍃</div>
              <h3 className="text-lg font-bold" style={{ color: '#794f27' }}>关于煎饼狗子</h3>
              <p className="text-sm mt-2" style={{ color: '#725d42' }}>
                煎饼狗子是一只住在动森小岛上的可爱居民，
                喜欢在岛上散步、聊天、看书，
                最期待和助手三月七一起探索新功能！
              </p>
            </div>
          </Card>

          <Card color="app-yellow">
            <div className="p-6 text-center">
              <div className="text-4xl mb-2 animate-wiggle">⭐</div>
              <h3 className="text-lg font-bold" style={{ color: '#794f27' }}>小岛日记</h3>
              <p className="text-sm mt-2" style={{ color: '#725d42' }}>
                每一天都是新的冒险！
                今天在小岛上发现了新的花朵，
                又收到了邻居朋友的来信~
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer type="tree" />
      <footer className="text-center py-6" style={{ background: '#ede4d0' }}>
        <p className="text-sm" style={{ color: '#794f27' }}>
          🏝️ 煎饼狗子的小岛 · 用爱与温暖搭建
        </p>
        <p className="text-xs mt-1" style={{ color: '#725d42' }}>
          Made with Animal Crossing spirit ✨
        </p>
      </footer>
    </div>
  )
}