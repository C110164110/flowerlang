const birthdayFlowers = {
  "01": {
    flower: "雪花蓮",
    meaning: "純潔、誠摯",
    description: "雪花蓮象徵純潔與誠摯，是寒冬中的一抹亮色。",
    quote: "在最寒冷的日子裡，也要綻放溫柔。"
  },
  "02": {
    flower: "紫羅蘭",
    meaning: "忠誠、謙遜",
    description: "紫羅蘭是忠誠與謙遜的象徵，也代表對摯愛的思念。",
    quote: "真正的愛是沉默且堅定的陪伴。"
  },
  "03": {
    flower: "櫻花",
    meaning: "希望、短暫之美",
    description: "櫻花綻放時如雲如霞，提醒人們珍惜當下的美好。",
    quote: "美麗不在於永恆，而在於盛開的瞬間。"
  },
  "04": {
    flower: "鬱金香",
    meaning: "愛的告白",
    description: "鬱金香代表著深沉的愛，適合表達內心情感。",
    quote: "在春風中，我將愛輕輕說出口。"
  },
  "05": {
    flower: "鈴蘭",
    meaning: "幸福歸來",
    description: "鈴蘭如銀鈴般搖曳，傳遞著幸福與希望的訊息。",
    quote: "每一串花鈴，都敲響幸福的節奏。"
  },
  "06": {
    flower: "玫瑰",
    meaning: "愛與美",
    description: "玫瑰是愛情與美麗的象徵，熱情而經典。",
    quote: "為愛而生，為你盛開。"
  },
  "07": {
    flower: "向日葵",
    meaning: "崇拜、忠誠",
    description: "向日葵永遠追隨太陽，是積極與希望的象徵。",
    quote: "就算陰天，也要向著光走去。"
  },
  "08": {
    flower: "百合",
    meaning: "純潔、高雅",
    description: "百合氣質高雅，常象徵純潔與祝福。",
    quote: "不爭艷，卻自有芬芳。"
  },
  "09": {
    flower: "秋菊",
    meaning: "長壽、堅毅",
    description: "秋菊在深秋依舊盛開，象徵堅強與淡然。",
    quote: "即便寒霜，也能自在盛放。"
  },
  "10": {
    flower: "桂花",
    meaning: "友誼、懷念",
    description: "桂花香氣濃郁，常與懷舊與溫馨的回憶連結。",
    quote: "香遠益清，思念綿長。"
  },
  "11": {
    flower: "茶花",
    meaning: "謙虛、美德",
    description: "茶花四季常青，是堅毅與高尚的代表。",
    quote: "美不張揚，卻深入人心。"
  },
  "12": {
    flower: "聖誕紅",
    meaning: "祝福、和平",
    description: "聖誕紅充滿節慶氣息，象徵祝福與愛的傳遞。",
    quote: "願你在寒冬中，也擁有紅火的溫暖。"
  }
};

function showFlowerInfo(flowerName, description, quote = "") {
  const imagePath = `images/${flowerName}.jpg`;
  document.getElementById("flowerImage").src = imagePath;
  document.getElementById("flowerImage").alt = flowerName;
  document.getElementById("flowerImage").style.display = "block";

  document.getElementById("flowerName").innerText = flowerName;
  document.getElementById("flowerDesc").innerHTML = `${description}<br><em>「${quote}」</em>`;
}

function copyShareLink() {
  const flowerName = document.getElementById("flowerName").innerText;
  const shareText = `我的誕生花是「${flowerName}」！你也來看看你的誕生花吧：https://你的網址/birthday.html`;
  navigator.clipboard.writeText(shareText).then(() => {
    alert("已複製分享連結！");
  });
}

function showBirthdayFlower() {
  const birthday = document.getElementById("birthdayInput").value;
  if (!birthday) {
    alert("請選擇一個日期！");
    return;
  }

  const month = birthday.split("-")[1]; // 確保取得月份
  const flowerData = birthdayFlowers[month];

  if (flowerData) {
    document.getElementById("flowerName").innerText = `你的誕生花是：${flowerData.flower}`;
    showFlowerInfo(flowerData.flower, flowerData.description, flowerData.quote);
  } else {
    alert("找不到該月份的誕生花資料！");
  }
}
