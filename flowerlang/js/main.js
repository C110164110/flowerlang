document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("themeToggle");
  const searchInput = document.getElementById("searchInput");
  const flowerGallery = document.getElementById("flowerGallery");

  // 預設花語資料
  const flowers = [
    { name: "玫瑰", meaning: "愛與美", image: "images/rose.jpg" },
    { name: "向日葵", meaning: "崇拜、忠誠", image: "images/sunflower.jpg" },
    { name: "百合", meaning: "純潔、高雅", image: "images/lily.jpg" },
    { name: "櫻花", meaning: "希望、短暫之美", image: "images/cherry_blossom.jpg" },
  ];

  // 顯示所有花語卡片
  function displayFlowers(flowers) {
    flowerGallery.innerHTML = ""; // 清空現有的花語卡片
    flowers.forEach(flower => {
      const card = document.createElement("div");
      card.classList.add("flower-card");

      card.innerHTML = `
        <img src="${flower.image}" alt="${flower.name}" style="width: 100%; height: auto; border-radius: 5px;" />
        <h3>${flower.name}</h3>
        <p>${flower.meaning}</p>
      `;

      flowerGallery.appendChild(card);
    });
  }

  // 根據搜尋文字過濾花語
  searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredFlowers = flowers.filter(flower =>
      flower.name.toLowerCase().includes(searchQuery) || flower.meaning.toLowerCase().includes(searchQuery)
    );
    displayFlowers(filteredFlowers);
  });

  // 主題切換功能
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  // 預設顯示所有花語
  displayFlowers(flowers);
});
