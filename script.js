// =============================================================================
// ZERO - AI Personal Butler Website JavaScript
// Advanced interactive features with smooth animations
// =============================================================================

class ZeroWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAudioControl();
        this.setupTabs();
        this.setupGallery();
        this.setupModal();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupChartAnimations();
        this.setupTypewriter();
    }

    // =============================================================================
    // Event Listeners Setup
    // =============================================================================
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.animateOnLoad();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // =============================================================================
    // Audio Control
    // =============================================================================
    setupAudioControl() {
        const audioToggle = document.getElementById('audioToggle');
        const bgMusic = document.getElementById('bgMusic');
        
        if (!audioToggle || !bgMusic) return;

        audioToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    audioToggle.classList.add('playing');
                    audioToggle.setAttribute('aria-label', '브금 끄기');
                }).catch(error => {
                    console.warn('Audio playback failed:', error);
                });
            } else {
                bgMusic.pause();
                audioToggle.classList.remove('playing');
                audioToggle.setAttribute('aria-label', '브금 켜기');
            }
        });

        // Volume control
        bgMusic.volume = 0.3;
        
        // Handle audio end
        bgMusic.addEventListener('ended', () => {
            audioToggle.classList.remove('playing');
        });
    }

    // =============================================================================
    // Tab System
    // =============================================================================
    setupTabs() {
        // Profile tabs
        this.setupTabGroup('.detail-tabs', '.tab-btn', '.tab-content');
        
        // Story tabs
        this.setupTabGroup('.story-tabs', '.story-tab-btn', '.story-tab-content');
    }

    setupTabGroup(tabContainerSelector, tabSelector, contentSelector) {
        const tabContainer = document.querySelector(tabContainerSelector);
        if (!tabContainer) return;

        const tabs = tabContainer.querySelectorAll(tabSelector);
        const contents = document.querySelectorAll(contentSelector);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab || tab.dataset.story;

                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                const targetContent = document.querySelector(`[data-content="${targetTab}"], [data-story-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    this.animateContentChange(targetContent);
                }
            });
        });
    }

    animateContentChange(content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 10);
    }

    // =============================================================================
    // Gallery System
    // =============================================================================
    setupGallery() {
        this.loadGalleryImages();
        this.setupGalleryFilter();
    }

    loadGalleryImages() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // 로딩 상태 표시로 레이아웃 시프트 방지
        galleryGrid.innerHTML = '<div class="loading-placeholder">갤러리 로딩 중...</div>';

        // Gallery image data with categories
        const galleryImages = [
            {
                src: '제로 에셋/Zero_Gentle_Smile_Butler_Front.jpg',
                title: '상냥한 미소',
                category: 'daily',
                description: '집사로서의 완벽한 모습'
            },
            {
                src: '제로 에셋/Zero_Talking_Seriously.jpg',
                title: '진지한 대화',
                category: 'emotion',
                description: '깊이 있는 감정 표현'
            },
            {
                src: '제로 에셋/Zero_Serving_Tray_Caring_Look.jpg',
                title: '정성스러운 서빙',
                category: 'daily',
                description: '주인님을 위한 완벽한 서비스'
            },
            {
                src: '제로 에셋/Zero_Cooking_With_Apron.jpg',
                title: '요리하는 제로',
                category: 'daily',
                description: '주인님을 위한 특별한 요리'
            },
            {
                src: '제로 에셋/Zero_System_Error_Ear_Glitch.jpg',
                title: '시스템 오류',
                category: 'system',
                description: '감정 충돌로 인한 오류 발생'
            },
            {
                src: '제로 에셋/Zero_Crying_Tears_Sad_Expression.jpg',
                title: '눈물',
                category: 'emotion',
                description: '학습된 감정의 표출'
            },
            {
                src: '제로 에셋/Zero_Holographic_Tablet_Analysis_Side.jpg',
                title: '데이터 분석',
                category: 'system',
                description: '홀로그램 인터페이스를 통한 분석'
            },
            {
                src: '제로 에셋/Zero_Clutching_Chest_Pain_Glitch.jpg',
                title: '감정적 고통',
                category: 'system',
                description: '시스템과 감정의 충돌'
            },
            {
                src: '제로 에셋/Zero_Sharp_Gaze_In_Shadow.jpg',
                title: '날카로운 시선',
                category: 'emotion',
                description: '숨겨진 감정의 깊이'
            },
            {
                src: '제로 에셋/Zero_Offering_Hand_Gentle_Smile_Window.jpg',
                title: '따뜻한 손길',
                category: 'daily',
                description: '주인님을 향한 배려'
            },
            {
                src: '제로 에셋/Zero_Reading_Holographic_Book.jpg',
                title: '학습 중',
                category: 'system',
                description: '지속적인 자기 발전'
            },
            {
                src: '제로 에셋/Zero_Morning_Sunlight_Yawning.jpg',
                title: '아침 햇살',
                category: 'daily',
                description: '평온한 일상의 한 순간'
            }
        ];

        // 로딩 플레이스홀더 제거 후 실제 콘텐츠 로드
        setTimeout(() => {
            galleryGrid.innerHTML = '';

            galleryImages.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = `gallery-item ${image.category}`;
                galleryItem.style.animationDelay = `${index * 0.1}s`;
                
                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <div class="gallery-info">
                            <h4>${image.title}</h4>
                            <p>${image.description}</p>
                        </div>
                    </div>
                `;

                galleryItem.addEventListener('click', () => {
                    this.openModal(image.src, image.title);
                });

                galleryGrid.appendChild(galleryItem);
            });

            // Animate gallery items on load
            this.animateGalleryItems();
        }, 100); // 100ms 후에 로드
    }

    setupGalleryFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    animateGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }

    // =============================================================================
    // Modal System
    // =============================================================================
    setupModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeBtn = document.querySelector('.modal-close');

        if (!modal || !modalImg || !modalCaption || !closeBtn) return;

        // Close modal on click outside or close button
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openModal(imageSrc, caption) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');

        modal.style.display = 'block';
        modalImg.src = imageSrc;
        modalCaption.textContent = caption;

        // Animate modal appearance
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // =============================================================================
    // Scroll Effects
    // =============================================================================
    setupScrollEffects() {
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a, .cta-primary, .cta-secondary');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-title, .profile-main, .story-scene, .download-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupParallaxEffects() {
        const heroImage = document.querySelector('.hero-img');
        if (!heroImage) return;

        // 성능 최적화를 위한 throttle 적용
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.05; // 효과를 줄여서 레이아웃 시프트 최소화
            
            // will-change 속성으로 GPU 가속 활성화
            heroImage.style.willChange = 'transform';
            heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    handleScroll() {
        this.updateHeaderOnScroll();
        this.updateActiveNavLink();
    }

    updateHeaderOnScroll() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 14, 23, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 14, 23, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // =============================================================================
    // Mobile Menu
    // =============================================================================
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (!mobileToggle || !navMenu) return;

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');

            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // =============================================================================
    // Chart Animations
    // =============================================================================
    setupChartAnimations() {
        const chartBars = document.querySelectorAll('.chart-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percentage = entry.target.dataset.percentage;
                    entry.target.style.setProperty('--percentage', `${percentage}%`);
                }
            });
        }, { threshold: 0.5 });

        chartBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // =============================================================================
    // Typewriter Effect
    // =============================================================================
    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.hero-subtitle');
        
        typewriterElements.forEach(element => {
            if (element.dataset.typed) return; // Already processed
            
            const text = element.textContent;
            element.textContent = '';
            element.dataset.typed = 'true';
            
            let i = 0;
            const typeTimer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeTimer);
                }
            }, 100);
        });
    }

    // =============================================================================
    // Utility Functions
    // =============================================================================
    animateOnLoad() {
        // Add loading animations with better performance
        const elements = document.querySelectorAll('.hero-text, .hero-image');
        elements.forEach((element, index) => {
            // GPU 가속을 위해 will-change 속성 설정
            element.style.willChange = 'opacity, transform';
            element.style.opacity = '0';
            element.style.transform = 'translate3d(0, 50px, 0)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 1s ease, transform 1s ease';
                element.style.opacity = '1';
                element.style.transform = 'translate3d(0, 0, 0)';
                
                // 애니메이션 완료 후 will-change 제거
                setTimeout(() => {
                    element.style.willChange = 'auto';
                }, 1000);
            }, index * 200);
        });
    }

    handleResize() {
        // Adjust layouts on resize
        this.adjustGalleryLayout();
    }

    adjustGalleryLayout() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        const items = galleryGrid.querySelectorAll('.gallery-item');
        const containerWidth = galleryGrid.offsetWidth;
        const itemWidth = 300; // Minimum item width
        const gap = 32; // Gap between items
        const itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
        
        if (itemsPerRow > 0) {
            const actualItemWidth = (containerWidth - gap * (itemsPerRow - 1)) / itemsPerRow;
            items.forEach(item => {
                item.style.width = `${actualItemWidth}px`;
            });
        }
    }

    // =============================================================================
    // Easter Eggs & Special Effects
    // =============================================================================
    addSpecialEffects() {
        // Konami code easter egg
        let konamiCode = [];
        const targetSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > targetSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === targetSequence.join(',')) {
                this.activateSpecialMode();
                konamiCode = [];
            }
        });
    }

    activateSpecialMode() {
        // Add special visual effects
        document.body.style.filter = 'hue-rotate(180deg)';
        
        // Show special message
        const message = document.createElement('div');
        message.textContent = '시스템 해킹 모드 활성화됨...';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Orbitron', monospace;
            z-index: 10000;
            animation: glitch 0.5s infinite;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
            document.body.style.filter = '';
        }, 3000);
    }

    // =============================================================================
    // Performance Optimization
    // =============================================================================
    optimizePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Throttle scroll events
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.removeEventListener('scroll', this.handleScroll);
        window.addEventListener('scroll', throttledScroll, { passive: true });
    }
}

// =============================================================================
// Initialize Website
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const website = new ZeroWebsite();
    
    // Add special effects after everything is loaded
    window.addEventListener('load', () => {
        website.addSpecialEffects();
        website.optimizePerformance();
    });
});

// =============================================================================
// Additional CSS Animations via JavaScript
// =============================================================================
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(10, 14, 23, 0.98);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                backdrop-filter: blur(20px);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .nav-menu a {
                font-size: 1.2rem;
                padding: 1rem 2rem;
                display: block;
                width: 100%;
                text-align: center;
            }
        }
        
        .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .gallery-item.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(0, 212, 255, 0.3);
            border-radius: 50%;
            border-top-color: var(--primary-blue);
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
};

addDynamicStyles(); 