import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// 🔧 설정 영역 - 여기서 캐릭터/세계관 데이터를 수정하세요
// ============================================================

const CONFIG = {
  // 사이트 기본 정보
  siteTitle: "III",
  siteSubtitle: "DON'T LOSE YOURSELF",
  
  // 인트로 퀘스트 메시지
  questMessage: {
    title: "INVITATION",
    subtitle: "새로운 참가자를 감지했습니다",
    description: "삼각지대가 당신을 초대합니다.\n생존하려면 싸우십시오.\n3의 법칙을 따르십시오.",
    acceptText: "수락",
    rejectText: "거부",
    rejectWarning: "거부는 허용되지 않습니다."
  },

  // 캐릭터 데이터 - 자유롭게 추가/수정 가능
  characters: [
    {
      id: "selector",
      name: "지목자",
      codename: "SELECTOR",
      image: "/api/placeholder/400/500", // ← 이미지 경로 수정
      concept: "「지목 / 선택」",
      description: "손가락으로 가리키는 행위 자체가 능력의 트리거. 시선과 손끝이 일치하는 순간, 대상은 선택된다.",
      abilities: [
        { stage: 1, name: "표식", desc: "대상에게 추적 가능한 표식 부여" },
        { stage: 2, name: "속박", desc: "표식된 대상의 움직임 강제 정지" },
        { stage: 3, name: "선고", desc: "지목한 대상의 존재 자체를 부정", warning: "자아 잠식 위험" }
      ],
      stats: { power: 7, speed: 5, range: 9, technique: 8, risk: 10 },
      quote: "\"네가 선택된 거야. 거부권 따윈 없어.\""
    },
    {
      id: "director",
      name: "연출가",
      codename: "DIRECTOR",
      image: "/api/placeholder/400/500", // ← 이미지 경로 수정
      concept: "「무대 / 연출」",
      description: "일정 범위를 '극장'으로 선언하면 그 안의 현실이 각본처럼 작동한다. 단, 연출가 본인도 무대의 규칙에서 벗어날 수 없다.",
      abilities: [
        { stage: 1, name: "독백", desc: "영역 내 대상에게 강제 진실 발화" },
        { stage: 2, name: "각본", desc: "지정한 행동 패턴 강제 부여" },
        { stage: 3, name: "커튼콜", desc: "무대 위 모든 것을 처음으로 되돌림", warning: "기억 소실 위험" }
      ],
      stats: { power: 6, speed: 4, range: 8, technique: 10, risk: 8 },
      quote: "\"이 무대의 주인공은 나야. 넌 그저 엑스트라일 뿐.\""
    },
    // ↓ 새 캐릭터 추가 예시 (복사해서 사용)
    // {
    //   id: "newchar",
    //   name: "새 캐릭터",
    //   codename: "NEWCHAR",
    //   image: "/api/placeholder/400/500",
    //   concept: "「개념」",
    //   description: "설명",
    //   abilities: [
    //     { stage: 1, name: "1단계", desc: "설명" },
    //     { stage: 2, name: "2단계", desc: "설명" },
    //     { stage: 3, name: "3단계", desc: "설명", warning: "경고" }
    //   ],
    //   stats: { power: 5, speed: 5, range: 5, technique: 5, risk: 5 },
    //   quote: "\"대사\""
    // },
  ],

  // 세계관 설정 데이터
  worldSettings: [
    {
      id: "triangle-zone",
      title: "삼각지대",
      icon: "△",
      content: `도시 곳곳에 무작위로 출현하는 이공간. 
      
삼각지대 내부에서는 일반인의 인식이 차단되며, 오직 '각인자'만이 진입할 수 있다.

한 번 진입하면 게임이 종료될 때까지 탈출 불가.
외부 시간과 내부 시간의 흐름이 다르며, 보통 내부에서의 1시간은 외부의 3분에 해당한다.`,
      tags: ["장소", "핵심설정"]
    },
    {
      id: "rule-of-three",
      title: "3의 법칙",
      icon: "III",
      content: `삼각지대 내 모든 것을 지배하는 절대 규칙.

▸ 3인 1조: 진입 시 자동으로 3인 팀 구성
▸ 3진 아웃: 능력 실패 또는 치명타 3회 누적 시 탈락
▸ 3단계 해방: 능력은 최대 3단계까지 각성 가능
▸ 제3자 금지: 게임 중 외부 개입 절대 불가

이 법칙을 어긴 자는 '소거'된다.`,
      tags: ["규칙", "핵심설정"]
    },
    {
      id: "imprinter",
      title: "각인자",
      icon: "◈",
      content: `도시가 축적한 집단 무의식의 '개념'이 인간에게 각인되어 능력으로 발현된 존재.

각인은 대부분 트라우마나 강렬한 경험을 통해 발생하며, 한 번 각인된 개념은 변경 불가.

3단계 능력을 과다 사용하면 자아가 개념에 잠식되어 '나'를 잃게 된다.
DON'T LOSE YOURSELF.`,
      tags: ["능력", "인물"]
    },
    {
      id: "elimination",
      title: "탈락과 소거",
      icon: "✕",
      content: `탈락: 3진 아웃 시 발생. 삼각지대에서 강제 퇴장되며, 24시간 동안 재진입 불가. 능력이 일시적으로 봉인됨.

소거: 3의 법칙 위반 시 발생. 존재 자체가 삼각지대에 의해 '삭제'됨. 
소거된 자는 외부 세계에서도 모든 기록과 기억에서 사라진다.`,
      tags: ["규칙", "패널티"]
    },
    // ↓ 새 설정 추가 예시
    // {
    //   id: "new-setting",
    //   title: "새 설정",
    //   icon: "★",
    //   content: "설정 내용",
    //   tags: ["태그1", "태그2"]
    // },
  ],

  // 색상 테마
  theme: {
    primary: "#00f0ff",      // 시안 (메인 액센트)
    secondary: "#ff3366",    // 레드 (위험/경고)
    background: "#0a0a0f",   // 배경
    surface: "#12121a",      // 카드 배경
    text: "#e0e0e0",         // 기본 텍스트
    textDim: "#666677",      // 흐린 텍스트
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
    --bg: ${CONFIG.theme.background};
    --surface: ${CONFIG.theme.surface};
    --text: ${CONFIG.theme.text};
    --text-dim: ${CONFIG.theme.textDim};
  }
  
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
  }
  
  /* 스캔라인 효과 */
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
      rgba(0, 240, 255, 0.01) 2px,
      rgba(0, 240, 255, 0.01) 4px
    );
    pointer-events: none;
    z-index: 9999;
  }
  
  /* 인트로 컨테이너 */
  .intro-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  /* 삼각형 SVG */
  .triangle-svg {
    width: 300px;
    height: 300px;
  }
  
  .triangle-path {
    fill: none;
    stroke: var(--primary);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 0 10px var(--primary)) drop-shadow(0 0 20px var(--primary));
    stroke-dasharray: 600;
    stroke-dashoffset: 600;
  }
  
  .triangle-path.drawing {
    animation: drawTriangle 2s ease-out forwards;
  }
  
  .triangle-path.flipping {
    animation: flipTriangle 1s ease-in-out forwards;
  }
  
  @keyframes drawTriangle {
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes flipTriangle {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
  }
  
  .triangle-container {
    transform-origin: center;
    transition: transform 1s ease-in-out;
  }
  
  .triangle-container.flipped {
    transform: rotate(180deg);
  }
  
  /* 퀘스트 UI */
  .quest-panel {
    position: absolute;
    background: linear-gradient(135deg, rgba(18, 18, 26, 0.95), rgba(10, 10, 15, 0.98));
    border: 1px solid var(--primary);
    padding: 0;
    max-width: 450px;
    width: 90%;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 
      0 0 30px rgba(0, 240, 255, 0.2),
      inset 0 0 60px rgba(0, 240, 255, 0.03);
    clip-path: polygon(
      0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px,
      100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px)
    );
  }
  
  .quest-panel.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  .quest-header {
    background: linear-gradient(90deg, var(--primary), transparent);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  }
  
  .quest-icon {
    width: 24px;
    height: 24px;
    border: 2px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    font-weight: 900;
    color: var(--primary);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 5px var(--primary); }
    50% { box-shadow: 0 0 15px var(--primary), 0 0 25px var(--primary); }
  }
  
  .quest-title {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: 3px;
  }
  
  .quest-body {
    padding: 24px;
  }
  
  .quest-subtitle {
    font-size: 11px;
    color: var(--text-dim);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .quest-description {
    font-size: 15px;
    line-height: 2;
    color: var(--text);
    white-space: pre-line;
    margin-bottom: 24px;
    padding-left: 16px;
    border-left: 2px solid var(--primary);
  }
  
  .quest-buttons {
    display: flex;
    gap: 12px;
  }
  
  .quest-btn {
    flex: 1;
    padding: 14px 24px;
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .quest-btn.accept {
    background: var(--primary);
    color: var(--bg);
  }
  
  .quest-btn.accept:hover {
    box-shadow: 0 0 30px var(--primary);
    transform: translateY(-2px);
  }
  
  .quest-btn.reject {
    background: transparent;
    color: var(--secondary);
    border: 1px solid var(--secondary);
  }
  
  .quest-btn.reject:hover {
    background: rgba(255, 51, 102, 0.1);
  }
  
  .reject-warning {
    color: var(--secondary);
    font-size: 11px;
    text-align: center;
    margin-top: 12px;
    font-family: 'JetBrains Mono', monospace;
    animation: glitch 0.3s infinite;
  }
  
  @keyframes glitch {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; transform: translateX(2px); }
  }
  
  /* 메인 컨테이너 */
  .main-container {
    min-height: 100vh;
    opacity: 0;
    transition: opacity 0.8s ease;
  }
  
  .main-container.visible {
    opacity: 1;
  }
  
  /* 헤더 */
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
  
  /* 콘텐츠 영역 */
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
  
  /* 캐릭터 그리드 */
  .character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 24px;
  }
  
  .character-card {
    background: var(--surface);
    border: 1px solid rgba(0, 240, 255, 0.1);
    transition: all 0.4s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
    height: 280px;
    object-fit: cover;
    filter: grayscale(30%);
    transition: filter 0.3s ease;
  }
  
  .character-card:hover .character-image {
    filter: grayscale(0%);
  }
  
  .character-info {
    padding: 20px;
  }
  
  .character-codename {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 4px;
  }
  
  .character-name {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  .character-concept {
    font-size: 13px;
    color: var(--text-dim);
    font-family: 'JetBrains Mono', monospace;
  }
  
  /* 캐릭터 상세 모달 */
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
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
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
    gap: 30px;
    padding: 30px;
    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  }
  
  .modal-image {
    width: 200px;
    height: 250px;
    object-fit: cover;
    border: 1px solid var(--primary);
  }
  
  .modal-title-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .modal-codename {
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    letter-spacing: 4px;
    color: var(--primary);
    margin-bottom: 8px;
  }
  
  .modal-name {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  
  .modal-concept {
    font-size: 16px;
    color: var(--text-dim);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 20px;
  }
  
  .modal-quote {
    font-style: italic;
    color: var(--text-dim);
    font-size: 14px;
    padding-left: 16px;
    border-left: 2px solid var(--primary);
  }
  
  .modal-body {
    padding: 30px;
  }
  
  .modal-description {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text);
    margin-bottom: 30px;
  }
  
  .abilities-section {
    margin-bottom: 30px;
  }
  
  .abilities-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--text-dim);
    margin-bottom: 16px;
  }
  
  .ability-item {
    display: flex;
    gap: 16px;
    padding: 16px;
    background: rgba(0, 240, 255, 0.03);
    border-left: 3px solid var(--primary);
    margin-bottom: 12px;
  }
  
  .ability-item.warning {
    border-left-color: var(--secondary);
    background: rgba(255, 51, 102, 0.05);
  }
  
  .ability-stage {
    font-family: 'Orbitron', monospace;
    font-size: 24px;
    font-weight: 900;
    color: var(--primary);
    min-width: 40px;
  }
  
  .ability-item.warning .ability-stage {
    color: var(--secondary);
  }
  
  .ability-content {
    flex: 1;
  }
  
  .ability-name {
    font-weight: 700;
    margin-bottom: 4px;
  }
  
  .ability-desc {
    font-size: 14px;
    color: var(--text-dim);
  }
  
  .ability-warning {
    font-size: 11px;
    color: var(--secondary);
    margin-top: 8px;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .stats-section {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-label {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-dim);
    margin-bottom: 8px;
    font-family: 'Orbitron', monospace;
  }
  
  .stat-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 8px;
    overflow: hidden;
  }
  
  .stat-fill {
    height: 100%;
    background: var(--primary);
    transition: width 0.5s ease;
  }
  
  .stat-fill.danger {
    background: var(--secondary);
  }
  
  .stat-value {
    font-family: 'Orbitron', monospace;
    font-size: 18px;
    font-weight: 700;
  }
  
  /* 세계관 설정 그리드 */
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }
  
  .setting-card {
    background: var(--surface);
    border: 1px solid rgba(0, 240, 255, 0.1);
    padding: 24px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .setting-card:hover {
    border-color: var(--primary);
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
  }
  
  .setting-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  
  .setting-icon {
    font-family: 'Orbitron', monospace;
    font-size: 24px;
    color: var(--primary);
    text-shadow: 0 0 10px var(--primary);
  }
  
  .setting-title {
    font-size: 18px;
    font-weight: 700;
  }
  
  .setting-content {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-dim);
    white-space: pre-line;
    max-height: 150px;
    overflow: hidden;
    position: relative;
  }
  
  .setting-content::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(transparent, var(--surface));
  }
  
  .setting-card.expanded .setting-content {
    max-height: none;
  }
  
  .setting-card.expanded .setting-content::after {
    display: none;
  }
  
  .setting-tags {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    flex-wrap: wrap;
  }
  
  .setting-tag {
    font-size: 10px;
    letter-spacing: 1px;
    padding: 4px 10px;
    background: rgba(0, 240, 255, 0.1);
    color: var(--primary);
    font-family: 'JetBrains Mono', monospace;
  }
  
  /* 모바일 대응 */
  @media (max-width: 768px) {
    .site-header {
      padding: 0 20px;
    }
    
    .content-area {
      padding: 90px 20px 20px;
    }
    
    .character-grid,
    .settings-grid {
      grid-template-columns: 1fr;
    }
    
    .modal-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .modal-quote {
      border-left: none;
      border-top: 2px solid var(--primary);
      padding-left: 0;
      padding-top: 16px;
    }
    
    .stats-section {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

// ============================================================
// 🎬 컴포넌트 정의
// ============================================================

// 인트로 화면 컴포넌트
function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('drawing'); // drawing -> flipping -> quest -> rejected
  const [showQuest, setShowQuest] = useState(false);
  const [showRejectWarning, setShowRejectWarning] = useState(false);
  
  useEffect(() => {
    // 삼각형 그리기 완료 후 뒤집기
    const flipTimer = setTimeout(() => {
      setPhase('flipping');
    }, 2500);
    
    // 뒤집기 완료 후 퀘스트 표시
    const questTimer = setTimeout(() => {
      setPhase('quest');
      setShowQuest(true);
    }, 4000);
    
    return () => {
      clearTimeout(flipTimer);
      clearTimeout(questTimer);
    };
  }, []);
  
  const handleReject = () => {
    setShowRejectWarning(true);
    setTimeout(() => setShowRejectWarning(false), 2000);
  };
  
  return (
    <div className="intro-container">
      <svg className="triangle-svg" viewBox="0 0 200 200">
        <g className={`triangle-container ${phase === 'flipping' || phase === 'quest' ? 'flipped' : ''}`}>
          <path
            className={`triangle-path ${phase === 'drawing' ? 'drawing' : ''}`}
            d="M100 20 L180 170 L20 170 Z"
          />
        </g>
      </svg>
      
      <div className={`quest-panel ${showQuest ? 'visible' : ''}`}>
        <div className="quest-header">
          <div className="quest-icon">!</div>
          <div className="quest-title">{CONFIG.questMessage.title}</div>
        </div>
        <div className="quest-body">
          <div className="quest-subtitle">{CONFIG.questMessage.subtitle}</div>
          <div className="quest-description">{CONFIG.questMessage.description}</div>
          <div className="quest-buttons">
            <button className="quest-btn accept" onClick={onComplete}>
              {CONFIG.questMessage.acceptText}
            </button>
            <button className="quest-btn reject" onClick={handleReject}>
              {CONFIG.questMessage.rejectText}
            </button>
          </div>
          {showRejectWarning && (
            <div className="reject-warning">{CONFIG.questMessage.rejectWarning}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// 캐릭터 카드 컴포넌트
function CharacterCard({ character, onClick }) {
  return (
    <div className="character-card" onClick={onClick}>
      <img 
        src={character.image} 
        alt={character.name} 
        className="character-image"
      />
      <div className="character-info">
        <div className="character-codename">{character.codename}</div>
        <div className="character-name">{character.name}</div>
        <div className="character-concept">{character.concept}</div>
      </div>
    </div>
  );
}

// 캐릭터 상세 모달 컴포넌트
function CharacterModal({ character, onClose }) {
  if (!character) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <img src={character.image} alt={character.name} className="modal-image" />
          <div className="modal-title-area">
            <div className="modal-codename">{character.codename}</div>
            <div className="modal-name">{character.name}</div>
            <div className="modal-concept">{character.concept}</div>
            <div className="modal-quote">{character.quote}</div>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="modal-description">{character.description}</div>
          
          <div className="abilities-section">
            <div className="abilities-title">ABILITIES</div>
            {character.abilities.map((ability, idx) => (
              <div key={idx} className={`ability-item ${ability.warning ? 'warning' : ''}`}>
                <div className="ability-stage">{ability.stage}</div>
                <div className="ability-content">
                  <div className="ability-name">{ability.name}</div>
                  <div className="ability-desc">{ability.desc}</div>
                  {ability.warning && (
                    <div className="ability-warning">⚠ {ability.warning}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="stats-section">
            {Object.entries(character.stats).map(([key, value]) => (
              <div key={key} className="stat-item">
                <div className="stat-label">{key.toUpperCase()}</div>
                <div className="stat-bar">
                  <div 
                    className={`stat-fill ${key === 'risk' ? 'danger' : ''}`}
                    style={{ width: `${value * 10}%` }}
                  />
                </div>
                <div className="stat-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 세계관 설정 카드 컴포넌트
function SettingCard({ setting }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={`setting-card ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="setting-header">
        <div className="setting-icon">{setting.icon}</div>
        <div className="setting-title">{setting.title}</div>
      </div>
      <div className="setting-content">{setting.content}</div>
      <div className="setting-tags">
        {setting.tags.map((tag, idx) => (
          <span key={idx} className="setting-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

// 메인 앱 컴포넌트
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
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
        
        <div className={`main-container ${mainVisible ? 'visible' : ''}`}>
          <header className="site-header">
            <div className="logo">{CONFIG.siteTitle}</div>
            <nav className="nav-tabs">
              <button 
                className={`nav-tab ${activeTab === 'characters' ? 'active' : ''}`}
                onClick={() => setActiveTab('characters')}
              >
                CHARACTERS
              </button>
              <button 
                className={`nav-tab ${activeTab === 'world' ? 'active' : ''}`}
                onClick={() => setActiveTab('world')}
              >
                WORLD
              </button>
            </nav>
          </header>
          
          <main className="content-area">
            {activeTab === 'characters' && (
              <>
                <div className="section-title">REGISTERED IMPRINTERS</div>
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
                <div className="section-title">CLASSIFIED DOCUMENTS</div>
                <div className="settings-grid">
                  {CONFIG.worldSettings.map(setting => (
                    <SettingCard key={setting.id} setting={setting} />
                  ))}
                </div>
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
