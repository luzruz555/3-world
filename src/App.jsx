import React, { useState, useEffect } from 'react';

// ============================================================
// 🔧 설정 영역 - 여기서 데이터를 수정하세요
// ============================================================

const CONFIG = {
  // 사이트 기본 정보
  siteTitle: "III",
  siteSubtitle: "DON'T LOSE YOURSELF",
  
  // 캐릭터 데이터 (9명) - 자유롭게 수정
  characters: [
    {
      id: "char-01",
      name: "???",
      codename: "PRISONER_01",
      image: "", // ← 이미지 경로
      concept: "「???」",
      description: "데이터 없음",
      crime: "???", // 죄목
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-02",
      name: "???",
      codename: "PRISONER_02",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-03",
      name: "???",
      codename: "PRISONER_03",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-04",
      name: "???",
      codename: "PRISONER_04",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-05",
      name: "???",
      codename: "PRISONER_05",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-06",
      name: "???",
      codename: "PRISONER_06",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-07",
      name: "???",
      codename: "PRISONER_07",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-08",
      name: "???",
      codename: "PRISONER_08",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
    {
      id: "char-09",
      name: "???",
      codename: "PRISONER_09",
      image: "",
      concept: "「???」",
      description: "데이터 없음",
      crime: "???",
      abilities: [
        { stage: 5, name: "???", desc: "???" },
        { stage: 3, name: "???", desc: "???" },
        { stage: 1, name: "???", desc: "???" },
      ],
      quote: "\"...\""
    },
  ],

  // 버뮤다 구역 (3개) - 추상적 구역
  bermudaZones: [
    {
      id: "zone-a",
      name: "SECTOR A",
      subtitle: "폐허 구역",
      description: "버뮤다가 처음 출현했을 때 파괴된 건물들이 그대로 남아있는 구역. 무너진 고층 빌딩과 뒤틀린 철골 구조물이 미로처럼 얽혀있다. 은폐와 기습에 유리하지만 언제 붕괴될지 모르는 위험이 도사린다.",
      features: ["불안정한 지형", "은폐처 다수", "붕괴 위험"],
      danger: "중",
      color: "#4a90a4",
    },
    {
      id: "zone-b",
      name: "SECTOR B",
      subtitle: "공허 구역",
      description: "아무것도 없는 평지. 시야를 가릴 것이 전혀 없어 원거리 전투에 특화된 구역이다. 숨을 곳이 없기에 오직 실력만이 생존을 보장한다. 딜레마 이벤트가 가장 자주 발생하는 장소.",
      features: ["완전 개활지", "원거리 유리", "딜레마 다발 지역"],
      danger: "상",
      color: "#a4905a",
    },
    {
      id: "zone-c",
      name: "SECTOR C",
      subtitle: "심연 구역",
      description: "버뮤다의 중심부. 현실의 법칙이 불안정하게 작동하며 공간이 왜곡되어 있다. 능력의 출력이 증폭되지만 그만큼 코인 소모도 빨라진다. 최종 결전이 벌어지는 곳.",
      features: ["공간 왜곡", "능력 증폭", "코인 소모 가속"],
      danger: "최상",
      color: "#a45a5a",
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

  /* ==================== 인트로 - 클릭 진행 ==================== */
  
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

  /* ==================== 캐릭터 모달 ==================== */
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    overflow-y: auto;
    backdrop-filter: blur(5px);
  }

  .modal-content {
    background: var(--surface);
    border: 1px solid var(--primary);
    max-width: 700px;
    width: 100%;
    margin: 20px 0;
    position: relative;
  }

  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    background: var(--bg);
    border: 1px solid var(--text-dim);
    color: var(--text);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-close:hover {
    border-color: var(--secondary);
    color: var(--secondary);
  }

  .modal-header {
    display: flex;
    gap: 16px;
    padding: 20px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  }

  .modal-image {
    width: clamp(100px, 30vw, 160px);
    height: clamp(120px, 35vw, 200px);
    background: var(--surface-light);
    border: 1px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .modal-title-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .modal-codename {
    font-family: 'Orbitron', monospace;
    font-size: clamp(9px, 2vw, 11px);
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 4px;
  }

  .modal-name {
    font-size: clamp(20px, 5vw, 28px);
    font-weight: 700;
    margin-bottom: 4px;
  }

  .modal-concept {
    font-size: clamp(11px, 2.5vw, 14px);
    color: var(--text-dim);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 8px;
  }

  .modal-crime {
    font-size: clamp(10px, 2vw, 12px);
    color: var(--secondary);
    font-family: 'JetBrains Mono', monospace;
    padding: 4px 10px;
    background: rgba(255, 51, 102, 0.1);
    display: inline-block;
    margin-bottom: 12px;
    align-self: flex-start;
  }

  .modal-quote {
    font-style: italic;
    color: var(--text-dim);
    font-size: clamp(11px, 2.5vw, 13px);
    padding-left: 10px;
    border-left: 2px solid var(--primary);
  }

  .modal-body {
    padding: 20px;
  }

  .modal-description {
    font-size: clamp(12px, 3vw, 14px);
    line-height: 1.8;
    color: var(--text);
    margin-bottom: 20px;
  }

  .abilities-section {
    margin-bottom: 20px;
  }

  .abilities-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(9px, 2vw, 10px);
    letter-spacing: 3px;
    color: var(--text-dim);
    margin-bottom: 12px;
  }

  .ability-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: rgba(0, 240, 255, 0.03);
    border-left: 3px solid var(--primary);
    margin-bottom: 8px;
  }

  .ability-item.critical {
    border-left-color: var(--secondary);
    background: rgba(255, 51, 102, 0.05);
  }

  .ability-stage {
    font-family: 'Orbitron', monospace;
    font-size: clamp(14px, 4vw, 18px);
    font-weight: 900;
    min-width: 24px;
  }

  .ability-content {
    flex: 1;
    min-width: 0;
  }

  .ability-name {
    font-weight: 700;
    font-size: clamp(12px, 3vw, 14px);
    margin-bottom: 2px;
  }

  .ability-desc {
    font-size: clamp(11px, 2.5vw, 12px);
    color: var(--text-dim);
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

  /* 용어집 */
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

  /* 딜레마 테이블 */
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

  /* 코인 시스템 */
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

  /* ==================== 지도 탭 ==================== */
  
  .map-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .map-visual {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    aspect-ratio: 1;
    position: relative;
    background: var(--surface);
    border: 1px solid rgba(0, 240, 255, 0.2);
  }

  .bermuda-triangle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .triangle-main {
    fill: none;
    stroke: var(--primary);
    stroke-width: 2;
    filter: drop-shadow(0 0 10px var(--primary));
    animation: trianglePulse 3s infinite;
  }

  @keyframes trianglePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .zone-area {
    fill: rgba(0, 240, 255, 0.05);
    stroke: rgba(0, 240, 255, 0.3);
    stroke-width: 1;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .zone-area:hover {
    fill: rgba(0, 240, 255, 0.15);
  }

  .zone-area.active {
    fill: rgba(0, 240, 255, 0.2);
    stroke: var(--primary);
    stroke-width: 2;
  }

  .zone-label {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    fill: var(--text);
    text-anchor: middle;
    pointer-events: none;
  }

  .zone-sublabel {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 10px;
    fill: var(--text-dim);
    text-anchor: middle;
    pointer-events: none;
  }

  .zone-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .zone-card {
    background: var(--surface);
    border: 1px solid rgba(0, 240, 255, 0.1);
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .zone-card:hover,
  .zone-card.active {
    border-color: var(--primary);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
  }

  .zone-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .zone-card-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Orbitron', monospace;
    font-size: 16px;
    font-weight: 900;
    border: 2px solid;
  }

  .zone-card-titles {
    flex: 1;
  }

  .zone-card-name {
    font-family: 'Orbitron', monospace;
    font-size: clamp(12px, 3vw, 14px);
    font-weight: 700;
    margin-bottom: 2px;
  }

  .zone-card-subtitle {
    font-size: clamp(11px, 2.5vw, 12px);
    color: var(--text-dim);
  }

  .zone-card-desc {
    font-size: clamp(12px, 3vw, 13px);
    line-height: 1.7;
    color: var(--text-dim);
    margin-bottom: 12px;
  }

  .zone-card-features {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }

  .zone-feature {
    font-size: clamp(9px, 2vw, 10px);
    padding: 4px 8px;
    background: rgba(0, 240, 255, 0.1);
    color: var(--primary);
    font-family: 'JetBrains Mono', monospace;
  }

  .zone-card-danger {
    font-family: 'Orbitron', monospace;
    font-size: clamp(10px, 2vw, 11px);
  }

  .zone-danger-label {
    color: var(--text-dim);
    margin-right: 8px;
  }

  .zone-danger-value {
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

  @media (max-width: 480px) {
    .character-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    
    .modal-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .modal-crime {
      align-self: center;
    }
    
    .modal-quote {
      border-left: none;
      border-top: 2px solid var(--primary);
      padding-left: 0;
      padding-top: 10px;
      text-align: center;
    }
    
    .dilemma-visual {
      flex-direction: column;
      gap: 20px;
    }
    
    .vs-text {
      transform: rotate(90deg);
    }
    
    .dilemma-result {
      gap: 60px;
    }
  }
`;

// ============================================================
// 🎬 컴포넌트
// ============================================================

// 인트로: 클릭하여 진행
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
    // Step 0: 제목
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
    // Step 1: 둘 다 협력
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
    // Step 2: 둘 다 배신
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
    // Step 3: 한 명만 배신
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
    // Step 4: 역설
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
    // Step 5: 결론
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
  return (
    <div className="character-card" onClick={onClick}>
      <div className="character-image">
        {character.image ? (
          <img src={character.image} alt={character.name} />
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

// 캐릭터 모달
function CharacterModal({ character, onClose }) {
  if (!character) return null;
  
  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-image">
            {character.image ? (
              <img src={character.image} alt={character.name} />
            ) : (
              <div className="character-placeholder">?</div>
            )}
          </div>
          <div className="modal-title-area">
            <div className="modal-codename">{character.codename}</div>
            <div className="modal-name">{character.name}</div>
            <div className="modal-concept">{character.concept}</div>
            <div className="modal-crime">죄목: {character.crime}</div>
            <div className="modal-quote">{character.quote}</div>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="modal-description">{character.description}</div>
          
          <div className="abilities-section">
            <div className="abilities-title">ABILITIES BY COIN</div>
            {character.abilities.map((ability, idx) => (
              <div key={idx} className={`ability-item ${ability.stage === 1 ? 'critical' : ''}`}>
                <div className="ability-stage" style={{ 
                  color: ability.stage === 1 ? '#ff3366' : 
                         ability.stage === 3 ? '#00f0ff' : '#666' 
                }}>
                  {ability.stage}
                </div>
                <div className="ability-content">
                  <div className="ability-name">{ability.name}</div>
                  <div className="ability-desc">{ability.desc}</div>
                </div>
              </div>
            ))}
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
      {/* 용어집 */}
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
      
      {/* 딜레마 규칙 */}
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
      
      {/* 코인 시스템 */}
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

// 지도 탭
function MapTab() {
  const [activeZone, setActiveZone] = useState(CONFIG.bermudaZones[0]);
  
  // 삼각형 좌표 (SVG 내부)
  const trianglePoints = {
    top: { x: 200, y: 50 },
    left: { x: 60, y: 330 },
    right: { x: 340, y: 330 },
  };
  
  // 중심점
  const center = {
    x: (trianglePoints.top.x + trianglePoints.left.x + trianglePoints.right.x) / 3,
    y: (trianglePoints.top.y + trianglePoints.left.y + trianglePoints.right.y) / 3,
  };
  
  // 각 구역의 중심점
  const zonePositions = [
    { x: (trianglePoints.top.x + center.x + (trianglePoints.top.x + trianglePoints.left.x) / 2 + (trianglePoints.top.x + trianglePoints.right.x) / 2) / 4, y: trianglePoints.top.y + 70 }, // A
    { x: trianglePoints.left.x + 60, y: trianglePoints.left.y - 60 }, // B
    { x: trianglePoints.right.x - 60, y: trianglePoints.right.y - 60 }, // C
  ];
  
  return (
    <div className="map-container">
      <div className="map-visual">
        <svg viewBox="0 0 400 400" className="bermuda-triangle">
          {/* 메인 삼각형 */}
          <polygon
            className="triangle-main"
            points={`${trianglePoints.top.x},${trianglePoints.top.y} ${trianglePoints.left.x},${trianglePoints.left.y} ${trianglePoints.right.x},${trianglePoints.right.y}`}
          />
          
          {/* 구역 A (상단) */}
          <polygon
            className={`zone-area ${activeZone.id === 'zone-a' ? 'active' : ''}`}
            points={`${trianglePoints.top.x},${trianglePoints.top.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.left.x) / 2},${(trianglePoints.top.y + trianglePoints.left.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[0])}
          />
          <polygon
            className={`zone-area ${activeZone.id === 'zone-a' ? 'active' : ''}`}
            points={`${trianglePoints.top.x},${trianglePoints.top.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.right.x) / 2},${(trianglePoints.top.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[0])}
          />
          <text className="zone-label" x={zonePositions[0].x} y={zonePositions[0].y}>A</text>
          <text className="zone-sublabel" x={zonePositions[0].x} y={zonePositions[0].y + 14}>폐허</text>
          
          {/* 구역 B (좌하단) */}
          <polygon
            className={`zone-area ${activeZone.id === 'zone-b' ? 'active' : ''}`}
            points={`${trianglePoints.left.x},${trianglePoints.left.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.left.x) / 2},${(trianglePoints.top.y + trianglePoints.left.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[1])}
          />
          <polygon
            className={`zone-area ${activeZone.id === 'zone-b' ? 'active' : ''}`}
            points={`${trianglePoints.left.x},${trianglePoints.left.y} ${center.x},${center.y} ${(trianglePoints.left.x + trianglePoints.right.x) / 2},${(trianglePoints.left.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[1])}
          />
          <text className="zone-label" x={zonePositions[1].x} y={zonePositions[1].y}>B</text>
          <text className="zone-sublabel" x={zonePositions[1].x} y={zonePositions[1].y + 14}>공허</text>
          
          {/* 구역 C (우하단) */}
          <polygon
            className={`zone-area ${activeZone.id === 'zone-c' ? 'active' : ''}`}
            points={`${trianglePoints.right.x},${trianglePoints.right.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.right.x) / 2},${(trianglePoints.top.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[2])}
          />
          <polygon
            className={`zone-area ${activeZone.id === 'zone-c' ? 'active' : ''}`}
            points={`${trianglePoints.right.x},${trianglePoints.right.y} ${center.x},${center.y} ${(trianglePoints.left.x + trianglePoints.right.x) / 2},${(trianglePoints.left.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[2])}
          />
          <text className="zone-label" x={zonePositions[2].x} y={zonePositions[2].y}>C</text>
          <text className="zone-sublabel" x={zonePositions[2].x} y={zonePositions[2].y + 14}>심연</text>
          
          {/* 중심점 */}
          <circle cx={center.x} cy={center.y} r="5" fill="#00f0ff" />
          <text 
            x={center.x} 
            y={center.y + 20} 
            style={{ 
              fontFamily: 'Orbitron, monospace', 
              fontSize: '8px', 
              fill: '#00f0ff',
              textAnchor: 'middle'
            }}
          >
            CENTER
          </text>
        </svg>
      </div>
      
      <div className="zone-cards">
        {CONFIG.bermudaZones.map(zone => (
          <div 
            key={zone.id}
            className={`zone-card ${activeZone.id === zone.id ? 'active' : ''}`}
            onClick={() => setActiveZone(zone)}
          >
            <div className="zone-card-header">
              <div 
                className="zone-card-icon"
                style={{ borderColor: zone.color, color: zone.color }}
              >
                {zone.name.split(' ')[1]}
              </div>
              <div className="zone-card-titles">
                <div className="zone-card-name" style={{ color: zone.color }}>{zone.name}</div>
                <div className="zone-card-subtitle">{zone.subtitle}</div>
              </div>
            </div>
            <div className="zone-card-desc">{zone.description}</div>
            <div className="zone-card-features">
              {zone.features.map((feature, idx) => (
                <span key={idx} className="zone-feature">{feature}</span>
              ))}
            </div>
            <div className="zone-card-danger">
              <span className="zone-danger-label">위험도:</span>
              <span className="zone-danger-value">{zone.danger}</span>
            </div>
          </div>
        ))}
      </div>
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
