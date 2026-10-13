/**
 * The Financial Autopsy: interactive prototype engine
 * Developed for University School Group Project (Finance & UI/UX)
 * Ticker: NASDAQ: AVGO (Broadcom Inc.)
 */

// Articles are generated into articles.json from content/ by scripts/build-articles.mjs
let articlesData = [];

async function loadArticles() {
  const res = await fetch("articles.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load articles.json (HTTP " + res.status + ")");
  return res.json();
}

function showArticlesLoadError() {
  const container = document.getElementById("articles-feed-container");
  if (container) {
    container.innerHTML = `<div class="col-span-full p-6 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">
      Articles could not be loaded. If you opened index.html directly from your computer, run
      <code>node scripts/dev-server.mjs</code> and open http://localhost:8080 instead.</div>`;
  }
}

// App State
let currentArticleId = null;
let currentViewMode = "pages"; // 'pages' or 'scroll'
let currentFontSize = "md"; // 'sm', 'md', 'lg'
let activeFilter = "all";
let searchQuery = "";

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  // Clear copies saved by the old in-browser editor so they can't override the real articles
  try { localStorage.removeItem("avgo_custom_articles"); } catch (e) {}

  try {
    articlesData = await loadArticles();
  } catch (e) {
    console.error(e);
  }

  initRouting();
  renderArticlesList();
  if (articlesData.length === 0) showArticlesLoadError();
  setupEventListeners();
  updateReadingProgress();
  wrapTablesForMobile();
  changeFontSize("md");
  window.addEventListener("scroll", updateReadingProgress);
});

// Wrap all .financial-table elements in a horizontal scroll container for mobile
function wrapTablesForMobile() {
  document.querySelectorAll(".financial-table").forEach(table => {
    // Skip if already wrapped
    if (table.parentElement && table.parentElement.classList.contains("table-scroll-wrapper")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll-wrapper";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

// Routing Engine (Supports hash navigation #home, #post-1, #post-2, etc.)
function initRouting() {
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
}

function handleHashChange() {
  const hash = window.location.hash.replace("#", "") || "home";

  if (hash === "home" || hash === "") {
    showHomeView();
  } else if (hash.startsWith("post-")) {
    const article = articlesData.find(a => a.id === hash);
    if (article) {
      showArticleView(article);
    } else {
      showHomeView();
    }
  } else if (hash === "about") {
    showAboutView();
  } else {
    showHomeView();
  }
}

// Layout Switcher: Pages vs Scroll
function setViewMode(mode) {
  currentViewMode = mode;
  document.getElementById("btn-mode-pages").classList.toggle("bg-white", mode === "pages");
  document.getElementById("btn-mode-pages").classList.toggle("shadow-sm", mode === "pages");
  document.getElementById("btn-mode-pages").classList.toggle("text-red-700", mode === "pages");
  document.getElementById("btn-mode-pages").classList.toggle("text-slate-600", mode !== "pages");

  document.getElementById("btn-mode-scroll").classList.toggle("bg-white", mode === "scroll");
  document.getElementById("btn-mode-scroll").classList.toggle("shadow-sm", mode === "scroll");
  document.getElementById("btn-mode-scroll").classList.toggle("text-red-700", mode === "scroll");
  document.getElementById("btn-mode-scroll").classList.toggle("text-slate-600", mode !== "scroll");

  if (mode === "scroll") {
    renderContinuousScrollView();
  } else {
    handleHashChange();
  }
}

// Render Home View
function showHomeView() {
  document.getElementById("view-home").classList.remove("hidden");
  document.getElementById("view-article").classList.add("hidden");
  document.getElementById("view-scroll").classList.add("hidden");
  document.getElementById("view-about").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Render Dedicated Article View (Pages Mode)
function showArticleView(article) {
  document.getElementById("view-home").classList.add("hidden");
  document.getElementById("view-scroll").classList.add("hidden");
  document.getElementById("view-about").classList.add("hidden");
  
  const articleView = document.getElementById("view-article");
  articleView.classList.remove("hidden");

  // Populate Article Details
  document.getElementById("art-tag").className = `text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${article.tagColor}`;
  document.getElementById("art-tag").textContent = article.tag;
  document.getElementById("art-category").textContent = article.category;
  document.getElementById("art-date").textContent = article.date;
  document.getElementById("art-read-time").textContent = article.readingTime;
  
  document.getElementById("art-title").textContent = article.title;
  document.getElementById("art-subtitle").textContent = article.subtitle;
  
  document.getElementById("art-author-name").textContent = article.author.name;
  document.getElementById("art-author-role").textContent = article.author.role;
  document.getElementById("art-author-avatar").textContent = article.author.avatar;

  // Metric Ribbon
  document.getElementById("art-rating").textContent = article.rating;
  document.getElementById("art-target-price").textContent = article.targetPrice;
  document.getElementById("art-current-price").textContent = article.currentPrice;
  document.getElementById("art-current-label").textContent = article.priceDate ? `Price (${article.priceDate})` : "Current";
  document.getElementById("art-upside").textContent = article.upside;
  // Articles without a rating or prices (e.g. new non-stock posts) hide the metric ribbon
  document.getElementById("art-metrics").classList.toggle("hidden", !hasMetrics(article));

  // Article Body HTML
  document.getElementById("art-body").innerHTML = article.content;
  wrapTablesForMobile();
  currentArticleId = article.id;

  // Next/Prev navigation
  const currentIndex = articlesData.findIndex(a => a.id === article.id);
  const prevArticle = articlesData[currentIndex - 1];
  const nextArticle = articlesData[currentIndex + 1];

  const prevBtn = document.getElementById("art-prev-btn");
  const nextBtn = document.getElementById("art-next-btn");

  if (prevArticle) {
    prevBtn.classList.remove("invisible");
    prevBtn.onclick = () => window.location.hash = prevArticle.id;
    document.getElementById("art-prev-title").textContent = prevArticle.title.substring(0, 35) + "...";
  } else {
    prevBtn.classList.add("invisible");
  }

  if (nextArticle) {
    nextBtn.classList.remove("invisible");
    nextBtn.onclick = () => window.location.hash = nextArticle.id;
    document.getElementById("art-next-title").textContent = nextArticle.title.substring(0, 35) + "...";
  } else {
    nextBtn.classList.add("invisible");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Render Continuous Scroll View (For comparing scroll vs pages)
function renderContinuousScrollView() {
  document.getElementById("view-home").classList.add("hidden");
  document.getElementById("view-article").classList.add("hidden");
  document.getElementById("view-about").classList.add("hidden");

  const scrollView = document.getElementById("view-scroll");
  scrollView.classList.remove("hidden");

  const container = document.getElementById("scroll-articles-container");
  container.innerHTML = articlesData.map((art, index) => `
    <article class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-8 mb-8 sm:mb-10 transition-all hover:border-slate-300">
      <div class="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-2">
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          <span class="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${art.tagColor}">
            ${art.tag}
          </span>
          <span class="text-xs text-slate-500 font-medium">${art.category}</span>
          <span class="text-slate-300 hidden sm:inline">•</span>
          <span class="text-xs text-slate-500">${art.date}</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200">
            Article ${index + 1} of ${articlesData.length}
          </div>
        </div>
      </div>

      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-3">
        ${art.title}
      </h2>
      <p class="text-slate-600 text-sm sm:text-base mb-6 pb-4 border-b border-slate-100 leading-relaxed">
        ${art.subtitle}
      </p>

      <div class="article-content leading-relaxed">
        ${art.content}
      </div>

      <div class="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span>Author: ${art.author.name} (${art.author.role})</span>
        <div class="flex items-center gap-3">
          <a href="#${art.id}" onclick="setViewMode('pages')" class="text-red-600 font-bold hover:underline flex items-center gap-1">
            Open in Dedicated Page View →
          </a>
        </div>
      </div>
    </article>
  `).join("");

  wrapTablesForMobile();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Render About the Analyst View
function showAboutView() {
  document.getElementById("view-home").classList.add("hidden");
  document.getElementById("view-article").classList.add("hidden");
  document.getElementById("view-scroll").classList.add("hidden");
  document.getElementById("view-about").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hasMetrics(article) {
  return Boolean(article.rating || article.targetPrice || article.currentPrice || article.upside);
}

// Render Articles Grid on Home View
function renderArticlesList() {
  const container = document.getElementById("articles-feed-container");
  
  let filtered = articlesData.filter(article => {
    const matchFilter = activeFilter === "all" || article.category.toLowerCase().includes(activeFilter) || article.tag.toLowerCase().includes(activeFilter);
    const matchSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-xl border border-slate-200 p-8">
        <p class="text-slate-500 text-sm">No research memos match your filter: "${searchQuery || activeFilter}"</p>
        <button onclick="resetFilters()" class="mt-3 text-red-600 text-sm font-semibold hover:underline">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((article, index) => `
    <article class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-red-200 transition-all group">
      <div class="p-6">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${article.tagColor}">
            ${article.tag}
          </span>
          <span class="text-xs text-slate-500 font-mono-num">${article.readingTime}</span>
        </div>

        <h3 class="text-lg md:text-xl font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug mb-2">
          <a href="#${article.id}" class="hover:underline">${article.title}</a>
        </h3>

        <p class="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          ${article.summary}
        </p>

        <!-- Financial Analyst Metric Bar -->
        <div class="bg-slate-50 border border-slate-200/80 rounded-lg p-3 grid grid-cols-2 gap-2 text-xs mb-4${hasMetrics(article) ? "" : " hidden"}">
          <div>
            <span class="text-slate-500 block text-[11px] uppercase tracking-wider">Rating</span>
            <span class="font-bold text-slate-900">${article.rating}</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[11px] uppercase tracking-wider">12M Target</span>
            <span class="font-bold text-red-700 font-mono-num">${article.targetPrice}</span>
          </div>
        </div>
      </div>

      <div class="px-6 py-3.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
            ${article.author.avatar || (article.author.name ? article.author.name.substring(0, 2).toUpperCase() : 'AV')}
          </div>
          <span class="text-xs font-medium text-slate-700">${article.author.name}</span>
        </div>
        <div class="flex items-center gap-2">
          <a href="#${article.id}" class="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Read Analysis
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

// Reading Progress Bar
function updateReadingProgress() {
  const progressBar = document.getElementById("reading-progress");
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight > 0) {
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }
}

// Text Resizing for High-Density Financial Reading (Applies to all views and articles)
function changeFontSize(size) {
  currentFontSize = size;
  document.body.classList.remove("text-size-sm", "text-size-md", "text-size-lg");
  document.body.classList.add("text-size-" + size);

  // Update button highlights across all containers
  document.querySelectorAll(".btn-font-size").forEach(btn => {
    const isActive = btn.dataset.size === size;
    btn.classList.toggle("bg-red-50", isActive);
    btn.classList.toggle("text-red-700", isActive);
    btn.classList.toggle("border-red-200", isActive);
    btn.classList.toggle("font-bold", isActive);
    if (!isActive) {
      btn.classList.remove("bg-red-50", "text-red-700", "border-red-200", "font-bold");
    }
  });
}

// Interactive Media Modal (Drop in image or video)
function openMediaModal(type, title) {
  const modal = document.getElementById("media-modal");
  const modalTitle = document.getElementById("modal-media-title");
  const modalDesc = document.getElementById("modal-media-desc");
  const mediaInput = document.getElementById("modal-media-input");

  modalTitle.textContent = type === "video" ? `Video Embed: ${title}` : `Chart / Graphic Embed: ${title}`;
  modalDesc.textContent = type === "video" 
    ? "Paste a YouTube, Vimeo, or MP4 video URL below to preview how it integrates into the financial report."
    : "Paste an image URL (PNG, SVG, JPG) or chart link below to replace the placeholder graphic.";

  mediaInput.placeholder = type === "video" ? "e.g. https://www.youtube.com/watch?v=..." : "e.g. https://images.unsplash.com/... or /charts/revenue.png";
  modal.classList.remove("hidden");
  modal.dataset.mediaType = type;
}

function closeMediaModal() {
  document.getElementById("media-modal").classList.add("hidden");
}

function applyMediaInput() {
  const input = document.getElementById("modal-media-input").value;
  if (!input) {
    alert("Please enter a valid URL or link.");
    return;
  }
  showToast(`Preview updated with: ${input}. This preview is only on your screen. Add media permanently in Pages CMS.`, "success");
  closeMediaModal();
}

// Filters and Search Setup
function setupEventListeners() {
  // Search
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderArticlesList();
    });
  }

  // Filter Buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.remove("bg-red-600", "text-white");
        b.classList.add("bg-white", "text-slate-700");
      });
      btn.classList.add("bg-red-600", "text-white");
      btn.classList.remove("bg-white", "text-slate-700");
      activeFilter = btn.dataset.filter;
      renderArticlesList();
    });
  });
}

function resetFilters() {
  activeFilter = "all";
  searchQuery = "";
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll(".filter-btn").forEach(b => {
    b.classList.remove("bg-red-600", "text-white");
    b.classList.add("bg-white", "text-slate-700");
    if (b.dataset.filter === "all") {
      b.classList.add("bg-red-600", "text-white");
      b.classList.remove("bg-white", "text-slate-700");
    }
  });
  renderArticlesList();
}

function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "fixed bottom-20 right-6 z-50 pointer-events-none";
    document.body.appendChild(container);
  }
  
  const toast = document.createElement("div");
  toast.className = `toast-notification bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs mb-3 font-medium transition-all pointer-events-auto`;
  
  const icon = type === "success" ? "✓" : "ℹ";
  const iconColor = type === "success" ? "text-emerald-400 bg-emerald-950/60" : "text-blue-400 bg-blue-950/60";
  
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full ${iconColor} flex items-center justify-center font-bold text-xs shrink-0">${icon}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
