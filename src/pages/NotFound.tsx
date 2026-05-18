import { Button, Divider, Footer } from 'animal-island-ui'
import { useNavigate } from 'react-router-dom'
import { Typewriter } from 'animal-island-ui'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen animal-cursor flex flex-col" style={{ background: '#f8f8f0' }}>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {/* Lost Character Illustration */}
          <div className="text-6xl mb-4 animate-wiggle">🧭</div>

          <Typewriter speed={70} autoPlay>
            <h1
              className="text-3xl font-bold radius-organic inline-block px-6 py-3"
              style={{
                color: '#794f27',
                background: 'linear-gradient(135deg, #f7f3dd, #ede4d0)',
              }}
            >
              哎呀，迷路了！
            </h1>
          </Typewriter>

          <div className="mt-6 text-5xl font-bold" style={{ color: '#19c8b9' }}>
            404
          </div>

          <Divider type="wave-yellow" />

          <p className="text-base mt-4" style={{ color: '#725d42' }}>
            煎饼狗子翻遍了整座小岛，也没找到你要去的地方...
          </p>
          <p className="text-sm mt-2" style={{ color: '#725d42' }}>
            也许这条路还没被修建呢？不如回到小岛中心重新出发吧！
          </p>

          <div className="mt-6 flex gap-4 justify-center">
            <Button type="primary" onClick={() => navigate('/')}>
              回到小岛 🏝️
            </Button>
            <Button type="default" onClick={() => navigate(-1)}>
              返回上一页 ←
            </Button>
          </div>
        </div>
      </main>

      <Footer type="tree" />
    </div>
  )
}