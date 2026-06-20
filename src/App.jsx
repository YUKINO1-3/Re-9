import './App.css'

const publicAsset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`

const characters = [
  {
    name: '格蕾丝·阿什克罗夫特',
    englishName: 'Grace Ashcroft',
    role: 'FBI 情报分析员',
    mark: 'GA',
    tone: 'amber',
    featured: true,
    description:
      '拥有出色的专注力、洞察力与推理能力。母亲的死亡让她变得内向，并把自己埋进工作之中。一次发生在废弃酒店的离奇命案，迫使她独自走回八年前的阴影。',
    tags: ['核心主角', '推理分析', '生存恐怖'],
  },
  {
    name: '里昂·S·肯尼迪',
    englishName: 'Leon S. Kennedy',
    role: 'DSO 资深特工',
    mark: 'LK',
    tone: 'steel',
    image: publicAsset('Leon%201.jpg'),
    link: 'https://en.wikipedia.org/wiki/Leon_S._Kennedy',
    featured: true,
    description:
      '浣熊市事件的幸存者之一。凭借坚定的正义感与丰富的实战经验，他多年来一直奋战在生化恐怖事件的最前线，如今再次受命调查美国中西部的连环死亡事件。',
    tags: ['核心主角', '反生化专家', '动作战斗'],
  },
  {
    name: '艾丽莎·阿什克罗夫特',
    englishName: 'Alyssa Ashcroft',
    role: '记者 / 浣熊市幸存者',
    mark: 'AA',
    tone: 'crimson',
    description:
      '格蕾丝的母亲，也是一位意志坚定的调查记者。逃离浣熊市后，她没有停止追寻真相，而是继续调查安布雷拉留下的秘密。',
    tags: ['关键人物', '调查记者'],
  },
  {
    name: '内森·登普西',
    englishName: 'Nathan Dempsy',
    role: 'FBI 主管',
    mark: 'ND',
    tone: 'slate',
    description:
      '格蕾丝在 FBI 的上司。他清楚格蕾丝仍被母亲之死困扰，却依然将近期连环死亡事件的调查任务交给了她。',
    tags: ['FBI', '任务委托人'],
  },
  {
    name: '艾米丽',
    englishName: 'Emily',
    role: '神秘少女',
    mark: 'EM',
    tone: 'ivory',
    description:
      '格蕾丝在护理中心发现的少女。她面色苍白、身体异常消瘦，被困于危险设施之中的原因仍是一个谜。',
    tags: ['神秘人物', '护理中心'],
  },
  {
    name: '维克托·吉迪恩',
    englishName: 'Victor Gideon',
    role: '首要嫌疑人',
    mark: 'VG',
    tone: 'toxic',
    description:
      '席卷美国的离奇死亡事件首要嫌疑人。据现有资料，他曾是安布雷拉公司的 T 病毒研究专家。',
    tags: ['前安布雷拉研究员', '危险人物'],
  },
]

function CharacterCard({ character, index }) {
  return (
    <article
      className={`character-card ${character.featured ? 'featured' : ''}`}
      style={{ '--delay': `${index * 70}ms` }}
    >
      <div className={`portrait portrait-${character.tone}`}>
        {character.image ? (
          <img src={character.image} alt={`${character.name}角色肖像`} />
        ) : (
          <span aria-hidden="true">{character.mark}</span>
        )}
        <i />
      </div>
      <div className="character-info">
        <div className="character-number">
          FILE {String(index + 1).padStart(2, '0')}
        </div>
        <p className="role">{character.role}</p>
        <h2>{character.name}</h2>
        <p className="english-name">{character.englishName}</p>
        <p className="description">{character.description}</p>
        {character.link && (
          <a
            className="character-link"
            href={character.link}
            target="_blank"
            rel="noreferrer"
          >
            查看 Leon 维基百科资料 <span aria-hidden="true">↗</span>
          </a>
        )}
        <ul className="tags" aria-label="角色标签">
          {character.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function App() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回顶部">
          <span>RE</span>
          <i />
          <strong>REQUiem</strong>
        </a>
        <nav aria-label="页面导航">
          <a href="#characters">角色档案</a>
          <a href="#about">事件背景</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-media" aria-hidden="true">
            <img src={publicAsset('re9_hero.gif.gif')} alt="" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">BIOHAZARD INCIDENT ARCHIVE · 2026</p>
            <h1 id="page-title">
              死者的安魂曲
              <span>生者的噩梦</span>
            </h1>
            <p className="intro">
              两条命运轨迹，一场重返浣熊市阴影的调查。
              认识《生化危机：安魂曲》中的关键人物。
            </p>
            <a className="primary-link" href="#characters">
              查阅角色档案 <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-emblem" aria-hidden="true">
            <span>IX</span>
            <p>RACCOON CITY<br />INCIDENT</p>
          </div>
        </section>

        <section className="characters-section" id="characters">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONFIDENTIAL / PERSONNEL</p>
              <h2>角色档案</h2>
            </div>
            <p>以下内容基于官方公开资料整理，不含关键剧情剧透。</p>
          </div>

          <div className="character-grid">
            {characters.map((character, index) => (
              <CharacterCard
                character={character}
                index={index}
                key={character.englishName}
              />
            ))}
          </div>
        </section>

        <section className="incident" id="about">
          <p className="eyebrow">CASE OVERVIEW</p>
          <div>
            <h2>一切始于一间<br />废弃酒店</h2>
            <p>
              美国中西部的一间废弃酒店发现尸体，这是全国神秘死亡事件中的最新一起。
              格蕾丝奉命调查，而当一名警员在酒店失踪，经验丰富的里昂也被派往现场。
              两人的道路由此交汇，并指向那场改变世界的浣熊市事件。
            </p>
          </div>
        </section>
      </main>

      <footer>
        <p>非官方网站 · 角色资料整理页</p>
        <a
          href="https://www.residentevil.com/requiem/en-asia/"
          target="_blank"
          rel="noreferrer"
        >
          资料来源：CAPCOM 官方网站 ↗
        </a>
      </footer>
    </div>
  )
}

export default App
