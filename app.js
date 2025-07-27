// app.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput   = document.getElementById('searchInput');
  const categoryBtns  = document.querySelectorAll('.category-btn');
  const gameCards     = Array.from(document.querySelectorAll('.game-card'));
  const noResults     = document.getElementById('noResults');

  let selectedCategory = 'all';

  // filter function
  function filterGames() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;

    gameCards.forEach(card => {
      const title    = card.dataset.title.toLowerCase();
      const category = card.dataset.category.toLowerCase();
      const matchesText = title.includes(query);
      const matchesCat  = (selectedCategory === 'all') || (category === selectedCategory);

      const visible = matchesText && matchesCat;
      card.style.display = visible ? '' : 'none';
      if (visible) anyVisible = true;
    });

    noResults.style.display = anyVisible ? 'none' : 'block';
  }

  // search input listener
  searchInput.addEventListener('input', filterGames);

  // category button listeners
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // set active styling
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // update filter and rerun
      selectedCategory = btn.dataset.category;
      filterGames();
    });
  });

  // initial run
  filterGames();
});
