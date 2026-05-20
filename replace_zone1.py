import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# New Zone 1 content - compact cards for Western Mysticism
new_zone1 = '''        {/* 塔罗牌 */}
        <Link href="/tarot">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(26,16,53,0.8)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(45,27,105,0.6)", border: "1px solid rgba(201,168,76,0.2)" }}>🔮</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-cinzel text-base font-bold" style={{ color: "#e8d5a3" }}>{t.tarotTitle}</h2>
                  <span style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: 8, background: "rgba(201,168,76,0.12)", color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.15)" }}>Tarot Reading</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(200,180,150,0.6)" }}>{t.tarotDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#c9a84c" }}>→</span>
            </div>
          </div>
        </Link>

        {/* 星盘解析 */}
        <Link href="/astro">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(5,8,30,0.92)", border: "1px solid rgba(100,149,237,0.28)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(70,100,220,0.1) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(10,18,60,0.8)", border: "1px solid rgba(100,149,237,0.25)" }}>♈</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold" style={{ background: "linear-gradient(135deg,#a8c4ff,#6495ED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "serif" }}>{t.astroTitle}</h2>
                  <span style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: 8, background: "rgba(100,149,237,0.12)", color: "rgba(160,195,255,0.8)", border: "1px solid rgba(100,149,237,0.18)" }}>Birth Chart</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(180,200,255,0.6)" }}>{t.astroDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#6495ED" }}>→</span>
            </div>
          </div>
        </Link>

        {/* MBTI 星球碰撞 - 在第一战区也放一个入口 */}
        <Link href="/mbti">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(8,5,20,0.92)", border: "1px solid rgba(124,58,237,0.28)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
            <div className="absolute top-3 right-3" style={{ fontSize: "0.6rem", padding: "2px 7px", borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#E91E8C)", color: "#fff" }}>🔥 {lang === "en" ? "Trending" : "流行"}</div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(25,10,60,0.75)", border: "1px solid rgba(124,58,237,0.22)" }}>🧩</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold mb-1" style={{ background: "linear-gradient(135deg,#DDD6FE,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "serif" }}>{t.mbtiZone1Title}</h2>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(200,180,150,0.6)" }}>{t.mbtiZone1Desc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#A78BFA" }}>→</span>
            </div>
          </div>
        </Link>

        {/* 星座运势 */}
        <Link href="/horoscope">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(10,8,28,0.92)", border: "1px solid rgba(255,150,50,0.28)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,150,50,0.1) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(30,15,5,0.8)", border: "1px solid rgba(255,150,50,0.25)" }}>🌌</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold" style={{ background: "linear-gradient(135deg,#FFE0B2,#FF9800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "serif" }}>{t.horoscopeTitle}</h2>
                  <span style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: 8, background: "rgba(255,150,50,0.12)", color: "rgba(255,180,100,0.8)", border: "1px solid rgba(255,150,50,0.18)" }}>Zodiac</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(220,180,130,0.6)" }}>{t.horoscopeDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#FF9800" }}>→</span>
            </div>
          </div>
        </Link>

        {/* 卢恩符文 */}
        <Link href="/rune">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(6,10,22,0.92)", border: "1px solid rgba(80,140,220,0.28)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(60,110,200,0.1) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(10,18,40,0.85)", border: "1px solid rgba(80,140,220,0.25)", fontFamily: "serif", fontSize: "1.5rem", color: "rgba(100,170,255,0.8)" }}>ᚠ</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold" style={{ background: "linear-gradient(135deg,#b0d8f5,#4a9eca)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "serif" }}>{t.runeTitle}</h2>
                  <span style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: 8, background: "rgba(80,140,220,0.12)", color: "rgba(140,190,255,0.8)", border: "1px solid rgba(80,140,220,0.18)" }}>Nordic Runes</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(160,200,245,0.6)" }}>{t.runeDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#4a9eca" }}>→</span>
            </div>
          </div>
        </Link>

        {/* 生命灵数 */}
        <Link href="/numerology">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(10,5,30,0.92)", border: "1px solid rgba(124,58,237,0.28)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(30,10,70,0.8)", border: "1px solid rgba(124,58,237,0.25)" }}>🔢</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold" style={{ background: "linear-gradient(135deg,#DDD6FE,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "serif" }}>{t.numerologyTitle}</h2>
                  <span style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: 8, background: "rgba(124,58,237,0.12)", color: "rgba(167,139,250,0.8)", border: "1px solid rgba(124,58,237,0.2)" }}>Numerology</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(200,180,255,0.6)" }}>{t.numerologyDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#7C3AED" }}>→</span>
            </div>
          </div>
        </Link>

        {/* 墨韵起名 */}
        <Link href="/naming">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(28,20,10,0.88)", border: "1px solid rgba(180,140,60,0.28)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(160,120,40,0.1) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(60,40,10,0.7)", border: "1px solid rgba(180,140,60,0.22)" }}>✍️</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold mb-1" style={{ color: "#e8d5a3", fontFamily: "serif" }}>{t.namingTitle}</h2>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(200,175,130,0.6)" }}>{t.namingDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#c9a84c" }}>→</span>
            </div>
          </div>
        </Link>

        {/* 姻缘占卜 */}
        <Link href="/love">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(12,8,28,0.90)", border: "1px solid rgba(150,80,220,0.28)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(130,60,200,0.1) 0%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(30,10,60,0.75)", border: "1px solid rgba(150,80,220,0.22)" }}>💫</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold mb-1" style={{ color: "#e8d5a3", fontFamily: "serif" }}>{t.loveTitle}</h2>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(190,140,255,0.6)" }}>{t.loveDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#b06aff" }}>→</span>
            </div>
          </div>
        </Link>

        {/* 赛博算命 */}
        <Link href="/face-reading">
          <div className="relative rounded-2xl p-5 cursor-pointer group overflow-hidden" style={{ background: "rgba(2,0,20,0.95)", border: "1px solid rgba(0,245,255,0.22)", backdropFilter: "blur(12px)" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.08) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="absolute top-3 right-3" style={{ fontSize: "0.6rem", padding: "2px 7px", borderRadius: 8, background: "linear-gradient(135deg,#00C8FF,#7B2FFF)", color: "#fff" }}>🔥 HOT</div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(0,10,40,0.85)", border: "1px solid rgba(0,245,255,0.25)" }}>🔬</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold" style={{ background: "linear-gradient(135deg,#00F5FF,#7B2FFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "sans-serif" }}>{t.faceTitle}</h2>
                  <span style={{ fontSize: "0.6rem", padding: "1px 6px", borderRadius: 8, background: "rgba(0,245,255,0.1)", color: "rgba(0,245,255,0.75)", border: "1px solid rgba(0,245,255,0.18)" }}>AI Scan</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(180,220,255,0.6)" }}>{t.faceDesc}</p>
              </div>
              <span className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all" style={{ color: "#00F5FF" }}>→</span>
            </div>
          </div>
        </Link>
'''

# Find and replace the old zone 1 content
old_start = '        {/* 塔罗牌模块 */}\n        <Link href="/tarot">'
old_end = '        </Link>\n\n        </div>{/* END ZONE 1 */}'

start_idx = content.find(old_start)
end_idx = content.find(old_end)

if start_idx == -1:
    print("ERROR: Could not find start")
elif end_idx == -1:
    print("ERROR: Could not find end")
else:
    # The end_idx points to the beginning of old_end, 
    # we want to keep the closing tags
    new_content = content[:start_idx] + new_zone1 + content[end_idx:]
    with open('src/app/page.tsx', 'w') as f:
        f.write(new_content)
    print("SUCCESS: Replaced zone 1 content")
    print(f"Replaced {end_idx - start_idx} chars with {len(new_zone1)} chars")
