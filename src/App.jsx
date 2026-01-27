import React, { useState, useEffect } from 'react';

// ============================================================
// 🔧 설정 영역
// ============================================================

const CONFIG = {
  siteTitle: "III",
  siteSubtitle: "PRISONER'S GAME",
  
  adminPassword: "TRIOS",
  
  imageBasePath: "/img/",
  
  // 참가자 데이터
  prisoners: [
    {
      id: "P1",
      number: "01",
      name: "라온",
      alias: "selector",
      crime: "연쇄 살인 (7건)",
      sentence: "사형",
      ability: "「지목」 - 손가락으로 가리킨 대상에게 효과를 부여",
      selfIntro: "복잡하게 생각할 것 없어.",
      adminComment: "피해자는 전부 그녀와 같은 학교였어.",
    },
    {
      id: "P2",
      number: "02",
      name: "유라",
      alias: "director",
      crime: "사기 및 세뇌 (피해자 42명)",
      sentence: "무기징역",
      ability: "「무대」 - 지정 범위 내에서 규칙을 강제",
      selfIntro: "모든 건 각본대로. 당신도 내 무대의 배우가 될 거예요.",
      adminComment: "피해자들은 자발적으로 모든 것을 바쳤어",
    },
    {
      id: "P3",
      number: "03",
      name: "아라",
      alias: "mirror",
      crime: "신원 사칭 및 사기 (23건)",
      sentence: "징역 45년",
      ability: "「모방」 - 상대의 능력을 복제",
      selfIntro: "난 누구든 될 수 있어.",
      adminComment: "지금 그녀의 얼굴조차 누군가의 얼굴일지도?",
    },
    {
      id: "P4",
      number: "04",
      name: "오스워드",
      alias: "gambler",
      crime: "불법 도박장 운영, 살인 교사",
      sentence: "무기징역",
      ability: "「확률」 - 운과 확률을 조작",
      selfIntro: "인생은 도박이야. 난 그냥 좀 더 잘할 뿐이지.",
      adminComment: "그가 진 기록은 단 한 번이야.",
    },
    {
      id: "P5",
      number: "05",
      name: "나린",
      alias: "puppeteer",
      crime: "인신매매, 불법 감금",
      sentence: "사형",
      ability: "「조종」 - 보이지 않는 실로 대상을 지배",
      selfIntro: "사람은 원래 조종당하고 싶어해요. 전 그걸 조금 도와준 것 뿐인걸요.",
      adminComment: "피해자들은 구출 후에도 그녀를 찾아 돌아왔어. 능력이 풀였음에도 불구하고.",
    },
    {
      id: "P6",
      number: "06",
      name: "가람",
      alias: "amnesiac",
      crime: "신원 불명 - 관련 기록 전무",
      sentence: "무기한 구금",
      ability: "「소거」 - 대상의 기억을 삭제",
      selfIntro: "...으아아! 실수로 지워버렸어요..",
      adminComment: "그녀의 동생은 그녀가 소중히 여기는 유일한 사람이야.",
    },
    {
      id: "P7",
      number: "07",
      name: "글로리아",
      alias: "contractor",
      crime: "계약 사기, 배임 (피해액 2조원)",
      sentence: "징역 120년",
      ability: "「구속」 - 상대와 강제 계약을 체결",
      selfIntro: "계약은 지켜져야 해. 그게 세상의 이치니까.",
      adminComment: "아이러니하게도 그녀의 죄목은 계약 위반이라는 거야.",
    },
    {
      id: "P8",
      number: "08",
      name: "태현",
      alias: "clockmaker",
      crime: "테러 (사상자 89명)",
      sentence: "사형",
      ability: "「시간」 - 자신 주변의 시간을 조작",
      selfIntro: "시간은 모두에게 공평하지 않아. 내가 증명해줄게.",
      adminComment: "폭발은 그가 원하는 시간에 정확히 일어났어.",
    },
    {
      id: "P9",
      number: "09",
      name: "서아",
      alias: "resonance",
      crime: "연쇄 살인 (13건) - 흉기 미발견",
      sentence: "사형",
      ability: "「파동」 - 소리와 진동을 무기화",
      selfIntro: "네 심장 소리가 들려. 점점 빨라지고 있어...",
      adminComment: "피해자들의 사인은 전원 내부 장기 파열",
    },
  ],

  // 버뮤다 구역 (4개)
  bermudaZones: [
    {
      id: "zone-center",
      name: "SECTOR 0",
      subtitle: "중심 구역",
      description: "버뮤다의 심장부. 세 꼭짓점이 모두 이곳으로 통한다.",
      features: ["평지", "엄폐 없음", "사물 없음"],
      color: "#aa5a6a",
      adminComment: "이곳에서 진짜 게임이 시작돼.",
    },
    {
      id: "zone-alpha",
      name: "SECTOR α",
      subtitle: "잔해 구역",
      description: "북쪽 꼭짓점. 붕괴된 건물 잔해가 쌓여있다. 고지대 점령이 유리하나 지반이 불안정하다.",
      features: ["고지대", "붕괴 위험", "주변 사물 많음"],
      color: "#4a90a4",
      adminComment: "이곳은 단순히 붕괴된 건물이 아니야.",
    },
    {
      id: "zone-beta",
      name: "SECTOR β",
      subtitle: "안개 구역",
      description: "남서쪽 꼭짓점. 짙은 안개로 시야가 극도로 제한된다. 소리에 의존해야 한다.",
      features: ["시야 제한", "원거리 불리", "기습 유리"],
      color: "#6a6a8a",
      adminComment: "안개 속에서 들리는 건 누구의 비명일까?",
    },
    {
      id: "zone-gamma",
      name: "SECTOR γ",
      subtitle: "함정 구역",
      description: "남동쪽 꼭짓점. 이전 참가자들이 남긴 함정이 곳곳에 설치되어 있다.",
      features: ["함정 다수", "신중함 필요", "상성 극복 가능"],
      color: "#9a7a5a",
      adminComment: "함정을 설치한 자들은 어디로 갔을까?",
    },
  ],

  // 용어/규칙
  glossary: [
    {
      term: "버뮤다",
      definition: "게임이 진행되는 삼각형 구역. 일단 입장하면 게임 종료까지 탈출 불가능.",
    },
    {
      term: "참가자",
      definition: "이능력을 가진 수감자 10명. 각자의 죄에 대한 속죄의 기회를 부여받는다.",
    },
    {
      term: "코인",
      definition: "참가자의 목숨. 시작 시 3개, 최대 5개. 사망 시 1개 소모 후 부활. 0개 시 영구 탈락.",
    },
    {
      term: "딜레마",
      definition: "코인 4개 미만인 참가자들에게 주기적으로 발동. 무작위 상대와 협력/배신을 선택.",
    },
    {
      term: "역설",
      definition: "코인이 많을수록 능력이 약해지고, 적을수록 강해진다. 생존과 힘은 양립하지 않는다.",
    },
  ],

  rules: {
    coinSystem: {
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
      condition: "코인 4개 미만 참가자 대상",
      outcomes: [
        { a: "협력", b: "협력", resultA: "+1", resultB: "+1" },
        { a: "배신", b: "배신", resultA: "0", resultB: "0" },
        { a: "배신", b: "협력", resultA: "+2", resultB: "-1" },
        { a: "협력", b: "배신", resultA: "-1", resultB: "+2" },
      ]
    }
  },

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
// 스타일
// ============================================================

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Noto+Sans+KR:wght@300;400;700&family=JetBrains+Mono:wght@400;700&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
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
  
  html { font-size: 16px; }
  
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  .scanlines::before {
    content: '';
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.008) 2px, rgba(0,240,255,0.008) 4px);
    pointer-events: none;
    z-index: 9999;
  }

  /* 인트로 */
  .intro-container {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
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
    top: 20px; right: 20px;
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

  .intro-scene {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    opacity: 0;
    animation: fadeIn 0.8s ease forwards;
    max-width: 100%;
    text-align: center;
  }

  @keyframes fadeIn { to { opacity: 1; } }

  .intro-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(10px, 3vw, 14px);
    letter-spacing: 4px;
    color: var(--text-dim);
  }

  .intro-visual {
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
    box-shadow: 0 0 30px rgba(0,240,255,0.3);
  }

  .prisoner-box.betray {
    border-color: var(--secondary);
    box-shadow: 0 0 30px rgba(255,51,102,0.3);
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
    background: rgba(0,240,255,0.2);
    color: var(--primary);
  }

  .prisoner-choice.betray {
    background: rgba(255,51,102,0.2);
    color: var(--secondary);
  }

  .vs-text {
    font-family: 'Orbitron', monospace;
    font-size: clamp(16px, 5vw, 24px);
    color: var(--text-dim);
  }

  .intro-result {
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

  .intro-narration {
    max-width: 500px;
    width: 100%;
    text-align: center;
    font-size: clamp(13px, 3.5vw, 15px);
    line-height: 1.9;
    color: var(--text);
    padding: 0 16px;
  }

  .narration-highlight { color: var(--primary); font-weight: 700; }
  .narration-warning { color: var(--secondary); font-weight: 700; }

  .intro-progress {
    position: absolute;
    bottom: 30px;
    display: flex;
    gap: 6px;
  }

  .progress-dot {
    width: 8px; height: 8px;
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

  /* 참가 신청서 */
  .registration-container {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .registration-form {
    background: var(--surface);
    border: 1px solid var(--primary);
    max-width: 500px;
    width: 100%;
    padding: 0;
    box-shadow: 0 0 60px rgba(0,240,255,0.2);
  }

  .registration-header {
    padding: 24px;
    border-bottom: 1px solid rgba(0,240,255,0.2);
    position: relative;
  }

  .registration-header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }

  .registration-title {
    font-family: 'Orbitron', monospace;
    font-size: 18px;
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 8px;
  }

  .registration-subtitle {
    font-size: 13px;
    color: var(--text-dim);
  }

  .registration-body {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-dim);
    margin-bottom: 8px;
  }

  .form-input {
    width: 100%;
    padding: 12px 16px;
    background: var(--bg);
    border: 1px solid rgba(0,240,255,0.2);
    color: var(--text);
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
  }

  .form-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 10px rgba(0,240,255,0.2);
  }

  .form-input::placeholder {
    color: var(--text-dim);
  }

  .registration-warning {
    font-size: 11px;
    color: var(--secondary);
    margin-top: 16px;
    padding: 12px;
    background: rgba(255,51,102,0.1);
    border: 1px solid rgba(255,51,102,0.2);
    line-height: 1.6;
  }

  .registration-submit {
    width: 100%;
    padding: 16px;
    background: var(--primary);
    border: none;
    color: var(--bg);
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 16px;
  }

  .registration-submit:hover {
    box-shadow: 0 0 30px var(--primary);
  }

  .registration-submit:disabled {
    background: var(--text-dim);
    cursor: not-allowed;
  }

  /* 메인 */
  .main-container {
    min-height: 100vh;
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .main-container.visible { opacity: 1; }

  .site-header {
    position: fixed;
    top: 0; left: 0; right: 0;
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

  .nav-tab:hover { color: var(--text); }

  .nav-tab.active {
    color: var(--primary);
    border-color: var(--primary);
    background: rgba(0,240,255,0.05);
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

  /* 관리자 모드 토글 */
  .admin-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 200;
  }

  .admin-btn {
    width: 40px; height: 40px;
    background: var(--surface);
    border: 1px solid var(--text-dim);
    color: var(--text-dim);
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .admin-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .admin-btn.active {
    border-color: var(--secondary);
    color: var(--secondary);
    background: rgba(255,51,102,0.1);
  }

  .admin-modal {
    position: fixed;
    bottom: 70px;
    right: 20px;
    background: var(--surface);
    border: 1px solid var(--text-dim);
    padding: 16px;
    width: 250px;
    z-index: 200;
  }

  .admin-modal-title {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-dim);
    margin-bottom: 12px;
  }

  .admin-input {
    width: 100%;
    padding: 10px;
    background: var(--bg);
    border: 1px solid rgba(0,240,255,0.2);
    color: var(--text);
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    outline: none;
  }

  .admin-input:focus {
    border-color: var(--primary);
  }

  .admin-error {
    font-size: 11px;
    color: var(--secondary);
    margin-top: 8px;
  }

  .admin-success {
    font-size: 11px;
    color: var(--primary);
    margin-top: 8px;
  }

  /* 참가자 그리드 */
  .prisoner-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .prisoner-card {
    background: var(--surface);
    border: 1px solid rgba(0,240,255,0.1);
    transition: all 0.4s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .prisoner-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .prisoner-card:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,240,255,0.15);
  }

  .prisoner-card:hover::before { opacity: 1; }

  .prisoner-card.user-card {
    border-color: var(--warning);
  }

  .prisoner-card.user-card::before {
    background: linear-gradient(90deg, transparent, var(--warning), transparent);
    opacity: 1;
  }

  .prisoner-card-header {
    display: flex;
    gap: 16px;
    padding: 16px;
  }

  .prisoner-card-image {
    width: 80px;
    height: 100px;
    background: var(--surface-light);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  .prisoner-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .prisoner-card-placeholder {
    font-family: 'Orbitron', monospace;
    font-size: 32px;
    color: var(--text-dim);
    opacity: 0.3;
  }

  .prisoner-card-info {
    flex: 1;
    min-width: 0;
  }

  .prisoner-card-number {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--primary);
    margin-bottom: 4px;
  }

  .prisoner-card-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .prisoner-card-alias {
    font-size: 12px;
    color: var(--text-dim);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 8px;
  }

  .prisoner-card-crime {
    font-size: 11px;
    color: var(--secondary);
    padding: 4px 8px;
    background: rgba(255,51,102,0.1);
    display: inline-block;
  }

  .prisoner-card-intro {
    padding: 0 16px 16px;
    font-size: 13px;
    color: var(--text-dim);
    font-style: italic;
    line-height: 1.6;
  }

  /* 글리치 코멘트 (관리자 모드) */
  .glitch-comment {
    padding: 12px 16px;
    background: rgba(255,51,102,0.05);
    border-top: 1px solid rgba(255,51,102,0.2);
    font-size: 12px;
    color: var(--secondary);
    font-family: 'JetBrains Mono', monospace;
    animation: glitchText 0.1s infinite;
  }

  @keyframes glitchText {
    0% { text-shadow: 2px 0 var(--secondary), -2px 0 var(--primary); }
    25% { text-shadow: -2px 0 var(--secondary), 2px 0 var(--primary); }
    50% { text-shadow: 2px 0 var(--primary), -2px 0 var(--secondary); }
    75% { text-shadow: -2px 0 var(--primary), 2px 0 var(--secondary); }
    100% { text-shadow: 2px 0 var(--secondary), -2px 0 var(--primary); }
  }

  /* 참가자 상세 모달 */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    overflow-y: auto;
    backdrop-filter: blur(10px);
  }

  .prisoner-modal {
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    background: linear-gradient(135deg, #0d0d15 0%, #151520 50%, #0d0d15 100%);
    border: 1px solid var(--primary);
    position: relative;
  }

  .prisoner-modal::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), var(--secondary), var(--primary), transparent);
  }

  .modal-close {
    position: absolute;
    top: 16px; right: 16px;
    width: 40px; height: 40px;
    background: rgba(0,0,0,0.5);
    border: 1px solid var(--text-dim);
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.3s ease;
  }

  .modal-close:hover {
    border-color: var(--secondary);
    color: var(--secondary);
  }

  .modal-header {
    display: flex;
    gap: 20px;
    padding: 24px;
    border-bottom: 1px solid rgba(0,240,255,0.1);
  }

  .modal-image {
    width: 140px;
    height: 180px;
    background: var(--surface-light);
    border: 1px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .modal-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .modal-number {
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    letter-spacing: 4px;
    color: var(--primary);
    margin-bottom: 8px;
  }

  .modal-name {
    font-size: 28px;
    font-weight: 900;
    margin-bottom: 4px;
  }

  .modal-alias {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .modal-crime-box {
    padding: 12px 16px;
    background: rgba(255,51,102,0.1);
    border: 1px solid rgba(255,51,102,0.3);
  }

  .modal-crime-label {
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--text-dim);
    margin-bottom: 4px;
  }

  .modal-crime-value {
    font-size: 14px;
    color: var(--secondary);
    font-weight: 700;
  }

  .modal-sentence {
    font-size: 11px;
    color: var(--text-dim);
    margin-top: 4px;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-section {
    margin-bottom: 20px;
  }

  .modal-section-title {
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-dim);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0,240,255,0.1);
  }

  .modal-ability {
    padding: 16px;
    background: rgba(0,240,255,0.03);
    border-left: 3px solid var(--primary);
    font-size: 14px;
    line-height: 1.6;
  }

  .modal-intro {
    font-size: 15px;
    line-height: 1.8;
    font-style: italic;
    color: var(--text);
    padding: 16px;
    background: rgba(255,255,255,0.02);
    border-left: 3px solid var(--text-dim);
  }

  .modal-glitch {
    padding: 16px;
    background: rgba(255,51,102,0.1);
    border: 1px solid rgba(255,51,102,0.3);
    font-size: 13px;
    color: var(--secondary);
    font-family: 'JetBrains Mono', monospace;
    animation: glitchText 0.1s infinite;
    margin-top: 20px;
  }

  /* 세계관 탭 */
  .world-section { margin-bottom: 40px; }

  .world-section-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(10px, 2.5vw, 11px);
    letter-spacing: 3px;
    color: var(--primary);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0,240,255,0.2);
  }

  .glossary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  .glossary-item {
    background: var(--surface);
    padding: 16px;
    border-left: 3px solid var(--primary);
  }

  .glossary-term {
    font-family: 'Orbitron', monospace;
    font-size: 14px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 6px;
  }

  .glossary-def {
    font-size: 13px;
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
    border: 1px solid rgba(0,240,255,0.1);
  }

  .dilemma-table th {
    background: var(--surface);
    font-family: 'Orbitron', monospace;
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--text-dim);
  }

  .dilemma-table td {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
  }

  .dilemma-condition {
    font-size: 12px;
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

  .coin-row:hover { background: var(--surface-light); }

  .coin-number {
    font-family: 'Orbitron', monospace;
    font-size: 24px;
    font-weight: 900;
    min-width: 32px;
  }

  .coin-state {
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    letter-spacing: 1px;
    min-width: 50px;
  }

  .coin-power {
    font-size: 13px;
    color: var(--text-dim);
  }

  /* 지도 */
  .map-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .map-visual {
    width: 100%;
    max-width: 450px;
    aspect-ratio: 1;
  }

  .map-visual svg {
    width: 100%;
    height: 100%;
  }

  .map-outline {
    fill: none;
    stroke: var(--primary);
    stroke-width: 2;
    filter: drop-shadow(0 0 10px var(--primary));
  }

  .zone-cell {
    fill: rgba(0,240,255,0.05);
    stroke: rgba(0,240,255,0.2);
    stroke-width: 1;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .zone-cell:hover {
    fill: rgba(0,240,255,0.15);
    stroke: var(--primary);
  }

  .zone-cell.active {
    fill: rgba(0,240,255,0.2);
    stroke: var(--primary);
    stroke-width: 2;
  }

  .zone-label {
    font-family: 'Orbitron', monospace;
    font-size: 16px;
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

  /* 구역 모달 */
  .zone-modal {
    background: linear-gradient(135deg, #0d0d15, #151520);
    border: 1px solid var(--primary);
    max-width: 500px;
    width: 100%;
    position: relative;
    box-shadow: 0 0 60px rgba(0,240,255,0.2);
  }

  .zone-modal-header {
    padding: 24px;
    border-bottom: 1px solid rgba(0,240,255,0.2);
    position: relative;
  }

  .zone-modal-header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }

  .zone-modal-symbol {
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
    background: rgba(0,240,255,0.1);
    color: var(--primary);
    font-family: 'JetBrains Mono', monospace;
    border: 1px solid rgba(0,240,255,0.2);
  }

  .zone-modal-glitch {
    padding: 16px;
    background: rgba(255,51,102,0.1);
    border: 1px solid rgba(255,51,102,0.3);
    font-size: 13px;
    color: var(--secondary);
    font-family: 'JetBrains Mono', monospace;
    animation: glitchText 0.1s infinite;
  }

  .zone-modal-close {
    position: absolute;
    top: 16px; right: 16px;
    width: 36px; height: 36px;
    background: rgba(0,0,0,0.8);
    border: 1px solid var(--text-dim);
    color: var(--text);
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: all 0.3s ease;
  }

  .zone-modal-close:hover {
    border-color: var(--secondary);
    color: var(--secondary);
  }

  /* 반응형 */
  @media (max-width: 640px) {
    .modal-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .prisoner-grid {
      grid-template-columns: 1fr;
    }
    
    .intro-visual {
      flex-direction: column;
      gap: 20px;
    }
    
    .vs-text {
      margin: 10px 0;
    }
  }
`;

// ============================================================
// 컴포넌트
// ============================================================

const logEncryptedPassword = () => {
  const encoded = btoa(CONFIG.adminPassword);
  console.log('%c[SYSTEM] ENCRYPTED_KEY: ' + encoded, 'color: #ff3366; font-family: monospace;');
  console.log('%cUse atob() to decode.', 'color: #666; font-size: 10px;');
};

function IntroScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    logEncryptedPassword();
  }, []);

  const handleClick = (e) => {
    if (e.target.classList.contains('skip-btn')) return;
    if (step < 5) {
      setStep(s => s + 1);
    } else {
      onComplete();
    }
  };

  const scenes = [
    {
      title: "PRISONER'S GAME",
      visual: null,
      narration: <span>당신은 <span className="narration-warning">죄인</span>입니다.<br/>이능력을 가진 <span className="narration-highlight">10명의 수감자</span>가 이 게임에 참가합니다.</span>,
    },
    {
      title: "THE DILEMMA",
      visual: { choiceA: 'cooperate', choiceB: 'cooperate', resultA: '+1', resultB: '+1' },
      narration: <span>둘 다 <span className="narration-highlight">협력</span>하면, 서로 코인을 1개씩 얻습니다.</span>,
    },
    {
      title: "THE DILEMMA",
      visual: { choiceA: 'betray', choiceB: 'cooperate', resultA: '+2', resultB: '-1' },
      narration: <span>한 명만 <span className="narration-warning">배신</span>하면,<br/>배신자는 2개를 얻고, 협력자는 1개를 잃습니다.</span>,
    },
    {
      title: "THE PARADOX",
      visual: null,
      narration: <span><span className="narration-highlight">코인이 많을수록 약해지고,</span><br/><span className="narration-warning">코인이 적을수록 강해집니다.</span><br/><br/>생존과 힘은 양립하지 않습니다.</span>,
    },
    {
      title: "THE RULE",
      visual: null,
      narration: <span>최후의 <span className="narration-highlight">1인</span>만이 이 게임에서 해방됩니다.<br/><br/><span className="narration-warning">참가를 거부할 권리는 없습니다.</span></span>,
    },
    {
      title: "AGREEMENT",
      visual: null,
      narration: <span>다음 페이지에서 <span className="narration-highlight">참가 신청서</span>를 작성해주세요.<br/><br/><span className="narration-warning">DON'T LOSE YOURSELF.</span></span>,
    },
  ];

  const currentScene = scenes[step];

  return (
    <div className="intro-container" onClick={handleClick}>
      <button className="skip-btn" onClick={onComplete}>SKIP</button>
      
      <div className="intro-scene" key={step}>
        <div className="intro-title">{currentScene.title}</div>
        
        {currentScene.visual && (
          <>
            <div className="intro-visual">
              <div className={`prisoner-box ${currentScene.visual.choiceA === 'cooperate' ? 'highlight' : 'betray'}`}>
                <div className="prisoner-icon">&#9670;</div>
                <div className="prisoner-label">PRISONER A</div>
                <div className={`prisoner-choice ${currentScene.visual.choiceA}`}>
                  {currentScene.visual.choiceA === 'cooperate' ? '협력' : '배신'}
                </div>
              </div>
              <div className="vs-text">VS</div>
              <div className={`prisoner-box ${currentScene.visual.choiceB === 'cooperate' ? 'highlight' : 'betray'}`}>
                <div className="prisoner-icon">&#9670;</div>
                <div className="prisoner-label">PRISONER B</div>
                <div className={`prisoner-choice ${currentScene.visual.choiceB}`}>
                  {currentScene.visual.choiceB === 'cooperate' ? '협력' : '배신'}
                </div>
              </div>
            </div>
            <div className="intro-result">
              <div className="result-box visible">
                <div className={`result-coins ${currentScene.visual.resultA.startsWith('+') ? 'positive' : currentScene.visual.resultA.startsWith('-') ? 'negative' : 'neutral'}`}>
                  {currentScene.visual.resultA}
                </div>
              </div>
              <div className="result-box visible">
                <div className={`result-coins ${currentScene.visual.resultB.startsWith('+') ? 'positive' : currentScene.visual.resultB.startsWith('-') ? 'negative' : 'neutral'}`}>
                  {currentScene.visual.resultB}
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="intro-narration">{currentScene.narration}</div>
      </div>
      
      <div className="tap-hint">TAP TO CONTINUE</div>
      <div className="intro-progress">
        {scenes.map((_, i) => <div key={i} className={`progress-dot ${i <= step ? 'active' : ''}`} />)}
      </div>
    </div>
  );
}

function RegistrationForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [ability, setAbility] = useState('');
  const [intro, setIntro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && ability && intro) {
      onSubmit({ name, ability, intro });
    }
  };

  const isValid = name.trim() && ability.trim() && intro.trim();

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-header">
          <div className="registration-title">참가 신청서</div>
          <div className="registration-subtitle">PRISONER REGISTRATION FORM</div>
        </div>
        <div className="registration-body">
          <div className="form-group">
            <label className="form-label">이름 (닉네임)</label>
            <input 
              className="form-input" 
              type="text" 
              placeholder="본명 또는 닉네임을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
          </div>
          <div className="form-group">
            <label className="form-label">능력</label>
            <input 
              className="form-input" 
              type="text" 
              placeholder="당신의 이능력을 간단히 설명하세요"
              value={ability}
              onChange={(e) => setAbility(e.target.value)}
              maxLength={50}
            />
          </div>
          <div className="form-group">
            <label className="form-label">자기소개 (한 줄)</label>
            <input 
              className="form-input" 
              type="text" 
              placeholder="다른 참가자들에게 할 말"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="registration-warning">
            ※ 경고: 본 신청서 제출 시 게임 참가에 동의한 것으로 간주됩니다.<br/>
            참가 철회는 불가능하며, 모든 결과는 본인에게 귀속됩니다.
          </div>
          <button type="submit" className="registration-submit" disabled={!isValid}>
            참가 동의 및 제출
          </button>
        </div>
      </form>
    </div>
  );
}

function PrisonerCard({ prisoner, isUser, onClick, isAdmin }) {
  const imageSrc = prisoner.id ? `${CONFIG.imageBasePath}${prisoner.id}.png` : null;
  
  return (
    <div className={`prisoner-card ${isUser ? 'user-card' : ''}`} onClick={onClick}>
      <div className="prisoner-card-header">
        <div className="prisoner-card-image">
          {imageSrc && !isUser ? (
            <img src={imageSrc} alt={prisoner.name} />
          ) : (
            <div className="prisoner-card-placeholder">{prisoner.number}</div>
          )}
        </div>
        <div className="prisoner-card-info">
          <div className="prisoner-card-number">PRISONER #{prisoner.number}</div>
          <div className="prisoner-card-name">{prisoner.name}</div>
          <div className="prisoner-card-alias">{prisoner.alias || 'unknown'}</div>
          <div className="prisoner-card-crime">{prisoner.crime}</div>
        </div>
      </div>
      <div className="prisoner-card-intro">"{prisoner.selfIntro}"</div>
      {isAdmin && prisoner.adminComment && (
        <div className="glitch-comment">* {prisoner.adminComment}</div>
      )}
    </div>
  );
}

function PrisonerModal({ prisoner, isUser, onClose, isAdmin }) {
  if (!prisoner) return null;
  
  const imageSrc = prisoner.id ? `${CONFIG.imageBasePath}${prisoner.id}.png` : null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="prisoner-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-image">
            {imageSrc && !isUser ? (
              <img src={imageSrc} alt={prisoner.name} />
            ) : (
              <div style={{ fontSize: '48px', color: 'var(--text-dim)', opacity: 0.3 }}>{prisoner.number}</div>
            )}
          </div>
          <div className="modal-info">
            <div className="modal-number">PRISONER #{prisoner.number}</div>
            <div className="modal-name">{prisoner.name}</div>
            <div className="modal-alias">{prisoner.alias || 'unknown'}</div>
            <div className="modal-crime-box">
              <div className="modal-crime-label">CRIME</div>
              <div className="modal-crime-value">{prisoner.crime}</div>
              {prisoner.sentence && <div className="modal-sentence">형량: {prisoner.sentence}</div>}
            </div>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-section-title">ABILITY</div>
            <div className="modal-ability">{prisoner.ability}</div>
          </div>
          
          <div className="modal-section">
            <div className="modal-section-title">SELF INTRODUCTION</div>
            <div className="modal-intro">"{prisoner.selfIntro}"</div>
          </div>
          
          {isAdmin && prisoner.adminComment && (
            <div className="modal-glitch">* CLASSIFIED: {prisoner.adminComment}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function ZoneModal({ zone, onClose, isAdmin }) {
  if (!zone) return null;
  
  const zoneLabels = {
    'zone-center': '0',
    'zone-alpha': 'α',
    'zone-beta': 'β',
    'zone-gamma': 'γ',
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="zone-modal" onClick={e => e.stopPropagation()}>
        <button className="zone-modal-close" onClick={onClose}>×</button>
        
        <div className="zone-modal-header">
          <div className="zone-modal-symbol">{zoneLabels[zone.id]}</div>
          <div className="zone-modal-name">{zone.name}</div>
          <div className="zone-modal-subtitle">{zone.subtitle}</div>
        </div>
        
        <div className="zone-modal-body">
          <div className="zone-modal-desc">{zone.description}</div>
          <div className="zone-modal-features">
            {zone.features.map((f, i) => <span key={i} className="zone-feature">{f}</span>)}
          </div>
          {isAdmin && zone.adminComment && (
            <div className="zone-modal-glitch">* {zone.adminComment}</div>
          )}
        </div>
      </div>
    </div>
  );
}

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
        <div className="dilemma-condition">* {CONFIG.rules.dilemma.condition}</div>
        <div className="dilemma-table-wrapper">
          <table className="dilemma-table">
            <thead>
              <tr><th>A</th><th>B</th><th>A 결과</th><th>B 결과</th></tr>
            </thead>
            <tbody>
              {CONFIG.rules.dilemma.outcomes.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ color: row.a === '협력' ? '#00f0ff' : '#ff3366' }}>{row.a}</td>
                  <td style={{ color: row.b === '협력' ? '#00f0ff' : '#ff3366' }}>{row.b}</td>
                  <td style={{ color: row.resultA.startsWith('+') ? '#00f0ff' : row.resultA.startsWith('-') ? '#ff3366' : '#666' }}>{row.resultA}</td>
                  <td style={{ color: row.resultB.startsWith('+') ? '#00f0ff' : row.resultB.startsWith('-') ? '#ff3366' : '#666' }}>{row.resultB}</td>
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
            <div key={idx} className="coin-row" style={{ borderLeftColor: item.color }}>
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

function MapTab({ isAdmin }) {
  const [selectedZone, setSelectedZone] = useState(null);
  
  const points = {
    top: { x: 200, y: 50 },
    bottomLeft: { x: 50, y: 350 },
    bottomRight: { x: 350, y: 350 },
  };
  
  const midpoints = {
    left: { x: (points.top.x + points.bottomLeft.x) / 2, y: (points.top.y + points.bottomLeft.y) / 2 },
    right: { x: (points.top.x + points.bottomRight.x) / 2, y: (points.top.y + points.bottomRight.y) / 2 },
    bottom: { x: (points.bottomLeft.x + points.bottomRight.x) / 2, y: (points.bottomLeft.y + points.bottomRight.y) / 2 },
  };
  
  const center = {
    x: (points.top.x + points.bottomLeft.x + points.bottomRight.x) / 3,
    y: (points.top.y + points.bottomLeft.y + points.bottomRight.y) / 3,
  };
  
  const zonePaths = [
    { id: "zone-center", path: `M ${midpoints.left.x} ${midpoints.left.y} L ${midpoints.right.x} ${midpoints.right.y} L ${midpoints.bottom.x} ${midpoints.bottom.y} Z`, labelPos: { x: center.x, y: center.y + 10 }, label: "0", sublabel: "중심" },
    { id: "zone-alpha", path: `M ${points.top.x} ${points.top.y} L ${midpoints.left.x} ${midpoints.left.y} L ${midpoints.right.x} ${midpoints.right.y} Z`, labelPos: { x: points.top.x, y: points.top.y + 70 }, label: "α", sublabel: "잔해" },
    { id: "zone-beta", path: `M ${points.bottomLeft.x} ${points.bottomLeft.y} L ${midpoints.left.x} ${midpoints.left.y} L ${midpoints.bottom.x} ${midpoints.bottom.y} Z`, labelPos: { x: points.bottomLeft.x + 55, y: points.bottomLeft.y - 50 }, label: "β", sublabel: "안개" },
    { id: "zone-gamma", path: `M ${points.bottomRight.x} ${points.bottomRight.y} L ${midpoints.right.x} ${midpoints.right.y} L ${midpoints.bottom.x} ${midpoints.bottom.y} Z`, labelPos: { x: points.bottomRight.x - 55, y: points.bottomRight.y - 50 }, label: "γ", sublabel: "함정" },
  ];

  return (
    <div className="map-container">
      <div className="map-visual">
        <svg viewBox="0 0 400 400">
          <path className="map-outline" d={`M ${points.top.x} ${points.top.y} L ${points.bottomLeft.x} ${points.bottomLeft.y} L ${points.bottomRight.x} ${points.bottomRight.y} Z`} />
          
          {zonePaths.map((zoneData) => {
            const zone = CONFIG.bermudaZones.find(z => z.id === zoneData.id);
            if (!zone) return null;
            return (
              <g key={zone.id} onClick={() => setSelectedZone(zone)} style={{ cursor: 'pointer' }}>
                <path className={`zone-cell ${selectedZone?.id === zone.id ? 'active' : ''}`} d={zoneData.path} style={{ fill: `${zone.color}44` }} />
                <text className="zone-label" x={zoneData.labelPos.x} y={zoneData.labelPos.y}>{zoneData.label}</text>
                <text className="zone-sublabel" x={zoneData.labelPos.x} y={zoneData.labelPos.y + 16}>{zoneData.sublabel}</text>
              </g>
            );
          })}
          
          <line x1={midpoints.left.x} y1={midpoints.left.y} x2={midpoints.right.x} y2={midpoints.right.y} stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
          <line x1={midpoints.left.x} y1={midpoints.left.y} x2={midpoints.bottom.x} y2={midpoints.bottom.y} stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
          <line x1={midpoints.right.x} y1={midpoints.right.y} x2={midpoints.bottom.x} y2={midpoints.bottom.y} stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
      
      {selectedZone && <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} isAdmin={isAdmin} />}
    </div>
  );
}

function AdminToggle({ isAdmin, onToggle }) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (password === CONFIG.adminPassword) {
      onToggle(true);
      setShowModal(false);
      setError('');
    } else {
      setError('ACCESS DENIED');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="admin-toggle">
      {showModal && !isAdmin && (
        <div className="admin-modal">
          <div className="admin-modal-title">ADMIN ACCESS</div>
          <input 
            className="admin-input"
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          {error && <div className="admin-error">{error}</div>}
        </div>
      )}
      {isAdmin && showModal && (
        <div className="admin-modal">
          <div className="admin-success">ADMIN MODE ACTIVE</div>
        </div>
      )}
      <button 
        className={`admin-btn ${isAdmin ? 'active' : ''}`}
        onClick={() => {
          if (isAdmin) {
            onToggle(false);
            setShowModal(false);
          } else {
            setShowModal(!showModal);
          }
        }}
      >
        &#9881;
      </button>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState('intro');
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('prisoners');
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);

  const handleRegistration = (data) => {
    setUserData(data);
    setPhase('main');
    setTimeout(() => setMainVisible(true), 100);
  };

  const allPrisoners = [
    ...CONFIG.prisoners,
    userData ? {
      id: null,
      number: "10",
      name: userData.name,
      alias: null,
      crime: "미확정",
      sentence: "미확정",
      ability: userData.ability,
      selfIntro: userData.intro,
      adminComment: "새로운 참가자. 아직 아무것도 증명되지 않았다.",
    } : null,
  ].filter(Boolean);

  return (
    <>
      <style>{styles}</style>
      <div className="scanlines">
        {phase === 'intro' && <IntroScreen onComplete={() => setPhase('registration')} />}
        {phase === 'registration' && <RegistrationForm onSubmit={handleRegistration} />}
        
        {phase === 'main' && (
          <div className={`main-container ${mainVisible ? 'visible' : ''}`}>
            <header className="site-header">
              <div className="logo">{CONFIG.siteTitle}</div>
              <nav className="nav-tabs">
                <button className={`nav-tab ${activeTab === 'prisoners' ? 'active' : ''}`} onClick={() => setActiveTab('prisoners')}>PRISONERS</button>
                <button className={`nav-tab ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>RULES</button>
                <button className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>BERMUDA</button>
              </nav>
            </header>
            
            <main className="content-area">
              {activeTab === 'prisoners' && (
                <>
                  <div className="section-title">PARTICIPANTS ({allPrisoners.length}/10)</div>
                  <div className="prisoner-grid">
                    {allPrisoners.map((p) => (
                      <PrisonerCard 
                        key={p.number}
                        prisoner={p}
                        isUser={p.number === "10"}
                        onClick={() => setSelectedPrisoner(p)}
                        isAdmin={isAdmin}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {activeTab === 'rules' && (
                <>
                  <div className="section-title">GAME RULES</div>
                  <WorldTab />
                </>
              )}
              
              {activeTab === 'map' && (
                <>
                  <div className="section-title">BERMUDA MAP</div>
                  <MapTab isAdmin={isAdmin} />
                </>
              )}
            </main>
            
            <AdminToggle isAdmin={isAdmin} onToggle={setIsAdmin} />
          </div>
        )}
        
        {selectedPrisoner && (
          <PrisonerModal 
            prisoner={selectedPrisoner}
            isUser={selectedPrisoner.number === "10"}
            onClose={() => setSelectedPrisoner(null)}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </>
  );
}
