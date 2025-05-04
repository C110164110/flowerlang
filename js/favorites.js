// 載入收藏的花語
document.addEventListener("DOMContentLoaded", () => {
    const favoriteGallery = document.getElementById("favoriteGallery");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (favorites.length === 0) {
      favoriteGallery.innerHTML = "<p>你尚未收藏任何花語。</p>";
    } else {
      favorites.forEach(favorite => {
        const flower = flowersData.find(flower => flower.name === favorite);
        if (flower) {
          const card = document.createElement("div");
          card.classList.add("card");
  
          card.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}" />
            <h3>${flower.name}</h3>
            <p>${flower.meaning}</p>
            <button onclick="removeFavorite('${flower.name}')">移除收藏</button>
          `;
  
          favoriteGallery.appendChild(card);
        }
      });
    }
  });
  
  // 移除收藏
  function removeFavorite(flowerName) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(favorite => favorite !== flowerName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  
    // 重新載入收藏頁面
    window.location.reload();
  }
  