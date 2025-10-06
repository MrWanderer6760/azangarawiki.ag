function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    let images = [];

    galleryItems.forEach((img, index) => {
        images.push({
            src: img.getAttribute('data-full') || img.src,
            caption: img.parentElement.querySelector('.gallery-caption')?.textContent || ''
        });

        img.addEventListener('click', () => {
            currentIndex = index;
            openModal();
        });
    });

    function openModal() {
        modal.style.display = 'block';
        updateModal();
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function updateModal() {
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModal();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModal();
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'Escape':
                    closeModal();
                    break;
            }
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initTOCHighlight() {
    const sections = document.querySelectorAll('.content-section');
    const links = document.querySelectorAll('.table-of-contents a');
    
    if (sections.length === 0 || links.length === 0) return;

    const observerOptions = {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initSmoothScroll();
    initTOCHighlight();
    
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents a.active {
            color: var(--primary) !important;
            font-weight: bold;
            padding-left: 5px;
            border-left: 3px solid var(--secondary);
        }
    `;
    document.head.appendChild(style);
});

function initCodeCopy() {
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Копировать';
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.textContent = 'Скопировано!';
                setTimeout(() => button.textContent = 'Копировать', 2000);
            } catch (err) {
                console.error('Ошибка копирования:', err);
            }
        });
        
        const container = block.parentNode;
        if (container.classList.contains('highlight')) {
            container.style.position = 'relative';
            button.style.position = 'absolute';
            button.style.top = '5px';
            button.style.right = '5px';
            container.appendChild(button);
        }
    });
}