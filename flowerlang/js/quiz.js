const quizData = [
    {
      flower: "薰衣草",
      image: "images/flowers/lavender.jpg",
      correct: "等待愛情",
      options: ["等待愛情", "熱情奔放", "母愛"]
    },
    {
      flower: "向日葵",
      image: "images/flowers/sunflower.jpg",
      correct: "陽光與希望",
      options: ["孤獨", "陽光與希望", "神秘"]
    },
    {
      flower: "玫瑰",
      image: "images/flowers/rose.jpg",
      correct: "愛與美",
      options: ["友誼", "愛與美", "青春"]
    },
    {
      flower: "百合",
      image: "images/flowers/lily.jpg",
      correct: "純潔與祝福",
      options: ["悲傷", "純潔與祝福", "熱情如火"]
    },
  ];
  
  
  let currentQuestion = 0;
  let score = 0;
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function showQuestion() {
    const question = quizData[currentQuestion];
    
    // 顯示問題區塊
    document.getElementById("questionArea").innerHTML = `
      <h2>第 ${currentQuestion + 1} 題：</h2>
      <img src="${question.image}" alt="${question.flower}" class="quiz-image">
      <p>這朵花是什麼花語？</p>
      
      <!-- 朗讀花名的按鈕 -->
      <button class="speakBtn" onclick="speak('${question.flower}')">🔊 朗讀花名</button>
      
      <!-- 查看花語介紹的按鈕 -->
      <button class="speakBtn" onclick="showFlowerDetail('${question.flower}')">📖 查看花語介紹</button>
      
      <p>目前分數：${score} / ${quizData.length}</p>
    `;
    
    // 顯示選項區塊
    const optionsHTML = shuffle([...question.options])
      .map(option => `
        <div class="option-with-audio">
          <button class="optionBtn">${option}</button>
          <button class="optionSpeakBtn" onclick="speak('${option}')">🔊</button>
        </div>
      `)
      .join("");

    document.getElementById("optionsArea").innerHTML = optionsHTML;
  
    document.querySelectorAll(".optionBtn").forEach(btn => {
      btn.addEventListener("click", () => checkAnswer(btn.textContent));
    });
  }
  
  
  function checkAnswer(selected) {
    const correct = quizData[currentQuestion].correct;
    const feedback = document.getElementById("feedback");
    if (selected === correct) {
      score++;
      feedback.textContent = "🎉 答對了！";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `❌ 答錯了，正確答案是「${correct}」`;
      feedback.style.color = "red";
    }
    document.getElementById("nextBtn").style.display = "inline-block";
  }
  
  function showFinalResult() {
    localStorage.setItem("flowerQuizScore", score);
    document.getElementById("questionArea").innerHTML = `
      <h2>🎊 測驗結束！</h2>
      <p>你答對了 <strong>${score}</strong> 題，共 ${quizData.length} 題。</p>
      <p>上次分數：${localStorage.getItem("flowerQuizScore")} 分</p>
      <button id="restartBtn">🔄 重新挑戰</button>
    `;
    document.getElementById("optionsArea").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
  
    // 新增重新挑戰事件綁定
    document.getElementById("restartBtn").addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      showQuestion();
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const savedScore = localStorage.getItem("flowerQuizScore");
    if (savedScore !== null) {
      alert(`歡迎回來！你上次的花語測驗分數是 ${savedScore} 分`);
    }
  
    showQuestion();
  
    document.getElementById("nextBtn").addEventListener("click", () => {
      
        currentQuestion++;
      if (currentQuestion < quizData.length) {
        showQuestion();
      } else {
        showFinalResult();
      }
    });
  });
  
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-TW";
    speechSynthesis.cancel(); // 取消前一段朗讀，避免堆疊
    speechSynthesis.speak(utterance);
  }
  const flowerDetails = {
    "薰衣草": {
      name: "薰衣草",
      image: "images/flowers/lavender.jpg",
      meaning: "等待愛情、純潔、寧靜",
      description: "薰衣草象徵著純潔與安寧，在歐洲常用來表達『等待愛情』。也是香氛植物中非常受歡迎的一種。"
    },
    "向日葵": {
      name: "向日葵",
      image: "images/flowers/sunflower.jpg",
      meaning: "陽光與希望",
      description: "向日葵永遠朝向太陽，象徵希望、勇敢和正能量。在畢業或祝福時常被選為贈花。"
    },
    "玫瑰": {
      name: "玫瑰",
      image: "images/flowers/rose.jpg",
      meaning: "愛與美",
      description: "玫瑰象徵愛情的代表，不同顏色有不同的情感意義：紅色代表熱情、白色代表純潔、黃色代表友情。"
    },
    "百合": {
      name: "百合",
      image: "images/flowers/lily.jpg",
      meaning: "純潔與祝福",
      description: "百合象徵著純潔、高雅與祝福，常在婚禮、畢業中出現，傳達良好的祝願。"
    }
  };
  
  function showFlowerDetail(flowerName) {
    const data = flowerDetails[flowerName];
    if (!data) return;
  
    document.getElementById("modalImage").src = data.image;
    document.getElementById("modalTitle").textContent = data.name;
    document.getElementById("modalMeaning").textContent = data.meaning;
    document.getElementById("modalDescription").textContent = data.description;
  
    document.getElementById("flowerModal").style.display = "block";
  }
  
  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("flowerModal").style.display = "none";
  });
  
  window.addEventListener("click", (e) => {
    if (e.target.id === "flowerModal") {
      document.getElementById("flowerModal").style.display = "none";
    }
  });

  function showFlowerDetail(flowerName) {
    const data = flowerDetails[flowerName];
    if (!data) return;
  
    // 顯示 Modal 彈出視窗
    document.getElementById("modalImage").src = data.image;
    document.getElementById("modalTitle").textContent = data.name;
    document.getElementById("modalMeaning").textContent = data.meaning;
    document.getElementById("modalDescription").textContent = data.description;
  
    // 顯示 Modal
    document.getElementById("flowerModal").style.display = "block";
  }
// 點擊關閉按鈕
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("flowerModal").style.display = "none";
  });
  
  // 點擊 Modal 以外的區域時關閉
  window.addEventListener("click", (e) => {
    if (e.target.id === "flowerModal") {
      document.getElementById("flowerModal").style.display = "none";
    }
  });
     
  