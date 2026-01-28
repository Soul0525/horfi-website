/**
 * Blog Page Handler
 * Fetches and displays blog posts from API
 * 
 * @author House of Refuge Foundation, Inc.
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ===========================================
  // CONFIGURATION
  // ===========================================
  const CONFIG = {
    // API endpoint - update this to your actual API
    apiBase: 'https://panel.horfi.online/api',
    corsProxy: 'https://corsproxy.io/?',
    postsPerPage: 6,
    // Set to true to use sample data instead of API
    useSampleData: true
  };

  // ===========================================
  // SAMPLE DATA (Used when API is not available)
  // ===========================================
  const SAMPLE_POSTS = [
    {
      id: 1,
      title: "Christmas Celebration with Our Children",
      excerpt: "This year's Christmas celebration was filled with joy and laughter as our children received gifts and shared meals together with volunteers and donors.",
      content: "Full article content here...",
      category: "events",
      image: "img/portfolio/6.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-12-25",
      readTime: 5
    },
    {
      id: 2,
      title: "New Educational Program Launch",
      excerpt: "We are excited to announce our new educational support program that will help our children excel in their academic pursuits.",
      content: "Full article content here...",
      category: "announcements",
      image: "img/portfolio/11.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-11-15",
      readTime: 4
    },
    {
      id: 3,
      title: "A Story of Hope: Maria's Journey",
      excerpt: "Maria came to House of Refuge at age 7. Today, she is a college graduate working as a nurse. Read her inspiring story of transformation.",
      content: "Full article content here...",
      category: "stories",
      image: "img/portfolio/13.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-10-20",
      readTime: 8
    },
    {
      id: 4,
      title: "Monthly Update: October 2025",
      excerpt: "Here's what happened at House of Refuge this month - new arrivals, achievements, and upcoming events.",
      content: "Full article content here...",
      category: "updates",
      image: "img/portfolio/27.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-10-31",
      readTime: 3
    },
    {
      id: 5,
      title: "Volunteer Appreciation Day 2025",
      excerpt: "We celebrated our amazing volunteers who dedicate their time and skills to make a difference in our children's lives.",
      content: "Full article content here...",
      category: "events",
      image: "img/portfolio/31.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-09-15",
      readTime: 4
    },
    {
      id: 6,
      title: "Building Expansion Announcement",
      excerpt: "Great news! Thanks to generous donations, we are expanding our facilities to accommodate more children in need.",
      content: "Full article content here...",
      category: "announcements",
      image: "img/portfolio/36.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-08-10",
      readTime: 5
    },
    {
      id: 7,
      title: "From Abandoned to Adopted: Juan's Story",
      excerpt: "Juan was found abandoned at a bus station. After two years of care and love at HORFI, he found his forever family.",
      content: "Full article content here...",
      category: "stories",
      image: "img/portfolio/56.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-07-22",
      readTime: 7
    },
    {
      id: 8,
      title: "Back to School 2025",
      excerpt: "Our children are ready for the new school year! Thanks to our sponsors, everyone has new uniforms and school supplies.",
      content: "Full article content here...",
      category: "updates",
      image: "img/portfolio/62.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-06-01",
      readTime: 3
    },
    {
      id: 9,
      title: "Health and Wellness Program Results",
      excerpt: "Our annual health checkup shows significant improvement in our children's overall health and nutrition status.",
      content: "Full article content here...",
      category: "updates",
      image: "img/portfolio/78.jpg",
      author: {
        name: "HORFI Admin",
        avatar: "img/HORFI logo.png"
      },
      date: "2025-05-15",
      readTime: 4
    }
  ];

  // ===========================================
  // STATE MANAGEMENT
  // ===========================================
  let state = {
    posts: [],
    filteredPosts: [],
    currentPage: 1,
    currentCategory: 'all',
    searchQuery: '',
    isLoading: true,
    hasError: false
  };

  // ===========================================
  // DOM ELEMENTS
  // ===========================================
  const elements = {
    postsContainer: null,
    loadingElement: null,
    errorElement: null,
    noResultsElement: null,
    paginationElement: null,
    searchInput: null,
    searchBtn: null,
    retryBtn: null,
    categoryBtns: null
  };

  // ===========================================
  // UTILITY FUNCTIONS
  // ===========================================

  /**
   * Sanitize HTML to prevent XSS
   * @param {string} str - Input string
   * @returns {string} Sanitized string
   */
  function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  /**
   * Format date to readable string
   * @param {string} dateStr - Date string
   * @returns {string} Formatted date
   */
  function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  }

  /**
   * Truncate text to specified length
   * @param {string} text - Text to truncate
   * @param {number} length - Max length
   * @returns {string} Truncated text
   */
  function truncateText(text, length = 150) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
  }

  /**
   * Debounce function for search
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} Debounced function
   */
  function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ===========================================
  // API FUNCTIONS
  // ===========================================

  /**
   * Fetch blog posts from API
   * @returns {Promise<Array>} Array of blog posts
   */
  async function fetchPosts() {
    if (CONFIG.useSampleData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return SAMPLE_POSTS;
    }

    try {
      const response = await fetch(CONFIG.corsProxy + encodeURIComponent(CONFIG.apiBase + '/blogs'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Fallback to sample data on error
      return SAMPLE_POSTS;
    }
  }

  // ===========================================
  // RENDER FUNCTIONS
  // ===========================================

  /**
   * Create skeleton loading cards
   * @returns {string} HTML string
   */
  function createSkeletonCards() {
    let html = '';
    for (let i = 0; i < CONFIG.postsPerPage; i++) {
      html += `
        <div class="col-lg-4 col-md-6">
          <div class="skeleton-card">
            <div class="skeleton-image skeleton"></div>
            <div class="skeleton-body">
              <div class="skeleton-title skeleton"></div>
              <div class="skeleton-text skeleton"></div>
              <div class="skeleton-text skeleton"></div>
              <div class="skeleton-text skeleton"></div>
            </div>
          </div>
        </div>
      `;
    }
    return html;
  }

  /**
   * Create blog card HTML
   * @param {Object} post - Post data
   * @returns {string} HTML string
   */
  function createBlogCard(post) {
    const safeTitle = sanitizeHTML(post.title);
    const safeExcerpt = sanitizeHTML(truncateText(post.excerpt, 120));
    const safeAuthor = sanitizeHTML(post.author?.name || 'HORFI Admin');
    const safeCategory = sanitizeHTML(post.category);
    const formattedDate = formatDate(post.date);
    const postImage = post.image || 'img/portfolio/6.jpg';
    const authorAvatar = post.author?.avatar || 'img/HORFI logo.png';

    return `
      <div class="col-lg-4 col-md-6" data-aos="fade-up">
        <article class="blog-card">
          <div class="blog-card-image">
            <img src="${postImage}" alt="${safeTitle}" loading="lazy">
            <span class="blog-card-category">${safeCategory}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <span><i class="bi bi-calendar3"></i> ${formattedDate}</span>
              <span><i class="bi bi-clock"></i> ${post.readTime || 5} min read</span>
            </div>
            <h3 class="blog-card-title">
              <a href="blog-single.html?id=${post.id}">${safeTitle}</a>
            </h3>
            <p class="blog-card-excerpt">${safeExcerpt}</p>
            <div class="blog-card-footer">
              <div class="blog-card-author">
                <img src="${authorAvatar}" alt="${safeAuthor}">
                <span>${safeAuthor}</span>
              </div>
              <a href="blog-single.html?id=${post.id}" class="blog-card-link">
                Read More <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  /**
   * Create featured post HTML
   * @param {Object} post - Post data
   * @returns {string} HTML string
   */
  function createFeaturedPost(post) {
    const safeTitle = sanitizeHTML(post.title);
    const safeExcerpt = sanitizeHTML(truncateText(post.excerpt, 200));
    const formattedDate = formatDate(post.date);
    const postImage = post.image || 'img/portfolio/6.jpg';

    return `
      <div class="blog-featured mb-5" data-aos="fade-up">
        <div class="row g-0">
          <div class="col-lg-6">
            <div class="blog-featured-image">
              <img src="${postImage}" alt="${safeTitle}">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="blog-featured-content">
              <span class="blog-featured-badge">Featured</span>
              <h2 class="blog-featured-title">
                <a href="blog-single.html?id=${post.id}">${safeTitle}</a>
              </h2>
              <p class="blog-featured-excerpt">${safeExcerpt}</p>
              <div class="blog-featured-meta">
                <span><i class="bi bi-calendar3"></i> ${formattedDate}</span>
                <span><i class="bi bi-clock"></i> ${post.readTime || 5} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Create pagination HTML
   * @param {number} totalPages - Total number of pages
   * @param {number} currentPage - Current page number
   * @returns {string} HTML string
   */
  function createPagination(totalPages, currentPage) {
    if (totalPages <= 1) return '';

    let html = '';

    // Previous button
    html += `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        html += `
          <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>
        `;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }

    // Next button
    html += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    `;

    return html;
  }

  // ===========================================
  // UI UPDATE FUNCTIONS
  // ===========================================

  /**
   * Show loading state
   */
  function showLoading() {
    if (elements.loadingElement) elements.loadingElement.classList.remove('d-none');
    if (elements.errorElement) elements.errorElement.classList.add('d-none');
    if (elements.noResultsElement) elements.noResultsElement.classList.add('d-none');
    if (elements.paginationElement) elements.paginationElement.classList.add('d-none');
    
    if (elements.postsContainer) {
      elements.postsContainer.innerHTML = createSkeletonCards();
    }
  }

  /**
   * Show error state
   */
  function showError() {
    if (elements.loadingElement) elements.loadingElement.classList.add('d-none');
    if (elements.errorElement) elements.errorElement.classList.remove('d-none');
    if (elements.noResultsElement) elements.noResultsElement.classList.add('d-none');
    if (elements.paginationElement) elements.paginationElement.classList.add('d-none');
    
    if (elements.postsContainer) {
      elements.postsContainer.innerHTML = '';
    }
  }

  /**
   * Show no results state
   */
  function showNoResults() {
    if (elements.loadingElement) elements.loadingElement.classList.add('d-none');
    if (elements.errorElement) elements.errorElement.classList.add('d-none');
    if (elements.noResultsElement) elements.noResultsElement.classList.remove('d-none');
    if (elements.paginationElement) elements.paginationElement.classList.add('d-none');
    
    if (elements.postsContainer) {
      elements.postsContainer.innerHTML = '';
    }
  }

  /**
   * Render blog posts
   */
  function renderPosts() {
    if (elements.loadingElement) elements.loadingElement.classList.add('d-none');
    if (elements.errorElement) elements.errorElement.classList.add('d-none');

    if (state.filteredPosts.length === 0) {
      showNoResults();
      return;
    }

    if (elements.noResultsElement) elements.noResultsElement.classList.add('d-none');

    // Calculate pagination
    const totalPages = Math.ceil(state.filteredPosts.length / CONFIG.postsPerPage);
    const startIndex = (state.currentPage - 1) * CONFIG.postsPerPage;
    const endIndex = startIndex + CONFIG.postsPerPage;
    const postsToShow = state.filteredPosts.slice(startIndex, endIndex);

    // Build HTML
    let html = '';

    // Add featured post on first page with 'all' category
    if (state.currentPage === 1 && state.currentCategory === 'all' && !state.searchQuery) {
      html += createFeaturedPost(state.filteredPosts[0]);
      // Skip the featured post in regular grid
      const gridPosts = postsToShow.slice(1);
      gridPosts.forEach(post => {
        html += createBlogCard(post);
      });
    } else {
      postsToShow.forEach(post => {
        html += createBlogCard(post);
      });
    }

    if (elements.postsContainer) {
      elements.postsContainer.innerHTML = html;
    }

    // Update pagination
    if (elements.paginationElement) {
      const paginationList = elements.paginationElement.querySelector('ul');
      if (paginationList) {
        paginationList.innerHTML = createPagination(totalPages, state.currentPage);
      }
      elements.paginationElement.classList.toggle('d-none', totalPages <= 1);
    }

    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }

  /**
   * Filter posts by category and search
   */
  function filterPosts() {
    state.filteredPosts = state.posts.filter(post => {
      // Category filter
      const categoryMatch = state.currentCategory === 'all' || 
                           post.category?.toLowerCase() === state.currentCategory.toLowerCase();

      // Search filter
      const searchMatch = !state.searchQuery || 
                         post.title?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(state.searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });

    state.currentPage = 1;
    renderPosts();
  }

  // ===========================================
  // EVENT HANDLERS
  // ===========================================

  /**
   * Handle category button click
   * @param {Event} e - Click event
   */
  function handleCategoryClick(e) {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    // Update active state
    if (elements.categoryBtns) {
      elements.categoryBtns.forEach(b => b.classList.remove('active'));
    }
    btn.classList.add('active');

    // Update state and filter
    state.currentCategory = btn.dataset.category;
    filterPosts();
  }

  /**
   * Handle search
   */
  function handleSearch() {
    state.searchQuery = elements.searchInput?.value.trim() || '';
    filterPosts();
  }

  /**
   * Handle pagination click
   * @param {Event} e - Click event
   */
  function handlePaginationClick(e) {
    e.preventDefault();
    const link = e.target.closest('.page-link');
    if (!link || link.parentElement.classList.contains('disabled')) return;

    const page = parseInt(link.dataset.page, 10);
    if (page && page !== state.currentPage) {
      state.currentPage = page;
      renderPosts();

      // Scroll to top of blog section
      const blogSection = document.querySelector('#blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  /**
   * Handle retry button click
   */
  async function handleRetry() {
    showLoading();
    await initBlog();
  }

  // ===========================================
  // INITIALIZATION
  // ===========================================

  /**
   * Cache DOM elements
   */
  function cacheElements() {
    elements.postsContainer = document.getElementById('blog-posts-container');
    elements.loadingElement = document.getElementById('blog-loading');
    elements.errorElement = document.getElementById('blog-error');
    elements.noResultsElement = document.getElementById('blog-no-results');
    elements.paginationElement = document.getElementById('blog-pagination');
    elements.searchInput = document.getElementById('blog-search-input');
    elements.searchBtn = document.getElementById('blog-search-btn');
    elements.retryBtn = document.getElementById('retry-btn');
    elements.categoryBtns = document.querySelectorAll('.category-btn');
  }

  /**
   * Bind event listeners
   */
  function bindEvents() {
    // Category buttons
    const categoriesContainer = document.getElementById('blog-categories');
    if (categoriesContainer) {
      categoriesContainer.addEventListener('click', handleCategoryClick);
    }

    // Search
    if (elements.searchBtn) {
      elements.searchBtn.addEventListener('click', handleSearch);
    }
    
    if (elements.searchInput) {
      elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      });

      // Debounced search on input
      const debouncedSearch = debounce(handleSearch, 500);
      elements.searchInput.addEventListener('input', debouncedSearch);
    }

    // Pagination
    if (elements.paginationElement) {
      elements.paginationElement.addEventListener('click', handlePaginationClick);
    }

    // Retry button
    if (elements.retryBtn) {
      elements.retryBtn.addEventListener('click', handleRetry);
    }
  }

  /**
   * Initialize blog
   */
  async function initBlog() {
    try {
      state.isLoading = true;
      state.hasError = false;

      const posts = await fetchPosts();

      if (!posts || posts.length === 0) {
        showNoResults();
        return;
      }

      state.posts = posts;
      state.filteredPosts = posts;
      state.isLoading = false;

      renderPosts();
    } catch (error) {
      console.error('Failed to initialize blog:', error);
      state.hasError = true;
      state.isLoading = false;
      showError();
    }
  }

  /**
   * Main initialization
   */
  function init() {
    // Only run on blog page
    if (!document.querySelector('.blog-page')) return;

    cacheElements();
    bindEvents();
    showLoading();
    initBlog();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();