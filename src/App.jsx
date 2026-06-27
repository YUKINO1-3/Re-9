import { useEffect, useRef, useState } from 'react'
import './App.css'

const publicAsset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`
const getViewFromHash = (hash) => {
  if (hash === '#characters') return 'characters'
  if (/^#character-[a-z-]+$/.test(hash)) return 'character-detail'
  if (hash === '#story') return 'story'
  if (/^#story-\d{2}$/.test(hash)) return 'story-detail'
  return 'landing'
}

const storyChapters = [
  {
    number: '01',
    label: 'THE AFTERMATH',
    title: '浣熊市事件之后',
    text: [
      '1998 年，浣熊市因安布雷拉公司的病毒泄漏陷入毁灭。灾难最终被彻底掩埋，但它留下的并不只有废墟：幸存者的创伤、安布雷拉散落的研究成果，以及围绕生化武器形成的利益网络，继续影响着此后二十八年的世界。',
      '《生化危机：安魂曲》的故事发生在 2026 年。它重新连接系列早期围绕浣熊市展开的主线，并将那场灾难从一段历史，变成仍在影响现实的未结案件。',
    ],
    detail: [
      {
        title: '无法结束的感染',
        paragraphs: [
          '浣熊市在 1998 年被导弹摧毁后，官方叙事将事件描述成已经完成隔离的灾难。但到了 2026 年，一批浣熊市幸存者陆续出现异常感染与死亡。调查人员将这种由残留 T 病毒变异引发的现象称为“浣熊市综合征”（Raccoon City Syndrome，RCS）。它证明当年的毁灭行动只消灭了城市，并没有消灭病毒对幸存者身体造成的长期影响。',
          'Leon S. Kennedy 也是 RCS 患者。他从浣熊市逃生后长期参与反生化行动，身体却一直携带着那场灾难留下的隐患。随着案件推进，他的感染逐渐恶化，这使他调查连环死亡的任务同时成为一场与自身倒计时的竞赛。',
        ],
      },
      {
        title: 'Alyssa 留下的线索',
        paragraphs: [
          'Alyssa Ashcroft 是浣熊市幸存者，也是一名持续追查安布雷拉罪行的记者。逃离城市后，她没有接受官方对灾难的解释，而是继续调查病毒研究、政府掩盖与幸存者遭遇。她掌握的资料最终把她带到雷恩伍德酒店。',
          'Alyssa 在 2018 年于酒店遇害，但她事先留下了一张数据盘。盘中保存着她对安布雷拉创始人 Oswell E. Spencer 的采访，以及足以改变 Grace 身世认知和整个案件方向的证据。八年后，这张盘成为把过去与现在连接起来的核心物证。',
        ],
      },
      {
        title: '被掩盖的真正目标',
        paragraphs: [
          '后期揭示表明，当年针对浣熊市的导弹打击并不只是为了控制病毒。犯罪组织“联盟”（The Connections）推动毁灭城市，也是在掩盖埋藏于城市地下的 ARK 设施与 Elpis 项目。换言之，浣熊市的数十万死者不仅是病毒泄漏的受害者，也成为一场更大规模秘密清除行动的代价。',
          '2026 年的案件因此不是一次孤立的新疫情，而是 1998 年未完成阴谋的延续。Victor Gideon、Zeno、美国政府、联盟和安布雷拉遗产之间的关系，最终都在浣熊市废墟下汇合。',
        ],
      },
    ],
  },
  {
    number: '02',
    label: 'THE WRENWOOD CASE',
    title: '雷恩伍德酒店命案',
    text: [
      '美国中西部接连发生性质异常的死亡事件，部分线索与当年的浣熊市幸存者产生联系。最新一名死者出现在已经废弃的雷恩伍德酒店，FBI 因此派出情报分析员 Grace Ashcroft 前往调查。',
      '这间酒店对 Grace 而言并非普通现场。八年前，她的母亲 Alyssa Ashcroft 正是在这里遇害。重返酒店意味着她不仅要分析一宗新的命案，也必须重新面对一直没有得到答案的私人创伤。',
    ],
    detail: [
      {
        title: 'Grace 接受任务',
        paragraphs: [
          'FBI 主管 Nathan Dempsy 将最新死亡事件交给 Grace Ashcroft 分析。Grace 是一名优秀的情报分析员，擅长从文件、现场痕迹与数据中建立联系，但她并不是受过重型战斗训练的外勤特工。任务地点正是母亲死亡的雷恩伍德酒店，这让她从开始便处于强烈的心理压力之下。',
          'Grace 在酒店调查最新死者时，确认案件与浣熊市幸存者连续死亡有关。她也找到 Alyssa 留下的数据盘，却没来得及完整读取内容。Victor Gideon 突然袭击并绑架了她，因为他多年来一直在寻找 Grace，并相信她是开启 Elpis 的关键。',
        ],
      },
      {
        title: 'Leon 的追捕',
        paragraphs: [
          'Leon 同时在调查幸存者死亡与自身的 RCS 症状。他目击 Victor 带走 Grace 后立即追击。Victor 为制造逃脱机会，在附近释放 T 病毒并感染平民，使现场迅速演变成新的丧尸暴发。',
          'Victor 趁混乱将 Grace 转移至罗兹山慢性护理中心。Leon 的行动由 DSO 特工 Sherry Birkin 提供远程支持。Sherry 同样是浣熊市事件的幸存者，她帮助 Leon 追踪车辆和设施位置，并在后续调查中持续提供情报。',
        ],
      },
      {
        title: '酒店命案的意义',
        paragraphs: [
          '雷恩伍德酒店既是 Alyssa 死亡的地方，也是 Victor 故意等待 Grace 回到调查视野的诱饵。案件表面上是一具尸体，实际目的是迫使 FBI 将 Grace 派到 Victor 能够控制的地点。',
          'Grace 找到数据盘却随即被绑架，说明 Victor 知道 Alyssa 曾接触 Spencer，也知道数据盘可能保存 Elpis 的真相。他需要 Grace，却并不真正理解她为何重要；这种建立在误读之上的执念，最终贯穿他的全部行动。',
        ],
      },
    ],
  },
  {
    number: '03',
    label: 'TWO INVESTIGATIONS',
    title: '两条交汇的调查线',
    text: [
      'Grace 擅长资料分析、观察与推理，却缺乏应对生化灾害的实战经验。她的调查强调受限资源、逃生与未知威胁带来的恐惧；每一条线索都在把她推向母亲死亡背后的真相。',
      '与此同时，一名参与调查的警员失踪，DSO 资深特工 Leon S. Kennedy 介入案件。作为浣熊市事件的亲历者，Leon 对病毒、安布雷拉遗产与生化恐怖主义拥有截然不同的认识。他的路线更直接，也更接近武装对抗。',
      '两位主角从不同方向追踪同一场危机：Grace 代表第一次直面噩梦的人，Leon 则代表被噩梦追逐了二十八年的人。',
    ],
    detail: [
      {
        title: 'Grace 的生存路线',
        paragraphs: [
          'Grace 在护理中心的拘禁区醒来后设法脱身。设施已经失控，她缺少武器与弹药，只能依靠观察环境、躲避敌人和解决机关继续前进。巨型变异体“The Girl”不断追踪她，使这段调查变成近乎持续的逃亡。',
          '她在设施深处发现 Emily——一名失明、遭到长期拘禁和实验的少女。Grace 将 Emily 视为必须保护的受害者，也在她身上投射了自己未能挽救母亲的愧疚。两人结伴逃生后，Grace 开始从被动求生转向主动保护他人。',
        ],
      },
      {
        title: 'Leon 的战斗路线',
        paragraphs: [
          'Leon 抵达护理中心时，Victor 已经用变异 T 病毒感染员工和患者，并封锁设施。Leon 与 Grace 被迫从不同区域推进。相比 Grace 的躲避和资源管理，Leon 直接对抗大量感染者和大型生化兵器，并试图赶在设施彻底崩溃前找到她。',
          '他的 RCS 症状在战斗中持续加重。Leon 一方面承担经验丰富的救援者角色，另一方面也清楚自己可能成为下一个失控感染者。Sherry 的联络成为他维持调查方向和个人意志的重要支点。',
        ],
      },
      {
        title: 'Emily 的悲剧',
        paragraphs: [
          'Grace 带 Emily 逃离时，Emily 遭到重创并发生变异。Grace 成功利用日光杀死追踪她的 The Girl，却无法阻止 Emily 转化成怪物。Leon 为保护 Grace和控制局势被迫将变异后的 Emily 制伏。',
          'Grace 将这一结果视为 Leon 对 Emily 的伤害，也认为自己再次没能保护重要的人。Victor 与 Zeno 利用她的绝望，诱导她放弃 Leon 并随他们前往浣熊市。双主角的合作在此破裂，但两人的调查实际上仍指向同一个终点。',
        ],
      },
    ],
  },
  {
    number: '04',
    label: 'THE CARE CENTER',
    title: '罗兹山慢性护理中心',
    text: [
      '调查逐渐从废弃酒店延伸至罗兹山慢性护理中心。这里表面上是医疗设施，内部却保留着实验、拘禁与生化研究留下的痕迹。Grace 在设施中发现神秘少女 Emily，她的身体状态与遭遇成为案件的重要突破口。',
      '护理中心把多条线索连接在一起：异常死亡、人体实验、失踪人员，以及安布雷拉旧研究可能仍被利用的事实。Victor Gideon 也由此进入调查核心——这名前安布雷拉 T 病毒研究人员被视为连环事件的首要嫌疑人。',
    ],
    detail: [
      {
        title: 'Victor 的实验设施',
        paragraphs: [
          '罗兹山慢性护理中心只是公开外壳。Victor 在设施内部延续安布雷拉式的人体实验，研究 T 病毒变种、意识转移和可控生化兵器。员工和患者都可能被当成实验材料；当 Leon 逼近时，Victor 更直接感染整座设施以销毁证据并拖延追捕。',
          'The Girl、Emily 以及中心内其他异常生物并非偶然感染，而是长期实验的结果。环境文件和实验区域逐步说明，Victor 试图复现 Spencer 未完成的研究，却只掌握了残缺资料。',
        ],
      },
      {
        title: 'Emily 与“Grace 克隆体”谎言',
        paragraphs: [
          'Zeno 告诉 Grace，Emily 是众多以 Grace 为模板制造的克隆实验体之一，实验目的是为 Spencer 的意识寻找新身体。他进一步声称 Grace 是唯一成功的产物，因此天生知道打开 Elpis 的密码。',
          '这个解释能够合理化 Victor 对 Grace 的执着，却并不是真相。Alyssa 的数据盘后来证明，Grace 是自然出生、失去父母后被 Spencer 收养的普通孩子。Emily 与其他实验体的存在是真实的，但 Grace 并不是她们的原型或成功克隆体。',
        ],
      },
      {
        title: '从救援到操纵',
        paragraphs: [
          'Victor 对 Grace 表现出的关注不是保护，而是把她当成开启 Elpis 的工具。Zeno则代表联盟的利益，他希望取得 Spencer 的最终成果并将其作为武器。两人都依赖对 Spencer 研究的错误理解行动。',
          'Emily 的变异让 Grace 心理崩溃，也给了他们操纵她的机会。她自愿随 Victor 和 Zeno 离开，并非真正认同二人，而是相信只有前往 ARK 才可能理解 Emily、母亲和自己的身世。',
        ],
      },
    ],
  },
  {
    number: '05',
    label: 'RETURN TO GROUND ZERO',
    title: '重返灾难原点',
    text: [
      '所有调查最终都指向同一个无法回避的地点：浣熊市遗址。政府当年的毁灭行动抹去了城市，却没有彻底清除埋藏在地下的秘密。废墟既是 Leon 一切经历的起点，也是 Grace 家族命运与案件真相交汇的终点。',
      '重返浣熊市不只是对经典地点的回望。故事借此追问：灾难被掩盖之后，谁继承了安布雷拉的遗产？幸存者是否真正逃离了那一天？而所谓的“安魂曲”，究竟献给死者，还是献给仍被过去囚禁的生者？',
    ],
    detail: [
      {
        title: 'ARK 与密码“Hope”',
        paragraphs: [
          'Zeno 将 Grace 带入浣熊市地下的 ARK 设施。Elpis 被保护在核心区域，输入错误密码会直接销毁项目。Zeno 相信 Grace 继承了 Spencer 的意识，因此能够本能地给出答案。Leon 和 Sherry 追踪众人进入废墟，Leon 与 Victor 交战后救出 Grace，但恶化的感染使两人再次分开。',
          'Grace 最终读取 Alyssa 的数据盘。录像中，Spencer 承认自己对安布雷拉造成的灾难感到悔恨，并说明 Grace 只是他收养的孤儿，不是克隆实验产物。他将 Grace 交给 Alyssa抚养，并称她为自己的“希望”。Grace 因此判断密码是“Hope”，成功打开 Elpis。',
        ],
      },
      {
        title: 'Elpis 的真正性质',
        paragraphs: [
          'Victor 和 Zeno 一直把 Elpis 当作能够传播并控制人类的终极病毒。真相恰好相反：Elpis 是 Spencer 在晚年创造的广谱抗病毒制剂，能够中和病毒型生化武器，也是他试图补偿一生罪行的最后成果。',
          'Zeno 不知情地给自己注射 Elpis，结果清除了维持其强化能力的病毒，反而变回普通人。Grace则使用 Elpis 治愈 Leon 的 RCS。Victor 随后现身杀死 Zeno，仍拒绝接受 Spencer 想要赎罪的事实，并试图将 Elpis 用于颠覆世界秩序。',
        ],
      },
      {
        title: '最终战与正史结局',
        paragraphs: [
          'Victor 启动 ARK 自毁并变异成类似 Nemesis 的大型怪物。Leon 在设施崩塌前完成最终战，彻底杀死 Victor。Chris Redfield 派出的 BSAA Hound Wolf 小队随后救出 Leon 与 Grace。',
          'ARK 的曝光引发全球丑闻，针对安布雷拉、联盟和美国政府的调查重新启动。Grace 使用 Elpis 治愈 Emily，并成为她的监护人；Sherry 的 RCS 也得到治愈。片尾中，两名身份不明的士兵清除残余 BSAA 人员并取走所谓“目标”，为后续冲突留下伏笔。',
        ],
      },
      {
        title: '另一种结局',
        paragraphs: [
          '如果玩家选择摧毁 Elpis或输入错误答案，项目会被销毁。Grace虽然逃出设施，但 Leon 在保护她时被杀，ARK 也随自毁程序彻底崩塌。游戏随后明显引导玩家重新考虑选择。',
          '释放并正确开启 Elpis 的结局拥有额外最终战、完整尾声与片尾场景，因此被视为故事继续发展的正史路线。两个结局的差异集中表达了游戏主题：真正的希望来自理解和修正过去，而不是再次用毁灭掩盖它。',
        ],
      },
    ],
  },
]

const characters = [
  {
    slug: 'grace-ashcroft',
    name: 'Grace Ashcroft',
    englishName: 'Grace Ashcroft',
    role: 'FBI 情报分析员',
    mark: 'GA',
    tone: 'amber',
    image: publicAsset('Grace%20Ashcroft.jpg'),
    imageClass: 'grace-portrait',
    link: 'https://en.wikipedia.org/wiki/Grace_Ashcroft',
    linkLabel: '查看 Grace 维基百科资料',
    featured: true,
    description:
      '拥有出色的专注力、洞察力与推理能力。母亲的死亡让她变得内向，并把自己埋进工作之中。一次发生在废弃酒店的离奇命案，迫使她独自走回八年前的阴影。',
    tags: ['核心主角', '推理分析', '生存恐怖'],
    facts: [
      ['年龄', '25 岁（2026 年）'],
      ['出生年份', '约 2001 年'],
      ['国籍', '美国'],
      ['所属', '美国联邦调查局（FBI）'],
      ['职位', '情报／技术分析员'],
      ['首次登场', '《生化危机：安魂曲》（2026）'],
      ['状态', '存活'],
    ],
    profile: [
      {
        title: '身世与成长',
        paragraphs: [
          'Grace 幼年失去亲生父母，后来由 Oswell E. Spencer 收养。Spencer 晚年开始反思安布雷拉造成的灾难，并将 Grace 交给调查记者 Alyssa Ashcroft 抚养。Grace 因此沿用 Ashcroft 姓氏，把 Alyssa 视为自己的母亲。',
          'Alyssa 是 1998 年浣熊市事件的幸存者。她没有因为逃离灾区而停止调查，反而继续追查安布雷拉、政府掩盖和病毒研究的遗产。Grace 在这样的家庭中长大，却长期不知道自己的收养经历以及她与 Spencer 之间的联系。',
        ],
      },
      {
        title: '母亲之死与 FBI 生涯',
        paragraphs: [
          '2018 年，Alyssa 在雷恩伍德酒店遇害。母亲的死亡令 Grace 变得封闭、焦虑，她把精力投入工作，以分析和秩序对抗无法解决的创伤。她随后进入 FBI，成为擅长文件研判、现场信息整合和演绎推理的情报分析员。',
          'Grace 并非传统意义上的战斗型特工。她的优势是专注、观察和推理，面对生化灾害时则必须依靠有限资源、环境判断与潜行求生。这种脆弱性也使她成为与 Leon 完全不同的主角。',
        ],
      },
      {
        title: '雷恩伍德事件',
        paragraphs: [
          '2026 年，FBI 主管 Nathan Dempsy 派 Grace 调查一连串异常死亡。最新现场正是母亲遇害的雷恩伍德酒店。Grace 在酒店找到 Alyssa 留下的数据盘，却随即遭前安布雷拉研究员 Victor Gideon 绑架，并被转移到罗兹山慢性护理中心。',
          '逃亡途中，她发现并保护实验受害者 Emily。随后，Alyssa 的资料揭开 Grace 的真实身世，也让她识破所谓“Spencer 克隆体”的谎言。Grace 最终理解 Elpis 并非病毒武器，而是广谱抗病毒制剂；她以密码“Hope”开启项目，治愈 Leon，并在事件结束后承担起照顾 Emily 的责任。',
        ],
      },
      {
        title: '性格与能力',
        paragraphs: [
          'Grace 内向谨慎，遭遇威胁时会表现出真实的恐惧，但她并不缺乏勇气。她的成长不在于突然成为成熟战士，而在于学会带着恐惧行动，并从被动求生转向主动保护他人。',
          '她擅长证据分析、机关解读和资源规划，能利用感染者血液制作弹药、道具及特殊注射剂。她与 Leon 的经验差异构成故事核心：Leon 代表经历过无数灾难的幸存者，Grace 则代表第一次直面噩梦的普通人。',
        ],
      },
    ],
  },
  {
    slug: 'leon-s-kennedy',
    name: 'Leon S. Kennedy',
    englishName: 'Leon S. Kennedy',
    role: 'DSO 资深特工',
    mark: 'LK',
    tone: 'steel',
    image: publicAsset('Leon%201.jpg'),
    link: 'https://en.wikipedia.org/wiki/Leon_S._Kennedy',
    linkLabel: '查看 Leon 维基百科资料',
    featured: true,
    description:
      '浣熊市事件的幸存者之一。凭借坚定的正义感与丰富的实战经验，他多年来一直奋战在生化恐怖事件的最前线，如今再次受命调查美国中西部的连环死亡事件。',
    tags: ['核心主角', '反生化专家', '动作战斗'],
    facts: [
      ['年龄', '49 岁（2026 年）'],
      ['出生年份', '1977 年'],
      ['国籍', '美国'],
      ['所属', 'DSO（安全行动司）'],
      ['职业', '联邦特工'],
      ['首次登场', '《生化危机 2》（1998）'],
      ['状态', '存活'],
    ],
    profile: [
      {
        title: '浣熊市的新任警员',
        paragraphs: [
          'Leon 于 1977 年出生。1998 年，21 岁的他作为新任警员前往浣熊市报到，却在抵达首日撞上全面失控的 T 病毒疫情。他与 Claire Redfield 分头求生，并保护年幼的 Sherry Birkin 逃离城市。',
          '这一天奠定了 Leon 此后的人生方向。他亲眼见证安布雷拉实验的后果、政府的封锁以及普通人的死亡，也从一名缺乏实战经验的警员变成浣熊市事件少数幸存者之一。',
        ],
      },
      {
        title: '从特工到反生化专家',
        paragraphs: [
          '事件后，Leon 被美国政府吸收并接受高强度训练。他先后处理总统女儿 Ashley Graham 绑架案、东斯拉夫生化武器危机、Tall Oaks 疫情及多起跨国生化恐怖事件，长期与 Ada Wong、Chris Redfield、Claire 和 Sherry 等人产生交集。',
          '持续近三十年的行动使他具备枪械、近身格斗、战术判断和生化兵器应对能力。他保留强烈的正义感和保护平民的本能，但浣熊市以及一次次未能挽救所有人的经历，也在他身上留下明显的疲惫与创伤。',
        ],
      },
      {
        title: '2026 年调查',
        paragraphs: [
          '成为 DSO 资深特工后，Leon 调查美国中西部的连续死亡事件。他发现受害者多为浣熊市幸存者，而自己也受到残留病毒变异引发的“浣熊市综合征”影响。身体恶化使这次任务同时成为对自身命运的追查。',
          'Leon 追踪 Victor 进入罗兹山护理中心，并与 Grace 的调查线汇合。他最终深入浣熊市地下 ARK 设施，击败变异后的 Victor。Grace 使用 Elpis 清除其体内感染，使 Leon 从持续多年的病毒阴影中获得真正获救的可能。',
        ],
      },
      {
        title: '战斗方式与人物特质',
        paragraphs: [
          'Leon 能熟练使用手枪、霰弹枪等多种枪械，并以战斧、格挡、近战和临场夺取的敌方武器衔接战斗。他的装备管理和武器改装能力，体现了长期外勤行动形成的系统化经验。',
          '他常以冷静和幽默缓解压力，却并非对恐惧麻木。Leon 的核心特质始终是即使清楚代价，仍选择进入危险区域救人；这也使他在 Grace 眼中既是强大的保护者，也是被过去长期困住的幸存者。',
        ],
      },
    ],
  },
  {
    slug: 'alyssa-ashcroft',
    name: 'Alyssa Ashcroft',
    englishName: 'Alyssa Ashcroft',
    role: '记者 / 浣熊市幸存者',
    mark: 'AA',
    tone: 'crimson',
    image: publicAsset('alyssa%20ashcroft%20re9.jpg'),
    imageClass: 'alyssa-portrait',
    description:
      '格蕾丝的母亲，也是一位意志坚定的调查记者。逃离浣熊市后，她没有停止追寻真相，而是继续调查安布雷拉留下的秘密。',
    tags: ['关键人物', '调查记者'],
    facts: [
      ['年龄', '约 48 岁（2018 年遇害时）'],
      ['出生年份', '约 1970 年'],
      ['国籍', '美国'],
      ['职业', '调查记者'],
      ['亲属', 'Grace Ashcroft（养女）'],
      ['首次登场', '《生化危机：爆发》（2003）'],
      ['状态', '已故（2018）'],
    ],
    profile: [
      {
        title: '调查记者',
        paragraphs: [
          'Alyssa 是一名意志强硬、行动果断的调查记者。她善于开锁、搜集证据并追踪企业和公共机构不愿公开的事实。早在浣熊市灾难前，她便接触过当地涉及非法研究与权力寻租的线索。',
          '她的职业本能并不只是好奇心，而是对权力问责的坚持。面对威胁时，Alyssa 往往以尖锐态度掩饰压力，这种性格帮助她在灾难中保持行动能力，也让她在余生始终无法接受官方给出的简单结论。',
        ],
      },
      {
        title: '浣熊市幸存者',
        paragraphs: [
          '1998 年 T 病毒疫情席卷浣熊市时，Alyssa 与其他市民在医院、地下设施、大学等区域寻找出路。她不只是逃生，还沿途保留安布雷拉人体实验和病毒泄漏的证据。',
          '城市最终遭到摧毁，Alyssa 成为确认存活的事件亲历者。逃离并未结束她的调查：她继续追查安布雷拉、政府和灾难掩盖之间的关系，让自己的记者生涯与浣熊市遗产永久绑定。',
        ],
      },
      {
        title: '成为 Grace 的母亲',
        paragraphs: [
          'Oswell E. Spencer 晚年将年幼的 Grace 托付给 Alyssa。她接纳这个失去原生家庭的孩子，让 Grace 使用自己的姓氏并以母女身份共同生活。她没有把 Spencer 的全部秘密告诉 Grace，可能是为了让孩子远离安布雷拉遗产。',
          '作为母亲，Alyssa 的死亡对 Grace 造成了比任何案件都更深的创伤；作为记者，她留下的资料又成为 Grace 最终理解自己身世的关键。母女关系因此贯穿私人情感与整个阴谋调查。',
        ],
      },
      {
        title: '最后的调查与遗产',
        paragraphs: [
          'Alyssa 追踪 Spencer、Elpis 和 ARK 的线索来到雷恩伍德酒店，并提前保存数据盘。2018 年，她在酒店遭 Victor Gideon 杀害，案件此后八年未获真正解决。',
          '数据盘中的采访证明 Grace 并非克隆体，也揭示 Elpis 的抗病毒性质。Alyssa 未能亲自公开真相，但她留下的证据最终阻止 Victor 和 Zeno 利用项目，并让二十八年前被掩盖的历史重新进入公众视野。',
        ],
      },
    ],
  },
  {
    slug: 'nathan-dempsy',
    name: 'Nathan Dempsy',
    englishName: 'Nathan Dempsy',
    role: 'FBI 主管',
    mark: 'ND',
    tone: 'slate',
    image:
      'https://www.residentevil.com/requiem/assets/images/character/character_nathan_thumb1.webp',
    imageClass: 'nathan-portrait',
    description:
      '格蕾丝在 FBI 的上司。他清楚格蕾丝仍被母亲之死困扰，却依然将近期连环死亡事件的调查任务交给了她。',
    tags: ['FBI', '任务委托人'],
    facts: [
      ['年龄', '官方未公开'],
      ['出生年份', '官方未公开'],
      ['国籍', '美国'],
      ['所属', '美国联邦调查局（FBI）'],
      ['职位', '主管特工'],
      ['首次登场', '《生化危机：安魂曲》（2026）'],
      ['状态', '在职'],
    ],
    profile: [
      {
        title: 'FBI 主管',
        paragraphs: [
          'Nathan Dempsy 是 Grace 在 FBI 的直属上司，负责统筹情报人员并分配调查任务。官方尚未公开他的出生年月、早期经历或具体晋升履历，因此这些项目在档案中保持空缺。',
          '与直接进入生化灾区的行动人员不同，Nathan 的职责更接近案件管理：确认线索价值、调配分析资源，并在机构流程与现场需要之间做出判断。',
        ],
      },
      {
        title: '对 Grace 的态度',
        paragraphs: [
          'Nathan 知道 Alyssa 的死亡给 Grace 留下严重心理创伤，也清楚雷恩伍德酒店对她意味着什么。他没有隐瞒任务地点，并让 Grace 自己决定是否接手调查。',
          '这种做法同时体现信任与风险：Grace 是最能理解 Alyssa 背景的人，却也是最可能被现场触发创伤的人。Nathan 最终选择相信她的专业判断，而不是只把她视为需要被保护的下属。',
        ],
      },
      {
        title: '连环死亡调查',
        paragraphs: [
          '2026 年，美国多地出现性质异常的死亡事件，受害者逐渐显露出与 1998 年浣熊市灾难的联系。雷恩伍德酒店发现新尸体后，Nathan 将 Grace 派往现场进行情报分析。',
          '这项任务成为整个事件的入口：Grace 在酒店找到母亲留下的资料，也进入 Victor 预先设置的陷阱。Nathan 并非后续生化战斗的核心参与者，但他作出的派遣决定让被搁置八年的案件重新启动。',
        ],
      },
      {
        title: '人物定位',
        paragraphs: [
          'Nathan 代表危机初期仍按正常司法程序运作的机构视角。他掌握的信息有限，面对的最初只是连环死亡与废弃酒店现场，而非完整的安布雷拉遗产。',
          '现有公开资料没有显示他具备生化研究或一线作战背景。与其补写未经证实的经历，本档案保留这些未知项，并将重点放在他与 Grace 的工作关系及案件触发作用上。',
        ],
      },
    ],
  },
  {
    slug: 'emily',
    name: 'Emily',
    englishName: 'Emily',
    role: '神秘少女',
    mark: 'EM',
    tone: 'ivory',
    image: publicAsset(
      '%F0%9D%90%B8%F0%9D%91%9A%F0%9D%91%96%F0%9D%91%99%F0%9D%91%A6%60.jpg',
    ),
    imageClass: 'emily-portrait',
    description:
      '格蕾丝在护理中心发现的少女。她面色苍白、身体异常消瘦，被困于危险设施之中的原因仍是一个谜。',
    tags: ['神秘人物', '护理中心'],
    facts: [
      ['年龄', '官方未公开（未成年）'],
      ['出生年份', '官方未公开'],
      ['实验编号', 'Subject 171'],
      ['所在地点', '罗兹山慢性护理中心'],
      ['身体状况', '失明／长期实验受害者'],
      ['首次登场', '《生化危机：安魂曲》（2026）'],
      ['状态', '获救并接受治疗'],
    ],
    profile: [
      {
        title: '护理中心的少女',
        paragraphs: [
          'Emily 是 Grace 在罗兹山慢性护理中心发现的失明少女。她面色异常苍白、身体消瘦，显然经历过长期拘禁、营养不足和实验伤害。官方未公开她的准确年龄、出生地及亲生家庭。',
          '在设施记录中，她被称为 Subject 171。这个编号说明护理中心并非单纯收治患者，而是在持续管理一批被物化为实验材料的儿童。',
        ],
      },
      {
        title: '实验与身份谎言',
        paragraphs: [
          'Victor Gideon 延续安布雷拉式的人体实验，试图理解 Spencer 的意识转移研究和 Elpis 项目。Emily 与其他少女被卷入这一计划，并被 Zeno 描述为以 Grace 为模板制造的克隆体。',
          'Alyssa 留下的资料最终证明，Grace 并非 Spencer 的成功克隆体，Victor 对项目基础的理解从一开始就是错误的。Emily 的真实来源仍有未公开部分，但她作为实验受害者的身份并不因此改变。',
        ],
      },
      {
        title: '与 Grace 的逃亡',
        paragraphs: [
          'Grace 在护理中心脱困后发现 Emily，并决定带她一起逃离。保护 Emily 使 Grace 从单纯寻找出口转向主动承担他人的生命，两人之间迅速建立起依赖关系。',
          '逃亡中 Emily 遭受重创并发生病毒变异。Leon 为保护 Grace 和控制局势被迫制服她，这一幕让 Grace 误以为自己再次失去了重要的人，也成为 Victor 和 Zeno操纵她继续前往 ARK 的突破口。',
        ],
      },
      {
        title: '事件之后',
        paragraphs: [
          'Elpis 被确认是能够中和病毒型生化武器的广谱抗病毒制剂，而非 Victor 所期待的控制型病毒。正史结局中，Grace 使用这一成果治疗 Emily，使她从实验和变异造成的伤害中获救。',
          'Grace 随后成为 Emily 的监护人。这一选择回应了 Alyssa 当年接纳 Grace 的经历：一个被阴谋夺走家庭的孩子，最终选择为另一个受害者提供新的家庭。',
        ],
      },
    ],
  },
  {
    slug: 'victor-gideon',
    name: 'Victor Gideon',
    englishName: 'Victor Gideon',
    role: '首要嫌疑人',
    mark: 'VG',
    tone: 'toxic',
    image: publicAsset('victor.jpg'),
    imageClass: 'victor-portrait',
    description:
      '席卷美国的离奇死亡事件首要嫌疑人。据现有资料，他曾是安布雷拉公司的 T 病毒研究专家。',
    tags: ['前安布雷拉研究员', '危险人物'],
    facts: [
      ['年龄', '官方未公开'],
      ['出生年份', '官方未公开'],
      ['原所属', '安布雷拉公司'],
      ['专业', 'T 病毒研究'],
      ['身份', '连环死亡案首要嫌疑人'],
      ['首次登场', '《生化危机：安魂曲》（2026）'],
      ['状态', '已死亡（2026）'],
    ],
    profile: [
      {
        title: '前安布雷拉研究员',
        paragraphs: [
          'Victor Gideon 曾供职于安布雷拉公司，专攻 T 病毒相关研究。他掌握旧时代的病毒知识，却没有完整继承 Spencer 的核心资料；安布雷拉倒台后，他继续以残缺信息追逐其创始人的最终成果。',
          '官方未公开 Victor 的出生年月、国籍和加入安布雷拉的具体时间。可以确认的是，他并未真正放弃公司的研究逻辑，而是把人体实验、病毒强化与生化兵器视为实现目标的合理手段。',
        ],
      },
      {
        title: '罗兹山实验',
        paragraphs: [
          'Victor 将罗兹山慢性护理中心变成秘密实验设施，利用员工、患者和被拘禁的少女研究 T 病毒变种、意识转移及可控生化兵器。The Girl、Emily 等个体都是这一体系的受害者。',
          '当调查人员逼近时，他直接释放病毒感染设施中的平民，以制造混乱、销毁证据并延缓 Leon 的追踪。这种选择显示他与安布雷拉最极端的研究人员没有本质区别。',
        ],
      },
      {
        title: '对 Grace 的执念',
        paragraphs: [
          'Victor 得知 Spencer 曾收养一名孩子，便错误地认定 Grace 是意识转移实验的成功产物，并相信她本能地掌握开启 Elpis 的方法。他杀害 Alyssa、在酒店布置线索，并等待 Grace 被重新带入调查。',
          '他需要 Grace 作为工具，却从未真正理解她的身世。Zeno 关于克隆体和终极病毒的叙述进一步强化了这一误判，使 Victor 的整个计划建立在对 Spencer 遗产的错误解读上。',
        ],
      },
      {
        title: 'ARK 与最终结局',
        paragraphs: [
          '所有线索最终汇聚到浣熊市地下 ARK 设施。Grace 通过 Alyssa 的数据盘确认密码“Hope”，并揭示 Elpis 实际是抗病毒制剂。这个真相否定了 Victor 对力量和控制的全部期待。',
          'Victor 杀死 Zeno、启动 ARK 自毁，并发生类似 Nemesis 的大型变异。他最终在设施崩塌前被 Leon 击败。其结局延续了安布雷拉研究者反复出现的模式：试图驾驭病毒，最后却被自己的研究和执念吞噬。',
        ],
      },
    ],
  },
]

function CharacterCard({ character, index }) {
  return (
    <a
      className={`character-card ${character.featured ? 'featured' : ''}`}
      href={`#character-${character.slug}`}
      aria-label={`查看 ${character.name} 的完整人物档案`}
      style={{ '--delay': `${index * 70}ms` }}
    >
      <div className={`portrait portrait-${character.tone}`}>
        {character.image ? (
          <img
            className={character.imageClass}
            src={character.image}
            alt={`${character.name}角色肖像`}
          />
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
        <p className="description">{character.description}</p>
        <span className="character-link">
          查阅完整人物档案 <span aria-hidden="true">→</span>
        </span>
        <ul className="tags" aria-label="角色标签">
          {character.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </a>
  )
}

function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(() => {
    const savedVolume = Number(localStorage.getItem('requiem-volume'))
    return Number.isFinite(savedVolume) ? savedVolume : 0.45
  })

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    localStorage.setItem('requiem-volume', String(volume))
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const attemptAutoplay = async () => {
      try {
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    }

    attemptAutoplay()
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <aside className={`music-player ${isPlaying ? 'is-playing' : ''}`}>
      <audio
        ref={audioRef}
        src={publicAsset('bgmusic.mp3')}
        autoPlay
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        className="music-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? '暂停背景音乐' : '播放背景音乐'}
      >
        <span className="music-disc" aria-hidden="true">
          IX
        </span>
        <span className="music-status">
          <small>ORIGINAL SOUNDTRACK</small>
          <strong>{isPlaying ? 'NOW PLAYING' : 'PLAY BGM'}</strong>
        </span>
      </button>
      <label className="volume-control">
        <span aria-hidden="true">{volume === 0 ? '×' : '♪'}</span>
        <span className="sr-only">背景音乐音量</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
    </aside>
  )
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const view = getViewFromHash(hash)

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash
      setHash(nextHash)

      if (
        nextHash === '#home' ||
        nextHash === '#story' ||
        nextHash === '#characters' ||
        /^#character-[a-z-]+$/.test(nextHash) ||
        /^#story-\d{2}$/.test(nextHash)
      ) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const isCharacters = view === 'characters'
  const isCharacterDetail = view === 'character-detail'
  const isStory = view === 'story'
  const isStoryDetail = view === 'story-detail'
  const isLanding = view === 'landing'
  const activeChapterIndex = isStoryDetail
    ? storyChapters.findIndex(
        (chapter) => `#story-${chapter.number}` === hash,
      )
    : -1
  const activeChapter = storyChapters[activeChapterIndex]
  const activeCharacter = isCharacterDetail
    ? characters.find((character) => `#character-${character.slug}` === hash)
    : undefined
  const activeCharacterIndex = activeCharacter
    ? characters.findIndex((character) => character.slug === activeCharacter.slug)
    : -1

  return (
    <div className={`page-shell ${isLanding ? 'landing-view' : 'archive-view'}`}>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="返回首页">
          <span>RE</span>
          <i />
          <strong>REQUiem</strong>
        </a>
        {!isLanding ? (
          <nav aria-label="页面导航">
            <a
              className={isCharacters || isCharacterDetail ? 'active' : ''}
              href="#characters"
              aria-current={isCharacters || isCharacterDetail ? 'page' : undefined}
            >
              角色档案
            </a>
            <a
              className={isStory || isStoryDetail ? 'active' : ''}
              href="#story"
              aria-current={isStory || isStoryDetail ? 'page' : undefined}
            >
              剧情档案
            </a>
            <a href="#home">首页</a>
          </nav>
        ) : (
          <nav aria-label="首页导航">
            <a href="#characters">角色档案</a>
            <a href="#story">剧情档案</a>
          </nav>
        )}
      </header>

      {isLanding && (
        <main id="top">
          <section className="hero" aria-labelledby="page-title">
            <div className="hero-media" aria-hidden="true">
              <img src={publicAsset('re9_hero.gif.gif')} alt="" />
            </div>
            <div className="hero-copy">
              <p className="eyebrow">BIOHAZARD INCIDENT ARCHIVE · 2026</p>
              <h1 id="page-title">
                Resident Evil Requiem
                <span>Nightmare for the living.</span>
              </h1>
              <p className="intro">
                两条命运轨迹，一场重返浣熊市阴影的调查。
                认识《生化危机：安魂曲》中的关键人物。
              </p>
              <a className="primary-link" href="#characters">
                查阅角色档案 <span aria-hidden="true">→</span>
              </a>
              <a className="secondary-link" href="#story">
                阅读剧情档案 <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-emblem" aria-hidden="true">
              <span>IX</span>
              <p>RACCOON CITY<br />INCIDENT</p>
            </div>
          </section>
        </main>
      )}

      {isCharacters && (
        <>
          <main className="archive-main">
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

            <section className="archive-next">
              <p className="eyebrow">CONTINUE THE INVESTIGATION</p>
              <h2>人物背后的案件，<br />始于二十八年前。</h2>
              <a className="primary-link" href="#story">
                前往剧情档案 <span aria-hidden="true">→</span>
              </a>
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
        </>
      )}

      {isCharacterDetail && activeCharacter && (
        <>
          <main className="character-profile-page">
            <section className="profile-hero">
              <div className="profile-hero-copy">
                <a className="back-link" href="#characters">
                  ← 返回角色档案
                </a>
                <p className="eyebrow">
                  CONFIDENTIAL / PERSONNEL FILE {String(activeCharacterIndex + 1).padStart(2, '0')}
                </p>
                <p className="role">{activeCharacter.role}</p>
                <h1>{activeCharacter.name}</h1>
                <p className="profile-intro">{activeCharacter.description}</p>
                <p className="spoiler-warning">本档案包含人物完整经历与关键剧情剧透。</p>
              </div>
              <div className={`profile-portrait portrait portrait-${activeCharacter.tone}`}>
                {activeCharacter.image ? (
                  <img
                    className={activeCharacter.imageClass}
                    src={activeCharacter.image}
                    alt={`${activeCharacter.name}角色肖像`}
                  />
                ) : (
                  <span aria-hidden="true">{activeCharacter.mark}</span>
                )}
                <i />
              </div>
            </section>

            <dl className="profile-facts" aria-label={`${activeCharacter.name}基本资料`}>
              {activeCharacter.facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <article className="chapter-detail profile-detail">
              {activeCharacter.profile.map((section, index) => (
                <section className="detail-section" key={section.title}>
                  <div className="detail-number">
                    FILE {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>

            <nav className="chapter-navigation" aria-label="人物档案导航">
              {activeCharacterIndex > 0 ? (
                <a href={`#character-${characters[activeCharacterIndex - 1].slug}`}>
                  <span>上一份档案</span>
                  {characters[activeCharacterIndex - 1].name}
                </a>
              ) : (
                <span />
              )}
              {activeCharacterIndex < characters.length - 1 ? (
                <a
                  className="next-chapter"
                  href={`#character-${characters[activeCharacterIndex + 1].slug}`}
                >
                  <span>下一份档案</span>
                  {characters[activeCharacterIndex + 1].name}
                </a>
              ) : (
                <a className="next-chapter" href="#characters">
                  <span>档案结束</span>
                  返回角色目录
                </a>
              )}
            </nav>
          </main>

          <footer>
            <p>非官方网站 · 完整人物档案</p>
            <a
              href="https://www.residentevil.com/requiem/en-asia/"
              target="_blank"
              rel="noreferrer"
            >
              基础资料来源：CAPCOM 官方网站 ↗
            </a>
          </footer>
        </>
      )}

      {isStory && (
        <>
          <main className="story-main">
            <section className="story-hero">
              <p className="eyebrow">CASE FILE / STORY ARCHIVE</p>
              <p className="script-title">A requiem for a city that never died</p>
              <h1>剧情档案</h1>
              <p className="story-lead">
                一宗发生在废弃酒店的命案，让两条相隔二十八年的命运重新交汇。
                以下内容整理游戏的时代背景、调查起点与核心冲突，不涉及最终真相和结局。
              </p>
              <div className="story-meta">
                <span>时间 / 2026</span>
                <span>地点 / 美国中西部</span>
                <span>状态 / 调查进行中</span>
              </div>
            </section>

            <section className="story-timeline" aria-label="剧情背景">
              {storyChapters.map((chapter) => (
                <article className="story-chapter" key={chapter.number}>
                  <div className="chapter-index">
                    <span>{chapter.number}</span>
                    <p>{chapter.label}</p>
                  </div>
                  <div className="chapter-copy">
                    <h2>
                      <a href={`#story-${chapter.number}`}>{chapter.title}</a>
                    </h2>
                    {chapter.text.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </section>

            <section className="story-threads">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">UNRESOLVED THREADS</p>
                  <h2>案件核心</h2>
                </div>
                <p>这些问题推动两位主角深入调查，也构成剧情的主要悬念。</p>
              </div>
              <div className="thread-grid">
                <article>
                  <span>01</span>
                  <h3>幸存者为何接连死亡？</h3>
                  <p>受害者与浣熊市事件之间的联系，意味着二十八年前的感染可能从未真正结束。</p>
                </article>
                <article>
                  <span>02</span>
                  <h3>Alyssa 查到了什么？</h3>
                  <p>她在遇害前仍持续调查安布雷拉。雷恩伍德酒店很可能保存着她未能公开的线索。</p>
                </article>
                <article>
                  <span>03</span>
                  <h3>Victor 的真正目标是什么？</h3>
                  <p>他掌握安布雷拉时代的病毒知识，而 Grace 与 Emily 都可能是其计划中的关键。</p>
                </article>
              </div>
            </section>

            <section className="archive-next story-next">
              <p className="script-title">Every case begins with a name</p>
              <h2>查看卷入事件的<br />全部关键人物。</h2>
              <a className="primary-link" href="#characters">
                前往角色档案 <span aria-hidden="true">→</span>
              </a>
            </section>
          </main>

          <footer>
            <p>非官方网站 · 剧情资料整理页</p>
            <a
              href="https://www.residentevil.com/requiem/en-us/"
              target="_blank"
              rel="noreferrer"
            >
              资料来源：CAPCOM 官方网站 ↗
            </a>
          </footer>
        </>
      )}

      {isStoryDetail && activeChapter && (
        <>
          <main className="chapter-page">
            <header className="chapter-hero">
              <a className="back-link" href="#story">
                ← 返回剧情档案
              </a>
              <p className="script-title">{activeChapter.label}</p>
              <p className="chapter-kicker">
                STORY FILE / {activeChapter.number}
              </p>
              <h1>{activeChapter.title}</h1>
              <p className="spoiler-warning">
                本章节包含完整剧情、关键真相与结局剧透。
              </p>
            </header>

            <article className="chapter-detail">
              {activeChapter.detail.map((section, index) => (
                <section className="detail-section" key={section.title}>
                  <div className="detail-number">
                    {activeChapter.number}.{String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>

            <nav className="chapter-navigation" aria-label="剧情章节导航">
              {activeChapterIndex > 0 ? (
                <a href={`#story-${storyChapters[activeChapterIndex - 1].number}`}>
                  <span>上一章</span>
                  {storyChapters[activeChapterIndex - 1].title}
                </a>
              ) : (
                <span />
              )}
              {activeChapterIndex < storyChapters.length - 1 ? (
                <a
                  className="next-chapter"
                  href={`#story-${storyChapters[activeChapterIndex + 1].number}`}
                >
                  <span>下一章</span>
                  {storyChapters[activeChapterIndex + 1].title}
                </a>
              ) : (
                <a className="next-chapter" href="#story">
                  <span>档案结束</span>
                  返回剧情目录
                </a>
              )}
            </nav>
          </main>

          <footer>
            <p>非官方网站 · 完整剧情档案</p>
            <a href="#story">返回剧情目录 ↑</a>
          </footer>
        </>
      )}

      <MusicPlayer />
    </div>
  )
}

export default App
