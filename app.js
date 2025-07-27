// app.js

// 1. Game metadata: descriptions + play URLs
const gameData = {
  "Traffic Racer": {
    desc: "High-speed endless driving on busy highways—dodge cars and beat your own best score!",
    url: "https://play.google.com/store/apps/details?id=com.skgames.trafficrider"
  },
  "Pubg": {
    desc: "Dive into the ultimate battle royale—100 players, one island, only one victor.",
    url: "https://www.pubg.com"
  },
  "Fortnite": {
    desc: "Build, battle, and survive in this action-packed shooter with constant live events.",
    url: "https://www.epicgames.com/fortnite"
  },
  "Call of Duty": {
    desc: "Modern warfare meets cinematic single-player and heart-pounding multiplayer modes.",
    url: "https://www.callofduty.com"
  },
  "Minecraft": {
    desc: "Unleash your creativity—mine resources, craft tools, and build pixelated worlds.",
    url: "https://www.minecraft.net"
  },
  "Among Us": {
    desc: "Work together… or betray your crewmates! A social deduction party game.",
    url: "https://www.innersloth.com/gameAmongUs.php"
  },
  "League of Legends": {
    desc: "Five-v-five MOBA action—master champions, outplay enemies, and destroy their Nexus.",
    url: "https://play.euw.leagueoflegends.com"
  },
  "Valorant": {
    desc: "Precision shooting meets hero abilities—team up in tactical 5v5 combat.",
    url: "https://playvalorant.com"
  },
  "GTA V": {
    desc: "Open-world chaos—drive, fly, heist, and explore Los Santos solo or online.",
    url: "https://www.rockstargames.com/V"
  },
  "Temple Run 2": {
    desc: "Endless runner through ancient temples, dodge obstacles, and collect gems.",
    url: "https://www.imangistudios.com"
  },
  "Apex Legends": {
    desc: "Squad up in this fast-paced battle royale with unique Legend abilities.",
    url: "https://www.ea.com/games/apex-legends"
  },
  "Dota 2": {
    desc: "Complex, strategy-driven MOBA with hundreds of heroes and deep mechanics.",
    url: "https://www.dota2.com"
  },
  "Rocket League": {
    desc: "High-octane combo of soccer and rocket-powered cars—score insane goals.",
    url: "https://www.rocketleague.com"
  },
  "Fall Guys": {
    desc: "Massively multiplayer obstacle course—outlast dozens of jellybean competitors.",
    url: "https://www.fallguys.com"
  },
  "Counter-Strike: Global Offensive": {
    desc: "Classic tactical shooter—buy weapons, defuse bombs, and outsmart the enemy.",
    url: "https://blog.counter-strike.net"
  },
  "Roblox": {
    desc: "Platform of user-made games and experiences—endless creativity awaits.",
    url: "https://www.roblox.com"
  },
  "World of Warcraft": {
    desc: "Legendary MMORPG—dive into Azeroth, quest with friends, raid fearsome bosses.",
    url: "https://worldofwarcraft.com"
  },
  "FIFA 21": {
    desc: "The beautiful game, brought to life with realistic controls and club modes.",
    url: "https://www.ea.com/games/fifa/fifa-21"
  },
  "Overwatch": {
    desc: "Team-based hero shooter—combine powers and push payloads in vibrant maps.",
    url: "https://playoverwatch.com"
  },
  "Terraria": {
    desc: "2D sandbox adventure—dig, fight, explore, build, and conquer underground realms.",
    url: "https://terraria.org"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 2. Cache DOM elements for filtering
  const searchInput   = document.getElementById('searchInput');
  const categoryBtns  = document.querySelectorAll('.category-btn');
  const gameCards     = Array.from(document.querySelectorAll('.game-card'));
  const noResults     = document.getElementById('noResults');
  let selectedCategory = 'all';

  // 3. Cache DOM elements for modal
  const modal     = document.getElementById('gameModal');
  const titleEl   = document.getElementById('modalTitle');
  const descEl    = document.getElementById('modalDesc');
  const linkEl    = document.getElementById('modalLink');
  const closeBtn  = document.querySelector('.close-btn');

  // 4. Filter games by search text + category
  function filterGames() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;

    gameCards.forEach(card => {
      const title    = card.dataset.title.toLowerCase();
      const category = card.dataset.category.toLowerCase();
      const matchesText = title.includes(query);
      const matchesCat  = (selectedCategory === 'all') || (category === selectedCategory);
      const visible     = matchesText && matchesCat;

      card.style.display = visible ? '' : 'none';
      if (visible) anyVisible = true;
    });

    noResults.style.display = anyVisible ? 'none' : 'block';
  }

  // 5. Open modal with the clicked game's data
  function openModal(gameTitle) {
    const data = gameData[gameTitle];
    if (!data) return;

    titleEl.textContent = gameTitle;
    descEl.textContent  = data.desc;
    linkEl.href         = data.url;

    modal.style.display = 'flex';
  }

  // 6. Close modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // 7. Initialize filtering listeners
  searchInput.addEventListener('input', filterGames);
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.dataset.category;
      filterGames();
    });
  });

  // 8. Attach click listeners to each game card
  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.getAttribute('data-title'));
    });
  });

  // 9. Modal close listeners (X button & backdrop)
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // 10. Run initial filter to sync UI
  filterGames();
});
