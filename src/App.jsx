import React, { useState, useEffect } from 'react';

// ============================================================
// 🔧 설정 영역 - 여기서 데이터를 수정하세요
// ============================================================

const CONFIG = {
  // 사이트 기본 정보
  siteTitle: "III",
  siteSubtitle: "DON'T LOSE YOURSELF",
  
  // 이미지 베이스 경로
  imageBasePath: "/img/",
  
  // 캐릭터 데이터 (9명)
  characters: [
    {
      id: "char-01",
      name: "지목자",
      codename: "SELECTOR",
      image: "P1",
      concept: "「지목 / 선택」",
      description: "손가락으로 가리킨 대상에게 효과를 부여하는 능력자. 그의 선택은 곧 심판이다. 버뮤다에서 가장 냉정한 처형자로 알려져 있으며, 감정 없이 표적을 지목한다.",
      crime: "심판",
      abilities: [
        { stage: 5, name: "표식", desc: "대상 위치 표시 (10초)" },
        { stage: 3, name: "속박", desc: "대상 3초간 강제 정지" },
        { stage: 1, name: "선고", desc: "지목한 대상에게 누적 데미지 폭발" },
      ],
      stats: { power: 8, speed: 5, range: 9, technique: 7, mental: 6 },
      quote: "\"네가 선택된 거야. 거부권 따윈 없어.\""
    },
    {
      id: "char-02",
      name: "연출가",
      codename: "DIRECTOR",
      image: "P2",
      concept: "「무대 / 각본」",
      description: "일정 범위를 '극장'으로 선언하고 그 안에서 규칙을 강제하는 능력자. 모든 것을 자신의 시나리오대로 움직이려 하며, 예상치 못한 변수를 극도로 혐오한다.",
      crime: "조작",
      abilities: [
        { stage: 5, name: "무대설치", desc: "영역 내 발소리/기척 증폭" },
        { stage: 3, name: "독백", desc: "강제 독백 (거짓말 불가)" },
        { stage: 1, name: "커튼콜", desc: "영역 내 모든 것을 30초 전으로 되돌림" },
      ],
      stats: { power: 5, speed: 4, range: 8, technique: 10, mental: 8 },
      quote: "\"이 무대의 주인공은 나야. 넌 그저 엑스트라.\""
    },
    {
      id: "char-03",
      name: "거울",
      codename: "MIRROR",
      image: "P3",
      concept: "「반사 / 모방」",
      description: "상대의 능력을 복제하거나 공격을 되돌리는 능력자. 자신만의 정체성이 없다는 콤플렉스를 가지고 있으며, 타인의 것을 빼앗는 데서 쾌감을 느낀다.",
      crime: "사칭",
      abilities: [
        { stage: 5, name: "잔상", desc: "마지막으로 본 능력의 형태만 복제" },
        { stage: 3, name: "반사", desc: "받은 공격을 50% 위력으로 반사" },
        { stage: 1, name: "완전모방", desc: "상대 능력을 100% 복제하여 사용" },
      ],
      stats: { power: 7, speed: 6, range: 5, technique: 9, mental: 4 },
      quote: "\"네 능력, 꽤 마음에 드는데?\""
    },
    {
      id: "char-04",
      name: "도박사",
      codename: "GAMBLER",
      image: "P4",
      concept: "「확률 / 운」",
      description: "확률을 조작하고 운에 기반한 능력을 사용하는 능력자. 삶 자체를 도박으로 여기며, 불확실성 속에서만 살아있음을 느낀다. 예측 가능한 것을 지루해한다.",
      crime: "사기",
      abilities: [
        { stage: 5, name: "동전던지기", desc: "앞면 회복, 뒷면 데미지" },
        { stage: 3, name: "확률조작", desc: "상대의 다음 공격 명중률 50%로 고정" },
        { stage: 1, name: "올인", desc: "주사위 판정, 성공 시 즉사급 데미지" },
      ],
      stats: { power: 6, speed: 5, range: 6, technique: 7, mental: 9 },
      quote: "\"운도 실력이야. 난 그걸 증명하지.\""
    },
    {
      id: "char-05",
      name: "인형사",
      codename: "PUPPETEER",
      image: "P5",
      concept: "「실 / 조종」",
      description: "보이지 않는 실로 대상을 조종하는 능력자. 사람을 도구로 보는 차가운 시선의 소유자. 누군가의 자유를 빼앗는 순간 희열을 느끼며, 자신도 누군가에게 조종당한 과거가 있다.",
      crime: "착취",
      abilities: [
        { stage: 5, name: "조작", desc: "작은 물체 조종 (무기, 파편 등)" },
        { stage: 3, name: "간섭", desc: "인체 일부 강제 조종 (한쪽 팔, 다리)" },
        { stage: 1, name: "꼭두각시", desc: "상대 신체 완전 조종 (10초)" },
      ],
      stats: { power: 7, speed: 4, range: 7, technique: 10, mental: 5 },
      quote: "\"춤춰봐. 내가 끈을 놓을 때까지.\""
    },
    {
      id: "char-06",
      name: "망각자",
      codename: "AMNESIAC",
      image: "P6",
      concept: "「기억 / 소거」",
      description: "대상의 기억을 지우거나 조작하는 능력자. 자신의 과거 기억도 불완전하며, 자신이 왜 '죄수'가 되었는지조차 기억하지 못한다. 조용하고 공허한 눈을 가졌다.",
      crime: "은폐",
      abilities: [
        { stage: 5, name: "희석", desc: "자신의 존재감 희석 (눈에 잘 안 띔)" },
        { stage: 3, name: "삭제", desc: "최근 30초 기억 삭제" },
        { stage: 1, name: "백지화", desc: "대상의 능력 사용법 기억 일시 삭제" },
      ],
      stats: { power: 4, speed: 6, range: 5, technique: 8, mental: 3 },
      quote: "\"네가 뭘 하려 했는지... 기억나?\""
    },
    {
      id: "char-07",
      name: "계약자",
      codename: "CONTRACTOR",
      image: "P7",
      concept: "「약속 / 구속」",
      description: "상대와 '계약'을 맺어 조건부 효과를 발동시키는 능력자. 규칙과 약속을 신성시하며, 한 번 맺은 계약은 반드시 지켜져야 한다고 믿는다. 아이러니하게도 그의 죄목은 배신이다.",
      crime: "배신",
      abilities: [
        { stage: 5, name: "제안", desc: "계약 제안 - 거부 시 위치 노출" },
        { stage: 3, name: "구속", desc: "계약 위반 시 자동 데미지" },
        { stage: 1, name: "혈인", desc: "위반 시 코인 1개 강제 소모되는 절대 계약" },
      ],
      stats: { power: 5, speed: 5, range: 6, technique: 9, mental: 8 },
      quote: "\"계약은 지켜야지. 그게 규칙이니까.\""
    },
    {
      id: "char-08",
      name: "시계공",
      codename: "CLOCKMAKER",
      image: "P8",
      concept: "「시간 / 태엽」",
      description: "자신 주변의 시간 흐름을 조작하는 능력자. 항상 회중시계를 가지고 다니며, 시간의 소중함을 누구보다 잘 안다. 무언가를 계속 기다리고 있는 듯한 표정을 짓는다.",
      crime: "지연",
      abilities: [
        { stage: 5, name: "가속", desc: "자신의 시간 5% 가속 (반응속도 상승)" },
        { stage: 3, name: "정지", desc: "지정 구역 시간 정지 (3초, 자신 포함)" },
        { stage: 1, name: "되감기", desc: "자신만 10초 전 상태로 복구" },
      ],
      stats: { power: 6, speed: 9, range: 4, technique: 8, mental: 7 },
      quote: "\"시간은 모두에게 공평하지 않아.\""
    },
    {
      id: "char-09",
      name: "공명자",
      codename: "RESONANCE",
      image: "P9",
      concept: "「소리 / 파동」",
      description: "소리와 진동을 무기화하는 능력자. 청각이 극도로 발달해 심장 박동만으로 상대의 감정을 읽는다. 평소에는 조용하지만, 전투 시 광기어린 미소를 짓는다.",
      crime: "파괴",
      abilities: [
        { stage: 5, name: "감지", desc: "반경 내 소리 감지 (심장박동까지)" },
        { stage: 3, name: "충격파", desc: "지향성 음파 공격 (균형감 상실)" },
        { stage: 1, name: "공진", desc: "대상의 고유진동수에 맞춰 내부 파괴" },
      ],
      stats: { power: 9, speed: 6, range: 7, technique: 7, mental: 5 },
      quote: "\"네 심장 소리, 점점 빨라지네.\""
    },
  ],

  // 버뮤다 구역 (4개) - 삼각형 배치
  bermudaZones: [
    {
      id: "zone-center",
      name: "SECTOR 0",
      subtitle: "중심 구역",
      position: "center",
      description: "버뮤다의 심장부. 세 꼭짓점 구역이 모두 이곳으로 통한다. 능력이 극대화되지만 그만큼 코인 소모도 가속된다. 게임 종반, 최후의 결전이 벌어지는 곳.",
      features: ["능력 증폭", "코인 소모 가속", "최종 결전지"],
      danger: "최상",
      color: "#aa5a6a",
    },
    {
      id: "zone-alpha",
      name: "SECTOR α",
      subtitle: "잔해 구역",
      position: "top",
      description: "버뮤다 북쪽 꼭짓점. 초기 출현 시 파괴된 건물 잔해가 산처럼 쌓여있다. 고지대를 점령한 자가 유리하지만, 불안정한 지반으로 언제든 무너질 수 있다.",
      features: ["고지대", "붕괴 위험", "저격 유리"],
      danger: "중",
      color: "#4a90a4",
    },
    {
      id: "zone-beta",
      name: "SECTOR β",
      subtitle: "안개 구역",
      position: "bottom-left",
      description: "버뮤다 남서쪽 꼭짓점. 항상 짙은 안개가 끼어있어 시야가 극도로 제한된다. 소리에 의존해야 하며, 기습과 암살에 특화된 죄수들이 선호하는 구역.",
      features: ["시야 제한", "음향 증폭", "기습 유리"],
      danger: "상",
      color: "#6a6a8a",
    },
    {
      id: "zone-gamma",
      name: "SECTOR γ",
      subtitle: "함정 구역",
      position: "bottom-right",
      description: "버뮤다 남동쪽 꼭짓점. 이전 게임에서 탈락한 죄수들이 남긴 함정이 곳곳에 설치되어 있다. 한 발 한 발이 위험하지만, 이를 역으로 이용하는 전략도 가능하다.",
      features: ["함정 다수", "신중함 필요", "역이용 가능"],
      danger: "상",
      color: "#9a7a5a",
    },
  ],

  // 용어집
  glossary: [
    {
      term: "버뮤다",
      definition: "어느 날 갑자기 출현한 삼각형 구역. 죄수들이 강제로 소환되어 최후의 1인이 될 때까지 싸우는 배틀로얄 공간. 외부에서는 관측되지 않는다.",
    },
    {
      term: "죄수",
      definition: "이능력을 가진 자들의 통칭. 이유는 불명이나 모두 '죄'를 지었다고 판정되어 버뮤다에 소환된다. 최후의 1인만이 해방된다.",
    },
    {
      term: "코인",
      definition: "죄수의 목숨이자 힘의 족쇄. 시작 시 3개가 주어지며 최대 5개까지 보유 가능. 사망 시 1개를 소모하고 부활한다. 0개가 되면 영구 탈락.",
    },
    {
      term: "딜레마",
      definition: "일정 주기로 코인 4개 미만의 죄수들에게 발동하는 강제 이벤트. 무작위로 매칭된 상대와 협력 또는 배신을 선택해 코인 변동이 일어난다.",
    },
    {
      term: "역설",
      definition: "버뮤다의 핵심 법칙. 코인이 많을수록 능력이 약화되고, 코인이 적을수록 능력이 강화된다. 살기 위해 코인을 모으면 약해지고, 강해지려면 죽음에 가까워야 한다.",
    },
  ],

  // 규칙
  rules: {
    coinSystem: {
      title: "코인 시스템",
      items: [
        { coin: 5, state: "과잉", power: "능력 대폭 약화", color: "#4a90a4" },
        { coin: 4, state: "안정", power: "능력 약화", color: "#5a9a7a" },
        { coin: 3, state: "기본", power: "통상 출력", color: "#8a8a5a" },
        { coin: 2, state: "각성", power: "능력 강화", color: "#a4905a" },
        { coin: 1, state: "임계", power: "최대 출력", color: "#a45a5a" },
        { coin: 0, state: "탈락", power: "영구 사망", color: "#5a1a1a" },
      ]
    },
    dilemma: {
      title: "딜레마 규칙",
      condition: "코인 4개 미만인 죄수들 대상",
      outcomes: [
        { a: "협력", b: "협력", resultA: "+1", resultB: "+1" },
        { a: "배신", b: "배신", resultA: "0", resultB: "0" },
        { a: "배신", b: "협력", resultA: "+2", resultB: "-1" },
        { a: "협력", b: "배신", resultA: "-1", resultB: "+2" },
      ]
    }
  },

  // 색상 테마
  theme: {
    primary: "#00f0ff",
    secondary: "#ff3366",
    warning: "#ffaa00",
    background: "#0a0a0f",
    surface: "#12121a",
    surfaceLight: "#1a1a24",
    text: "#e0e0e0",
    textDim: "#666677",
  }
};

// ============================================================
// 🎨 스타일 정의
// ============================================================

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Noto+Sans+KR:wght@300;400;700&family=JetBrains+Mono:wght@400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    --primary: ${CONFIG.theme.primary};
    --secondary: ${CONFIG.theme.secondary};
    --warning: ${CONFIG.theme.warning};
    --bg: ${CONFIG.theme.background};
    --surface: ${CONFIG.theme.surface};
    --surface-light: ${CONFIG.theme.surfaceLight};
    --text: ${CONFIG.theme.text};
    --text-dim: ${CONFIG.theme.textDim};
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  /* 스캔라인 */
  .scanlines::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 240, 255, 0.008) 2px,
      rgba(0, 240, 255, 0.008) 4px
    );
    pointer-events: none;
    z-index: 9999;
  }

  /* ==================== 인트로 ==================== */
  
  .intro-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
    padding: 20px;
    user-select: none;
  }

  .skip-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid var(--text-dim);
    color: var(--text-dim);
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .skip-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .dilemma-scene {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    opacity: 0;
    animation: fadeIn 0.8s ease forwards;
    max-width: 100%;
    text-align: center;
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  .dilemma-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(10px, 3vw, 14px);
    letter-spacing: 4px;
    color: var(--text-dim);
  }

  .dilemma-visual {
    display: flex;
    align-items: center;
    gap: clamp(20px, 8vw, 60px);
  }

  .prisoner-box {
    width: clamp(80px, 20vw, 120px);
    height: clamp(100px, 25vw, 160px);
    border: 2px solid var(--text-dim);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.5s ease;
    position: relative;
  }

  .prisoner-box.highlight {
    border-color: var(--primary);
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
  }

  .prisoner-box.betray {
    border-color: var(--secondary);
    box-shadow: 0 0 30px rgba(255, 51, 102, 0.3);
  }

  .prisoner-icon {
    font-size: clamp(24px, 8vw, 40px);
    opacity: 0.8;
  }

  .prisoner-label {
    font-family: 'Orbitron', monospace;
    font-size: clamp(8px, 2vw, 11px);
    letter-spacing: 1px;
    color: var(--text-dim);
  }

  .prisoner-choice {
    position: absolute;
    bottom: -24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(10px, 2.5vw, 12px);
    padding: 2px 8px;
    border-radius: 2px;
    white-space: nowrap;
  }

  .prisoner-choice.cooperate {
    background: rgba(0, 240, 255, 0.2);
    color: var(--primary);
  }

  .prisoner-choice.betray {
    background: rgba(255, 51, 102, 0.2);
    color: var(--secondary);
  }

  .vs-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(16px, 5vw, 24px);
    color: var(--text-dim);
  }

  .dilemma-result {
    display: flex;
    gap: clamp(40px, 15vw, 100px);
    margin-top: 16px;
  }

  .result-box {
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }

  .result-box.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .result-coins {
    font-family: 'Orbitron', monospace;
    font-size: clamp(20px, 6vw, 28px);
    font-weight: 900;
  }

  .result-coins.positive { color: var(--primary); }
  .result-coins.negative { color: var(--secondary); }
  .result-coins.neutral { color: var(--text-dim); }

  .dilemma-narration {
    max-width: 500px;
    width: 100%;
    text-align: center;
    font-size: clamp(13px, 3.5vw, 15px);
    line-height: 1.9;
    color: var(--text);
    padding: 0 16px;
  }

  .narration-highlight {
    color: var(--primary);
    font-weight: 700;
  }

  .narration-warning {
    color: var(--secondary);
    font-weight: 700;
  }

  .intro-progress {
    position: absolute;
    bottom: 30px;
    display: flex;
    gap: 6px;
  }

  .progress-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-dim);
    transition: all 0.3s ease;
  }

  .progress-dot.active {
    background: var(--primary);
    box-shadow: 0 0 10px var(--primary);
  }

  .tap-hint {
    position: absolute;
    bottom: 60px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--text-dim);
    letter-spacing: 1px;
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  /* ==================== 메인 레이아웃 ==================== */
  
  .main-container {
    min-height: 100vh;
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .main-container.visible {
    opacity: 1;
  }

  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(180deg, var(--bg), transparent);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 100;
    backdrop-filter: blur(10px);
  }

  .logo {
    font-family: 'Orbitron', monospace;
    font-size: clamp(20px, 5vw, 28px);
    font-weight: 900;
    color: var(--primary);
    text-shadow: 0 0 20px var(--primary);
    cursor: pointer;
  }

  .nav-tabs {
    display: flex;
    gap: 4px;
  }

  .nav-tab {
    padding: 8px 12px;
    font-family: 'Orbitron', monospace;
    font-size: clamp(8px, 2vw, 11px);
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--text-dim);
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .nav-tab:hover {
    color: var(--text);
  }

  .nav-tab.active {
    color: var(--primary);
    border-color: var(--primary);
    background: rgba(0, 240, 255, 0.05);
  }

  .content-area {
    padding: 80px 16px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(10px, 2.5vw, 12px);
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--text-dim);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--text-dim), transparent);
  }

  /* ==================== 캐릭터 그리드 ==================== */
  
  .character-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .character-card {
    background: var(--surface);
    border: 1px solid rgba(0, 240, 255, 0.1);
    transition: all 0.4s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    aspect-ratio: 3/4;
  }

  .character-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .character-card:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 240, 255, 0.15);
  }

  .character-card:hover::before {
    opacity: 1;
  }

  .character-image {
    width: 100%;
    height: 65%;
    object-fit: cover;
    background: var(--surface-light);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .character-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .character-placeholder {
    font-family: 'Orbitron', monospace;
    font-size: clamp(24px, 8vw, 48px);
    color: var(--text-dim);
    opacity: 0.3;
  }

  .character-info {
    padding: clamp(8px, 2vw, 16px);
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .character-codename {
    font-family: 'Orbitron', monospace;
    font-size: clamp(6px, 1.5vw, 9px);
    letter-spacing: 2px;
    color: var(--primary);
    margin-bottom: 2px;
  }

  .character-name {
    font-size: clamp(12px, 3vw, 18px);
    font-weight: 700;
    margin-bottom: 2px;
  }

  .character-concept {
    font-size: clamp(9px, 2vw, 12px);
    color: var(--text-dim);
    font-family: 'JetBrains Mono', monospace;
  }

  /* ==================== 서브컬쳐 스타일 캐릭터 모달 ==================== */
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    overflow-y: auto;
    backdrop-filter: blur(10px);
  }

  .char-modal {
    width: 100%;
    max-width: 900px;
    max-height: 95vh;
    overflow-y: auto;
    position: relative;
    background: linear-gradient(135deg, #0d0d15 0%, #151520 50%, #0d0d15 100%);
    border: 1px solid var(--primary);
    box-shadow: 
      0 0 60px rgba(0, 240, 255, 0.2),
      inset 0 0 120px rgba(0, 240, 255, 0.03);
  }

  .char-modal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), var(--secondary), var(--primary), transparent);
  }

  .char-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--text-dim);
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .char-modal-close:hover {
    border-color: var(--secondary);
    color: var(--secondary);
    background: rgba(255, 51, 102, 0.1);
  }

  /* 상단 영역: 캐릭터 이미지 + 기본정보 */
  .char-modal-top {
    display: flex;
    gap: 0;
    min-height: 300px;
  }

  .char-modal-image-section {
    width: 45%;
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8));
  }

  .char-modal-image-section img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  .char-modal-image-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  }

  .char-modal-info-section {
    width: 55%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .char-modal-codename {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--primary);
    margin-bottom: 8px;
    text-shadow: 0 0 10px var(--primary);
  }

  .char-modal-name {
    font-size: clamp(28px, 6vw, 42px);
    font-weight: 900;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #fff 0%, var(--primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .char-modal-concept {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .char-modal-crime {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--secondary);
    padding: 8px 16px;
    background: rgba(255, 51, 102, 0.1);
    border: 1px solid rgba(255, 51, 102, 0.3);
    margin-bottom: 20px;
  }

  .char-modal-crime::before {
    content: '◆';
    font-size: 8px;
  }

  .char-modal-quote {
    font-style: italic;
    font-size: 13px;
    color: var(--text-dim);
    padding: 12px 16px;
    border-left: 2px solid var(--primary);
    background: rgba(0, 240, 255, 0.03);
  }

  /* 스탯 섹션 */
  .char-modal-stats {
    padding: 24px;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(0, 240, 255, 0.1);
    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  }

  .stats-title {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .stats-grid {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .stat-item {
    flex: 1;
    min-width: 80px;
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .stat-name {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--text-dim);
  }

  .stat-value {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 900;
    color: var(--primary);
  }

  .stat-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .stat-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    box-shadow: 0 0 10px var(--primary);
    transition: width 0.8s ease;
  }

  /* 능력 섹션 */
  .char-modal-abilities {
    padding: 24px;
  }

  .abilities-title {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-dim);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .abilities-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--text-dim), transparent);
  }

  .ability-card {
    display: flex;
    gap: 16px;
    padding: 16px;
    margin-bottom: 12px;
    background: rgba(0, 240, 255, 0.03);
    border: 1px solid rgba(0, 240, 255, 0.1);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .ability-card:hover {
    border-color: rgba(0, 240, 255, 0.3);
    background: rgba(0, 240, 255, 0.05);
  }

  .ability-card.critical {
    background: rgba(255, 51, 102, 0.05);
    border-color: rgba(255, 51, 102, 0.2);
  }

  .ability-card.critical:hover {
    border-color: rgba(255, 51, 102, 0.4);
  }

  .ability-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--primary);
  }

  .ability-card.critical::before {
    background: var(--secondary);
  }

  .ability-coin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 50px;
  }

  .ability-coin-label {
    font-family: 'Orbitron', monospace;
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--text-dim);
    margin-bottom: 4px;
  }

  .ability-coin-value {
    font-family: 'Orbitron', monospace;
    font-size: 28px;
    font-weight: 900;
    color: var(--primary);
  }

  .ability-card.critical .ability-coin-value {
    color: var(--secondary);
    text-shadow: 0 0 20px var(--secondary);
  }

  .ability-info {
    flex: 1;
  }

  .ability-name {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 6px;
    color: var(--text);
  }

  .ability-desc {
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.6;
  }

  /* 설명 섹션 */
  .char-modal-description {
    padding: 24px;
    background: rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(0, 240, 255, 0.1);
  }

  .description-title {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-dim);
    margin-bottom: 12px;
  }

  .description-text {
    font-size: 14px;
    line-height: 1.9;
    color: var(--text);
  }

  /* ==================== 세계관 탭 ==================== */
  
  .world-section {
    margin-bottom: 40px;
  }

  .world-section-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(10px, 2.5vw, 11px);
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  }

  .glossary-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .glossary-item {
    background: var(--surface);
    padding: 16px;
    border-left: 3px solid var(--primary);
  }

  .glossary-term {
    font-family: 'Orbitron', monospace;
    font-size: clamp(12px, 3vw, 14px);
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 6px;
  }

  .glossary-def {
    font-size: clamp(12px, 3vw, 13px);
    line-height: 1.7;
    color: var(--text-dim);
  }

  .dilemma-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dilemma-table {
    width: 100%;
    min-width: 300px;
    border-collapse: collapse;
  }

  .dilemma-table th,
  .dilemma-table td {
    padding: 10px 12px;
    text-align: center;
    border: 1px solid rgba(0, 240, 255, 0.1);
  }

  .dilemma-table th {
    background: var(--surface);
    font-family: 'Orbitron', monospace;
    font-size: clamp(8px, 2vw, 10px);
    letter-spacing: 1px;
    color: var(--text-dim);
  }

  .dilemma-table td {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(11px, 2.5vw, 13px);
  }

  .dilemma-condition {
    font-size: clamp(11px, 2.5vw, 12px);
    color: var(--warning);
    margin-bottom: 12px;
    font-family: 'JetBrains Mono', monospace;
  }

  .coin-system {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .coin-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: var(--surface);
    border-left: 4px solid;
    transition: all 0.3s ease;
  }

  .coin-row:hover {
    background: var(--surface-light);
  }

  .coin-number {
    font-family: 'Orbitron', monospace;
    font-size: clamp(18px, 5vw, 24px);
    font-weight: 900;
    min-width: 32px;
  }

  .coin-state {
    font-family: 'Orbitron', monospace;
    font-size: clamp(9px, 2vw, 11px);
    letter-spacing: 1px;
    min-width: 50px;
  }

  .coin-power {
    font-size: clamp(11px, 2.5vw, 13px);
    color: var(--text-dim);
  }

  /* ==================== 마름모 지도 ==================== */
  
  .map-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .diamond-map {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    position: relative;
  }

  .diamond-map svg {
    width: 100%;
    height: 100%;
  }

  .diamond-outline {
    fill: none;
    stroke: var(--primary);
    stroke-width: 2;
    filter: drop-shadow(0 0 10px var(--primary));
  }

  .zone-cell {
    fill: rgba(0, 240, 255, 0.05);
    stroke: rgba(0, 240, 255, 0.2);
    stroke-width: 1;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .zone-cell:hover {
    fill: rgba(0, 240, 255, 0.15);
    stroke: var(--primary);
  }

  .zone-cell.active {
    fill: rgba(0, 240, 255, 0.2);
    stroke: var(--primary);
    stroke-width: 2;
  }

  .zone-number {
    font-family: 'Orbitron', monospace;
    font-size: 16px;
    font-weight: 700;
    fill: var(--text);
    text-anchor: middle;
    pointer-events: none;
  }

  .zone-subtitle {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 9px;
    fill: var(--text-dim);
    text-anchor: middle;
    pointer-events: none;
  }

  .map-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--text-dim);
  }

  .legend-color {
    width: 12px;
    height: 12px;
  }

  /* 구역 상세 모달 */
  .zone-modal {
    background: linear-gradient(135deg, #0d0d15, #151520);
    border: 1px solid var(--primary);
    max-width: 500px;
    width: 100%;
    padding: 0;
    position: relative;
    box-shadow: 0 0 60px rgba(0, 240, 255, 0.2);
  }

  .zone-modal-header {
    padding: 24px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
    position: relative;
  }

  .zone-modal-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }

  .zone-modal-number {
    font-family: 'Orbitron', monospace;
    font-size: 48px;
    font-weight: 900;
    color: var(--primary);
    text-shadow: 0 0 30px var(--primary);
    line-height: 1;
    margin-bottom: 8px;
  }

  .zone-modal-name {
    font-family: 'Orbitron', monospace;
    font-size: 18px;
    letter-spacing: 3px;
    margin-bottom: 4px;
  }

  .zone-modal-subtitle {
    font-size: 14px;
    color: var(--text-dim);
  }

  .zone-modal-body {
    padding: 24px;
  }

  .zone-modal-desc {
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .zone-modal-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .zone-feature {
    font-size: 11px;
    padding: 6px 12px;
    background: rgba(0, 240, 255, 0.1);
    color: var(--primary);
    font-family: 'JetBrains Mono', monospace;
    border: 1px solid rgba(0, 240, 255, 0.2);
  }

  .zone-modal-danger {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(255, 51, 102, 0.1);
    border: 1px solid rgba(255, 51, 102, 0.2);
  }

  .zone-danger-label {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-dim);
  }

  .zone-danger-value {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    color: var(--secondary);
  }

  .zone-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid var(--text-dim);
    color: var(--text);
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 100;
  }

  .zone-modal-close:hover {
    border-color: var(--secondary);
    color: var(--secondary);
  }

  /* ==================== 반응형 ==================== */
  
  @media (min-width: 640px) {
    .glossary-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .content-area {
      padding: 100px 24px 40px;
    }
    
    .site-header {
      padding: 0 24px;
      height: 70px;
    }
    
    .nav-tab {
      padding: 10px 20px;
    }
  }

  @media (min-width: 1024px) {
    .character-grid {
      gap: 20px;
    }
    
    .content-area {
      padding: 100px 40px 40px;
    }
    
    .site-header {
      padding: 0 40px;
    }
  }

  @media (max-width: 640px) {
    .char-modal-top {
      flex-direction: column;
    }
    
    .char-modal-image-section {
      width: 100%;
      height: 250px;
    }
    
    .char-modal-info-section {
      width: 100%;
    }
    
    .stats-grid {
      gap: 12px;
    }
    
    .stat-item {
      min-width: 60px;
    }
  }

  @media (max-width: 480px) {
    .character-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    
    .dilemma-visual {
      flex-direction: column;
      gap: 20px;
    }
    
    .vs-text {
      margin: 10px 0;
    }
    
    .dilemma-result {
      gap: 60px;
    }
  }
`;

// ============================================================
// 🎬 컴포넌트
// ============================================================

// 인트로
function DilemmaIntro({ onComplete }) {
  const [step, setStep] = useState(0);
  const totalSteps = 6;

  const handleClick = (e) => {
    if (e.target.classList.contains('skip-btn')) return;
    
    if (step < totalSteps - 1) {
      setStep(s => s + 1);
    } else {
      onComplete();
    }
  };

  const scenes = [
    {
      title: "PRISONER'S DILEMMA",
      visual: null,
      narration: (
        <>
          이것은 <span className="narration-highlight">신뢰</span>와{' '}
          <span className="narration-warning">배신</span>의 게임.
        </>
      ),
    },
    {
      title: "CASE 01",
      visual: { choiceA: 'cooperate', choiceB: 'cooperate', resultA: '+1', resultB: '+1' },
      narration: (
        <>
          둘 다 <span className="narration-highlight">협력</span>하면,
          <br />서로 코인을 1개씩 얻는다.
        </>
      ),
    },
    {
      title: "CASE 02",
      visual: { choiceA: 'betray', choiceB: 'betray', resultA: '0', resultB: '0' },
      narration: (
        <>
          둘 다 <span className="narration-warning">배신</span>하면,
          <br />아무도 얻지 못한다.
        </>
      ),
    },
    {
      title: "CASE 03",
      visual: { choiceA: 'betray', choiceB: 'cooperate', resultA: '+2', resultB: '-1' },
      narration: (
        <>
          한 명만 <span className="narration-warning">배신</span>하면,
          <br />배신자는 2개를 얻고, 협력자는 1개를 잃는다.
        </>
      ),
    },
    {
      title: "THE PARADOX",
      visual: null,
      narration: (
        <>
          하지만 이 게임엔 <span className="narration-warning">역설</span>이 있다.
          <br /><br />
          <span className="narration-highlight">코인이 많을수록 약해지고,</span>
          <br />
          <span className="narration-warning">코인이 적을수록 강해진다.</span>
        </>
      ),
    },
    {
      title: "THE RULE",
      visual: null,
      narration: (
        <>
          살기 위해 코인을 모으면 약해지고,
          <br />강해지려면 죽음에 가까워야 한다.
          <br /><br />
          <span className="narration-highlight">DON'T LOSE YOURSELF.</span>
        </>
      ),
    },
  ];

  const currentScene = scenes[step];

  return (
    <div className="intro-container" onClick={handleClick}>
      <button className="skip-btn" onClick={onComplete}>SKIP →</button>
      
      <div className="dilemma-scene" key={step}>
        <div className="dilemma-title">{currentScene.title}</div>
        
        {currentScene.visual && (
          <>
            <div className="dilemma-visual">
              <div className={`prisoner-box ${currentScene.visual.choiceA === 'cooperate' ? 'highlight' : 'betray'}`}>
                <div className="prisoner-icon">◈</div>
                <div className="prisoner-label">PRISONER A</div>
                <div className={`prisoner-choice ${currentScene.visual.choiceA}`}>
                  {currentScene.visual.choiceA === 'cooperate' ? '협력' : '배신'}
                </div>
              </div>
              
              <div className="vs-text">VS</div>
              
              <div className={`prisoner-box ${currentScene.visual.choiceB === 'cooperate' ? 'highlight' : 'betray'}`}>
                <div className="prisoner-icon">◈</div>
                <div className="prisoner-label">PRISONER B</div>
                <div className={`prisoner-choice ${currentScene.visual.choiceB}`}>
                  {currentScene.visual.choiceB === 'cooperate' ? '협력' : '배신'}
                </div>
              </div>
            </div>
            
            <div className="dilemma-result">
              <div className="result-box visible">
                <div className={`result-coins ${
                  currentScene.visual.resultA.startsWith('+') ? 'positive' : 
                  currentScene.visual.resultA.startsWith('-') ? 'negative' : 'neutral'
                }`}>
                  {currentScene.visual.resultA}
                </div>
              </div>
              <div className="result-box visible">
                <div className={`result-coins ${
                  currentScene.visual.resultB.startsWith('+') ? 'positive' : 
                  currentScene.visual.resultB.startsWith('-') ? 'negative' : 'neutral'
                }`}>
                  {currentScene.visual.resultB}
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="dilemma-narration">
          {currentScene.narration}
        </div>
      </div>
      
      <div className="tap-hint">TAP TO CONTINUE</div>
      
      <div className="intro-progress">
        {scenes.map((_, i) => (
          <div key={i} className={`progress-dot ${i <= step ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

// 캐릭터 카드
function CharacterCard({ character, onClick }) {
  const imageSrc = character.image ? `${CONFIG.imageBasePath}${character.image}.png` : null;
  
  return (
    <div className="character-card" onClick={onClick}>
      <div className="character-image">
        {imageSrc ? (
          <img src={imageSrc} alt={character.name} />
        ) : (
          <div className="character-placeholder">?</div>
        )}
      </div>
      <div className="character-info">
        <div className="character-codename">{character.codename}</div>
        <div className="character-name">{character.name}</div>
        <div className="character-concept">{character.concept}</div>
      </div>
    </div>
  );
}

// 서브컬쳐 스타일 캐릭터 모달
function CharacterModal({ character, onClose }) {
  if (!character) return null;
  
  const imageSrc = character.image ? `${CONFIG.imageBasePath}${character.image}.png` : null;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="char-modal" onClick={e => e.stopPropagation()}>
        <button className="char-modal-close" onClick={onClose}>×</button>
        
        {/* 상단: 이미지 + 기본정보 */}
        <div className="char-modal-top">
          <div className="char-modal-image-section">
            {imageSrc ? (
              <img src={imageSrc} alt={character.name} />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'var(--surface-light)',
                fontSize: '64px',
                color: 'var(--text-dim)',
                opacity: 0.3
              }}>?</div>
            )}
          </div>
          <div className="char-modal-info-section">
            <div className="char-modal-codename">{character.codename}</div>
            <div className="char-modal-name">{character.name}</div>
            <div className="char-modal-concept">{character.concept}</div>
            <div className="char-modal-crime">죄목: {character.crime}</div>
            <div className="char-modal-quote">{character.quote}</div>
          </div>
        </div>
        
        {/* 스탯 */}
        {character.stats && (
          <div className="char-modal-stats">
            <div className="stats-title">PARAMETERS</div>
            <div className="stats-grid">
              {Object.entries(character.stats).map(([key, value]) => (
                <div key={key} className="stat-item">
                  <div className="stat-header">
                    <span className="stat-name">{key.toUpperCase()}</span>
                    <span className="stat-value">{value}</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: `${value * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 능력 */}
        <div className="char-modal-abilities">
          <div className="abilities-title">ABILITIES</div>
          {character.abilities.map((ability, idx) => (
            <div key={idx} className={`ability-card ${ability.stage === 1 ? 'critical' : ''}`}>
              <div className="ability-coin">
                <div className="ability-coin-label">COIN</div>
                <div className="ability-coin-value">{ability.stage}</div>
              </div>
              <div className="ability-info">
                <div className="ability-name">{ability.name}</div>
                <div className="ability-desc">{ability.desc}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 설명 */}
        <div className="char-modal-description">
          <div className="description-title">PROFILE</div>
          <div className="description-text">{character.description}</div>
        </div>
      </div>
    </div>
  );
}

// 구역 상세 모달
function ZoneModal({ zone, onClose }) {
  if (!zone) return null;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  // 구역 라벨 매핑
  const zoneLabels = {
    'zone-center': '0',
    'zone-alpha': 'α',
    'zone-beta': 'β',
    'zone-gamma': 'γ',
  };
  
  const zoneLabel = zoneLabels[zone.id] || zone.id;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="zone-modal" onClick={e => e.stopPropagation()}>
        <button className="zone-modal-close" onClick={onClose}>×</button>
        
        <div className="zone-modal-header">
          <div className="zone-modal-number">{zoneLabel}</div>
          <div className="zone-modal-name">{zone.name}</div>
          <div className="zone-modal-subtitle">{zone.subtitle}</div>
        </div>
        
        <div className="zone-modal-body">
          <div className="zone-modal-desc">{zone.description}</div>
          
          <div className="zone-modal-features">
            {zone.features.map((feature, idx) => (
              <span key={idx} className="zone-feature">{feature}</span>
            ))}
          </div>
          
          <div className="zone-modal-danger">
            <span className="zone-danger-label">위험도</span>
            <span className="zone-danger-value">{zone.danger}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 세계관 탭
function WorldTab() {
  return (
    <div>
      <div className="world-section">
        <div className="world-section-title">GLOSSARY</div>
        <div className="glossary-grid">
          {CONFIG.glossary.map((item, idx) => (
            <div key={idx} className="glossary-item">
              <div className="glossary-term">{item.term}</div>
              <div className="glossary-def">{item.definition}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="world-section">
        <div className="world-section-title">DILEMMA</div>
        <div className="dilemma-condition">※ {CONFIG.rules.dilemma.condition}</div>
        <div className="dilemma-table-wrapper">
          <table className="dilemma-table">
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>A 결과</th>
                <th>B 결과</th>
              </tr>
            </thead>
            <tbody>
              {CONFIG.rules.dilemma.outcomes.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ color: row.a === '협력' ? '#00f0ff' : '#ff3366' }}>{row.a}</td>
                  <td style={{ color: row.b === '협력' ? '#00f0ff' : '#ff3366' }}>{row.b}</td>
                  <td style={{ color: row.resultA.startsWith('+') ? '#00f0ff' : row.resultA.startsWith('-') ? '#ff3366' : '#666' }}>
                    {row.resultA}
                  </td>
                  <td style={{ color: row.resultB.startsWith('+') ? '#00f0ff' : row.resultB.startsWith('-') ? '#ff3366' : '#666' }}>
                    {row.resultB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="world-section">
        <div className="world-section-title">COIN SYSTEM</div>
        <div className="coin-system">
          {CONFIG.rules.coinSystem.items.map((item, idx) => (
            <div 
              key={idx} 
              className="coin-row"
              style={{ borderLeftColor: item.color }}
            >
              <div className="coin-number" style={{ color: item.color }}>{item.coin}</div>
              <div className="coin-state" style={{ color: item.color }}>{item.state}</div>
              <div className="coin-power">{item.power}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 삼각형 지도 탭 (4구역)
function MapTab() {
  const [selectedZone, setSelectedZone] = useState(null);
  
  // 삼각형 좌표
  const points = {
    top: { x: 200, y: 50 },
    bottomLeft: { x: 50, y: 350 },
    bottomRight: { x: 350, y: 350 },
  };
  
  // 각 변의 중점
  const midpoints = {
    left: { x: (points.top.x + points.bottomLeft.x) / 2, y: (points.top.y + points.bottomLeft.y) / 2 },
    right: { x: (points.top.x + points.bottomRight.x) / 2, y: (points.top.y + points.bottomRight.y) / 2 },
    bottom: { x: (points.bottomLeft.x + points.bottomRight.x) / 2, y: (points.bottomLeft.y + points.bottomRight.y) / 2 },
  };
  
  // 중심점
  const center = {
    x: (points.top.x + points.bottomLeft.x + points.bottomRight.x) / 3,
    y: (points.top.y + points.bottomLeft.y + points.bottomRight.y) / 3,
  };
  
  // 4개 구역 경로
  const zonePaths = [
    // 중앙 (역삼각형)
    {
      id: "zone-center",
      path: `M ${midpoints.left.x} ${midpoints.left.y} L ${midpoints.right.x} ${midpoints.right.y} L ${midpoints.bottom.x} ${midpoints.bottom.y} Z`,
      labelPos: { x: center.x, y: center.y + 10 },
      label: "0",
      sublabel: "중심"
    },
    // 상단 꼭짓점 (α)
    {
      id: "zone-alpha",
      path: `M ${points.top.x} ${points.top.y} L ${midpoints.left.x} ${midpoints.left.y} L ${midpoints.right.x} ${midpoints.right.y} Z`,
      labelPos: { x: points.top.x, y: points.top.y + 70 },
      label: "α",
      sublabel: "잔해"
    },
    // 좌하단 꼭짓점 (β)
    {
      id: "zone-beta",
      path: `M ${points.bottomLeft.x} ${points.bottomLeft.y} L ${midpoints.left.x} ${midpoints.left.y} L ${midpoints.bottom.x} ${midpoints.bottom.y} Z`,
      labelPos: { x: points.bottomLeft.x + 55, y: points.bottomLeft.y - 50 },
      label: "β",
      sublabel: "안개"
    },
    // 우하단 꼭짓점 (γ)
    {
      id: "zone-gamma",
      path: `M ${points.bottomRight.x} ${points.bottomRight.y} L ${midpoints.right.x} ${midpoints.right.y} L ${midpoints.bottom.x} ${midpoints.bottom.y} Z`,
      labelPos: { x: points.bottomRight.x - 55, y: points.bottomRight.y - 50 },
      label: "γ",
      sublabel: "함정"
    },
  ];
  
  return (
    <div className="map-container">
      <div className="diamond-map">
        <svg viewBox="0 0 400 400">
          {/* 외곽 삼각형 */}
          <path
            className="diamond-outline"
            d={`M ${points.top.x} ${points.top.y} L ${points.bottomLeft.x} ${points.bottomLeft.y} L ${points.bottomRight.x} ${points.bottomRight.y} Z`}
          />
          
          {/* 4개 구역 */}
          {zonePaths.map((zoneData, idx) => {
            const zone = CONFIG.bermudaZones.find(z => z.id === zoneData.id);
            if (!zone) return null;
            
            return (
              <g key={zone.id} onClick={() => setSelectedZone(zone)} style={{ cursor: 'pointer' }}>
                <path
                  className={`zone-cell ${selectedZone?.id === zone.id ? 'active' : ''}`}
                  d={zoneData.path}
                  style={{ fill: `${zone.color}44` }}
                />
                <text className="zone-number" x={zoneData.labelPos.x} y={zoneData.labelPos.y}>
                  {zoneData.label}
                </text>
                <text className="zone-subtitle" x={zoneData.labelPos.x} y={zoneData.labelPos.y + 16}>
                  {zoneData.sublabel}
                </text>
              </g>
            );
          })}
          
          {/* 내부 경계선 */}
          <line x1={midpoints.left.x} y1={midpoints.left.y} x2={midpoints.right.x} y2={midpoints.right.y} stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
          <line x1={midpoints.left.x} y1={midpoints.left.y} x2={midpoints.bottom.x} y2={midpoints.bottom.y} stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
          <line x1={midpoints.right.x} y1={midpoints.right.y} x2={midpoints.bottom.x} y2={midpoints.bottom.y} stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#4a90a4' }} />
          <span>중</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#6a6a8a' }} />
          <span>상</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#aa5a6a' }} />
          <span>최상</span>
        </div>
      </div>
      
      {selectedZone && (
        <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
      )}
    </div>
  );
}

// 메인 앱
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('characters');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [mainVisible, setMainVisible] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => setMainVisible(true), 100);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="scanlines">
        {showIntro && <DilemmaIntro onComplete={handleIntroComplete} />}
        
        <div className={`main-container ${mainVisible ? 'visible' : ''}`}>
          <header className="site-header">
            <div className="logo">{CONFIG.siteTitle}</div>
            <nav className="nav-tabs">
              <button 
                className={`nav-tab ${activeTab === 'characters' ? 'active' : ''}`}
                onClick={() => setActiveTab('characters')}
              >
                PRISONERS
              </button>
              <button 
                className={`nav-tab ${activeTab === 'world' ? 'active' : ''}`}
                onClick={() => setActiveTab('world')}
              >
                RULES
              </button>
              <button 
                className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                BERMUDA
              </button>
            </nav>
          </header>
          
          <main className="content-area">
            {activeTab === 'characters' && (
              <>
                <div className="section-title">REGISTERED PRISONERS</div>
                <div className="character-grid">
                  {CONFIG.characters.map(char => (
                    <CharacterCard 
                      key={char.id}
                      character={char}
                      onClick={() => setSelectedCharacter(char)}
                    />
                  ))}
                </div>
              </>
            )}
            
            {activeTab === 'world' && (
              <>
                <div className="section-title">GAME RULES</div>
                <WorldTab />
              </>
            )}
            
            {activeTab === 'map' && (
              <>
                <div className="section-title">BERMUDA MAP</div>
                <MapTab />
              </>
            )}
          </main>
        </div>
        
        {selectedCharacter && (
          <CharacterModal 
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>
    </>
  );
}
