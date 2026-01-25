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

  // 버뮤다 지역 (3개)
  bermudaZones: [
    {
      id: "zone-alpha",
      name: "SECTOR α",
      subtitle: "종로 구역",
      description: "버뮤다 북부. 고궁과 오래된 건물들이 뒤틀린 공간.",
      danger: "중",
    },
    {
      id: "zone-beta",
      name: "SECTOR β",
      subtitle: "여의도 구역",
      description: "버뮤다 서부. 마천루 사이로 형성된 수직 전장.",
      danger: "상",
    },
    {
      id: "zone-gamma",
      name: "SECTOR γ",
      subtitle: "강남 구역",
      description: "버뮤다 남부. 지하철과 상업시설이 미로처럼 얽힌 곳.",
      danger: "최상",
    },
  ],

  // 용어집
  glossary: [
    {
      term: "버뮤다",
      definition: "서울 한복판에 출현한 삼각형 구역. 죄수들이 강제로 소환되어 최후의 1인이 될 때까지 싸우는 배틀로얄 공간.",
    },
    {
      term: "죄수",
      definition: "이능력을 가진 자들. 이유는 불명이나 모두 '죄'를 지었다고 판정되어 버뮤다에 소환된다.",
    },
    {
      term: "코인",
      definition: "죄수의 목숨. 사망 시 1개 소모 후 부활. 0개가 되면 영구 탈락.",
    },
    {
      term: "딜레마",
      definition: "코인 4개 미만의 죄수들에게 주어지는 선택의 기회. 협력과 배신 중 하나를 선택한다.",
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
  
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
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

  /* ==================== 인트로 - 죄수의 딜레마 설명 ==================== */
  
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
  }

  .skip-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    padding: 10px 24px;
    background: transparent;
    border: 1px solid var(--text-dim);
    color: var(--text-dim);
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .skip-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .dilemma-scene {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    opacity: 0;
    animation: fadeIn 1s ease forwards;
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  .dilemma-title {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    letter-spacing: 6px;
    color: var(--text-dim);
  }

  .dilemma-visual {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  .prisoner-box {
    width: 120px;
    height: 160px;
    border: 2px solid var(--text-dim);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
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
    font-size: 40px;
    opacity: 0.8;
  }

  .prisoner-label {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--text-dim);
  }

  .prisoner-choice {
    position: absolute;
    bottom: -30px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 2px;
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
    font-size: 24px;
    color: var(--text-dim);
  }

  .dilemma-result {
    display: flex;
    gap: 100px;
    margin-top: 20px;
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
    font-size: 28px;
    font-weight: 900;
  }

  .result-coins.positive {
    color: var(--primary);
  }

  .result-coins.negative {
    color: var(--secondary);
  }

  .result-coins.neutral {
    color: var(--text-dim);
  }

  .dilemma-narration {
    max-width: 500px;
    text-align: center;
    font-size: 15px;
    line-height: 2;
    color: var(--text);
    opacity: 0;
    animation: fadeIn 1s ease forwards;
    animation-delay: 0.5s;
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
    bottom: 40px;
    display: flex;
    gap: 8px;
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
    height: 70px;
    background: linear-gradient(180deg, var(--bg), transparent);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    z-index: 100;
    backdrop-filter: blur(10px);
  }

  .logo {
    font-family: 'Orbitron', monospace;
    font-size: 28px;
    font-weight: 900;
    color: var(--primary);
    text-shadow: 0 0 20px var(--primary);
    cursor: pointer;
  }

  .nav-tabs {
    display: flex;
    gap: 8px;
  }

  .nav-tab {
    padding: 10px 24px;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--text-dim);
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
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
    padding: 100px 40px 40px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-title {
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 4px;
    color: var(--text-dim);
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 16px;
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
    gap: 20px;
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
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .character-card:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0, 240, 255, 0.15);
  }

  .character-card:hover::before {
    opacity: 1;
  }

  .character-image {
    width: 100%;
    height: 70%;
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
    font-size: 48px;
    color: var(--text-dim);
    opacity: 0.3;
  }

  .character-info {
    padding: 16px;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .character-codename {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 4px;
  }

  .character-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .character-concept {
    font-size: 12px;
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
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    backdrop-filter: blur(5px);
  }

  .modal-content {
    background: var(--surface);
    border: 1px solid var(--primary);
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid var(--text-dim);
    color: var(--text);
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .modal-close:hover {
    border-color: var(--secondary);
    color: var(--secondary);
  }

  .modal-header {
    display: flex;
    gap: 24px;
    padding: 24px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  }

  .modal-image {
    width: 180px;
    height: 220px;
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
  }

  .modal-codename {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--primary);
    margin-bottom: 8px;
  }

  .modal-name {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .modal-concept {
    font-size: 14px;
    color: var(--text-dim);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 12px;
  }

  .modal-crime {
    font-size: 12px;
    color: var(--secondary);
    font-family: 'JetBrains Mono', monospace;
    padding: 6px 12px;
    background: rgba(255, 51, 102, 0.1);
    display: inline-block;
    margin-bottom: 16px;
  }

  .modal-quote {
    font-style: italic;
    color: var(--text-dim);
    font-size: 13px;
    padding-left: 12px;
    border-left: 2px solid var(--primary);
  }

  .modal-body {
    padding: 24px;
  }

  .modal-description {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text);
    margin-bottom: 24px;
  }

  .abilities-section {
    margin-bottom: 24px;
  }

  .abilities-title {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
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
    font-size: 18px;
    font-weight: 900;
    min-width: 30px;
  }

  .ability-content {
    flex: 1;
  }

  .ability-name {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 2px;
  }

  .ability-desc {
    font-size: 12px;
    color: var(--text-dim);
  }

  /* ==================== 세계관 탭 ==================== */
  
  .world-section {
    margin-bottom: 48px;
  }

  .world-section-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  }

  /* 코인 시스템 */
  .coin-system {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .coin-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    background: var(--surface);
    border-left: 4px solid;
    transition: all 0.3s ease;
  }

  .coin-row:hover {
    background: var(--surface-light);
  }

  .coin-number {
    font-family: 'Orbitron', monospace;
    font-size: 24px;
    font-weight: 900;
    min-width: 40px;
  }

  .coin-state {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    min-width: 60px;
  }

  .coin-power {
    font-size: 13px;
    color: var(--text-dim);
  }

  /* 딜레마 테이블 */
  .dilemma-table {
    width: 100%;
    border-collapse: collapse;
  }

  .dilemma-table th,
  .dilemma-table td {
    padding: 12px 16px;
    text-align: center;
    border: 1px solid rgba(0, 240, 255, 0.1);
  }

  .dilemma-table th {
    background: var(--surface);
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-dim);
  }

  .dilemma-table td {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
  }

  .dilemma-condition {
    font-size: 12px;
    color: var(--warning);
    margin-bottom: 16px;
    font-family: 'JetBrains Mono', monospace;
  }

  /* 용어집 */
  .glossary-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .glossary-item {
    background: var(--surface);
    padding: 20px;
    border-left: 3px solid var(--primary);
  }

  .glossary-term {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 8px;
  }

  .glossary-def {
    font-size: 13px;
    line-height: 1.7;
    color: var(--text-dim);
  }

  /* ==================== 지도 탭 ==================== */
  
  .map-container {
    display: flex;
    gap: 40px;
  }

  .map-visual {
    flex: 1;
    aspect-ratio: 1;
    position: relative;
    background: var(--surface);
    border: 1px solid rgba(0, 240, 255, 0.2);
  }

  .seoul-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }

  .bermuda-triangle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
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
  }

  .zone-label {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    fill: var(--text);
    text-anchor: middle;
    pointer-events: none;
  }

  .zone-sublabel {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 8px;
    fill: var(--text-dim);
    text-anchor: middle;
    pointer-events: none;
  }

  .map-info {
    width: 300px;
  }

  .zone-detail {
    background: var(--surface);
    border: 1px solid var(--primary);
    padding: 24px;
  }

  .zone-detail-title {
    font-family: 'Orbitron', monospace;
    font-size: 18px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 4px;
  }

  .zone-detail-subtitle {
    font-size: 14px;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .zone-detail-desc {
    font-size: 13px;
    line-height: 1.8;
    margin-bottom: 16px;
  }

  .zone-danger {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 2px;
  }

  .zone-danger-label {
    color: var(--text-dim);
    margin-right: 8px;
  }

  .zone-danger-value {
    color: var(--secondary);
  }

  /* ==================== 반응형 ==================== */
  
  @media (max-width: 1024px) {
    .character-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .map-container {
      flex-direction: column;
    }
    
    .map-info {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .site-header {
      padding: 0 20px;
    }
    
    .content-area {
      padding: 90px 20px 20px;
    }
    
    .character-grid {
      grid-template-columns: 1fr;
    }
    
    .glossary-grid {
      grid-template-columns: 1fr;
    }
    
    .modal-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .dilemma-visual {
      flex-direction: column;
      gap: 30px;
    }
    
    .vs-text {
      transform: rotate(90deg);
    }
    
    .dilemma-result {
      gap: 40px;
    }
  }
`;

// ============================================================
// 🎬 컴포넌트
// ============================================================

// 인트로: 죄수의 딜레마 설명
function DilemmaIntro({ onComplete }) {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  useEffect(() => {
    if (step < totalSteps) {
      const timer = setTimeout(() => setStep(s => s + 1), 3500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

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
          <br />둘 다 코인을 얻는다.
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
          <br />배신자는 2개를 얻고, 협력자는 잃는다.
        </>
      ),
    },
    // Step 4: 결론
    {
      title: "THE RULE",
      visual: null,
      narration: (
        <>
          <span className="narration-warning">강해지려면 죽음에 가까워야 한다.</span>
          <br /><br />
          살기 위해 코인을 모으면 약해지고,
          <br />강해지려면 목숨을 내려놓아야 한다.
          <br /><br />
          <span className="narration-highlight">DON'T LOSE YOURSELF.</span>
        </>
      ),
    },
  ];

  const currentScene = scenes[step] || scenes[scenes.length - 1];

  return (
    <div className="intro-container">
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
      
      {/* 딜레마 규칙 */}
      <div className="world-section">
        <div className="world-section-title">DILEMMA</div>
        <div className="dilemma-condition">※ {CONFIG.rules.dilemma.condition}</div>
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
    </div>
  );
}

// 지도 탭
function MapTab() {
  const [activeZone, setActiveZone] = useState(CONFIG.bermudaZones[0]);
  
  // 삼각형 좌표 (SVG 내부)
  const trianglePoints = {
    top: { x: 200, y: 40 },      // 종로 (북)
    left: { x: 60, y: 340 },     // 여의도 (서)
    right: { x: 340, y: 340 },   // 강남 (남)
  };
  
  // 중심점
  const center = {
    x: (trianglePoints.top.x + trianglePoints.left.x + trianglePoints.right.x) / 3,
    y: (trianglePoints.top.y + trianglePoints.left.y + trianglePoints.right.y) / 3,
  };
  
  return (
    <div className="map-container">
      <div className="map-visual">
        <svg viewBox="0 0 400 400" className="bermuda-triangle">
          {/* 메인 삼각형 */}
          <polygon
            className="triangle-main"
            points={`${trianglePoints.top.x},${trianglePoints.top.y} ${trianglePoints.left.x},${trianglePoints.left.y} ${trianglePoints.right.x},${trianglePoints.right.y}`}
          />
          
          {/* 구역 α (상단) */}
          <polygon
            className={`zone-area ${activeZone.id === 'zone-alpha' ? 'active' : ''}`}
            points={`${trianglePoints.top.x},${trianglePoints.top.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.left.x) / 2},${(trianglePoints.top.y + trianglePoints.left.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[0])}
          />
          <polygon
            className={`zone-area ${activeZone.id === 'zone-alpha' ? 'active' : ''}`}
            points={`${trianglePoints.top.x},${trianglePoints.top.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.right.x) / 2},${(trianglePoints.top.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[0])}
          />
          <text className="zone-label" x={trianglePoints.top.x} y={trianglePoints.top.y + 50}>α</text>
          <text className="zone-sublabel" x={trianglePoints.top.x} y={trianglePoints.top.y + 65}>종로</text>
          
          {/* 구역 β (좌하단) */}
          <polygon
            className={`zone-area ${activeZone.id === 'zone-beta' ? 'active' : ''}`}
            points={`${trianglePoints.left.x},${trianglePoints.left.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.left.x) / 2},${(trianglePoints.top.y + trianglePoints.left.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[1])}
          />
          <polygon
            className={`zone-area ${activeZone.id === 'zone-beta' ? 'active' : ''}`}
            points={`${trianglePoints.left.x},${trianglePoints.left.y} ${center.x},${center.y} ${(trianglePoints.left.x + trianglePoints.right.x) / 2},${(trianglePoints.left.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[1])}
          />
          <text className="zone-label" x={trianglePoints.left.x + 50} y={trianglePoints.left.y - 30}>β</text>
          <text className="zone-sublabel" x={trianglePoints.left.x + 50} y={trianglePoints.left.y - 15}>여의도</text>
          
          {/* 구역 γ (우하단) */}
          <polygon
            className={`zone-area ${activeZone.id === 'zone-gamma' ? 'active' : ''}`}
            points={`${trianglePoints.right.x},${trianglePoints.right.y} ${center.x},${center.y} ${(trianglePoints.top.x + trianglePoints.right.x) / 2},${(trianglePoints.top.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[2])}
          />
          <polygon
            className={`zone-area ${activeZone.id === 'zone-gamma' ? 'active' : ''}`}
            points={`${trianglePoints.right.x},${trianglePoints.right.y} ${center.x},${center.y} ${(trianglePoints.left.x + trianglePoints.right.x) / 2},${(trianglePoints.left.y + trianglePoints.right.y) / 2}`}
            onClick={() => setActiveZone(CONFIG.bermudaZones[2])}
          />
          <text className="zone-label" x={trianglePoints.right.x - 50} y={trianglePoints.right.y - 30}>γ</text>
          <text className="zone-sublabel" x={trianglePoints.right.x - 50} y={trianglePoints.right.y - 15}>강남</text>
          
          {/* 중심점 */}
          <circle cx={center.x} cy={center.y} r="4" fill="#00f0ff" />
        </svg>
      </div>
      
      <div className="map-info">
        <div className="zone-detail">
          <div className="zone-detail-title">{activeZone.name}</div>
          <div className="zone-detail-subtitle">{activeZone.subtitle}</div>
          <div className="zone-detail-desc">{activeZone.description}</div>
          <div className="zone-danger">
            <span className="zone-danger-label">위험도:</span>
            <span className="zone-danger-value">{activeZone.danger}</span>
          </div>
        </div>
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
