function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    const articlesGrid = document.getElementById('articlesGrid');
    
    if (!sortSelect || !articlesGrid) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const articles = Array.from(articlesGrid.querySelectorAll('.article-card'));
        
        articles.sort((a, b) => {
            switch(sortValue) {
                case 'name-asc':
                    return a.dataset.name.localeCompare(b.dataset.name);
                case 'name-desc':
                    return b.dataset.name.localeCompare(a.dataset.name);
                case 'difficulty':
                    return parseInt(b.dataset.difficulty) - parseInt(a.dataset.difficulty);
                case 'health':
                    return parseInt(b.dataset.health) - parseInt(a.dataset.health);
                default:
                    return 0;
            }
        });
        
        articlesGrid.innerHTML = '';
        articles.forEach(article => articlesGrid.appendChild(article));
    });
}

function initDifficultyFilter() {
    const filterButtons = document.querySelectorAll('.difficulty-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const difficulty = this.dataset.difficulty;
            const articles = document.querySelectorAll('.article-card');
            
            articles.forEach(article => {
                if (difficulty === 'all' || article.dataset.difficulty === difficulty) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск в категории...';
    searchInput.className = 'category-search';
    
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .category-search {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .category-search:focus {
            outline: none;
            border-color