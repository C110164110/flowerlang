// 切換主題
const themeToggleBtn = document.getElementById("themeToggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

// 載入儲存的主題設定
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
}

// 搜尋花語
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const flowerGallery = document.getElementById("flowerGallery");

const flowersData = [
  { name: "玫瑰", meaning: "愛情與浪漫", image: "images/rose.jpg" },
  { name: "百合", meaning: "純潔與高貴", image: "images/lily.jpg" },
  { name: "向日葵", meaning: "正向與希望", image: "images/sunflower.jpg" },
  // 可以根據需求增加更多花語資料
];

// 搜尋並顯示花語卡片
searchBtn.addEventListener("click", () => {
  const searchQuery = searchInput.value.toLowerCase().trim();
  if (searchQuery === "") return;

  const filteredFlowers = flowersData.filter(flower => 
    flower.name.toLowerCase().includes(searchQuery) || 
    flower.meaning.toLowerCase().includes(searchQuery)
  );

  flowerGallery.innerHTML = ''; // 清空目前顯示的結果

  if (filteredFlowers.length === 0) {
    flowerGallery.innerHTML = `<p>找不到符合的結果，請再試一次！</p>`;
  } else {
    filteredFlowers.forEach(flower => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${flower.image}" alt="${flower.name}" />
        <h3>${flower.name}</h3>
        <p>${flower.meaning}</p>
        <button onclick="toggleFavorite('${flower.name}')">收藏</button>
      `;
      
      flowerGallery.appendChild(card);
    });
  }
});


// 收藏功能 (使用 localStorage)
function toggleFavorite(flowerName) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const flowerIndex = favorites.indexOf(flowerName);

  if (flowerIndex > -1) {
    favorites.splice(flowerIndex, 1); // 移除已收藏的花
  } else {
    favorites.push(flowerName); // 添加到收藏
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert(`${flowerName} 已經 ${flowerIndex > -1 ? "移除" : "添加"}到收藏夾`);
}
