# Broadcom ($AVGO) Equity Research Blog & UI/UX Prototype

> **University School Group Project**  
> **Course Track:** Finance Analysis & UI/UX Design  
> **Roleplay Persona:** Julian Lim, CFA, Senior Semiconductor & Infrastructure Equity Research Analyst  
> **Coverage Target:** Broadcom Inc. (NASDAQ: AVGO)  
> **Prototype Location:** `D:\Finance Sheets\broadcom-analyst-blog\`

---

## 1. Project Overview & The Roleplay Persona

This prototype models a high-end institutional equity research blog developed by a dedicated financial analyst covering **Broadcom Inc. (NASDAQ: AVGO)**. 

### The Analyst Persona: Julian Lim, CFA
- **Background:** Lead Analyst covering the Semiconductor and Infrastructure Software sectors.
- **Analytical Stance:** Institutional fundamental analysis, DCF financial modeling, hyperscaler capex tracking, and enterprise software pricing power.
- **Coverage Verdict:** **STRONG BUY** with a 12-month base price target of **$540.00** (+51.6% upside from $356.26 as of 13 Oct 2026).

---

## 2. Broadcom Corporate Color System & UI/UX Aesthetics

The prototype strictly incorporates Broadcom's corporate visual identity combined with modern Wall Street financial platforms (Bloomberg Terminal, Morningstar, Morgan Stanley Research):

| Brand Token | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| **Broadcom Crimson** | `#CC092F` | Primary brand accent, live ticker badges, call-to-actions, price targets |
| **Crimson Dark Hover** | `#A60726` | Button hover states, active navigation |
| **Institutional Navy** | `#0F172A` | Ticker tape background, table headers, dark surfaces |
| **Financial Slate** | `#1E293B` | High-contrast body typography, analyst profile cards |
| **Soft Neutral Canvas** | `#F8FAFC` | Eye-friendly research reading surface, reducing screen glare |
| **Bullish Green** | `#059669` / `#D1FAE5` | Outperform ratings, positive earnings revisions, upside metrics |
| **Risk/Bear Red** | `#EF4444` / `#FEF2F2` | Downside sensitivity callouts, bear case stress-tests |
| **Monospace Numerals** | `JetBrains Mono` | Tickers, financial tables, valuations, and DCF metrics |

---

## 3. The 4 Mandatory Research Blog Posts (Summary)

The prototype contains 4 full-length, professionally written research notes accessible via both **Pages Mode** and **Continuous Scroll Mode**:

1. **Blog 1: Flagship Initiation & Valuation ($540 Bull Case)**
   - *Title:* "Broadcom (NASDAQ: AVGO) Initiation: Why Custom Silicon (XPUs) & VMware Justify a $540 Bull Case"
   - *Topics:* Dual-engine investment thesis, custom AI silicon (ASIC) moat vs. Nvidia GPUs, DCF model, and forward P/E multiple valuation.
   - *Includes:* Segment revenue mix chart placeholder, financial valuation table, and executive video briefing placeholder.

2. **Blog 2: Technical Deep Dive & AI Networking Run-Rate**
   - *Title:* "Unpacking Broadcom's AI Run-Rate: When Tomahawk 5 & Optical Ethernet Outpace Merchant Silicon"
   - *Topics:* 100,000-GPU cluster bottlenecks, Ultra Ethernet Consortium (UEC) vs. Nvidia InfiniBand, SerDes IP leadership, and 51.2 Tbps switching throughput.
   - *Includes:* Spine-leaf interconnect fabric placeholder and lab benchmark video embed slot.

3. **Blog 3: Corporate M&A Strategy & VMware Cash Flow Compounding**
   - *Title:* "The Hock Tan Playbook: How VMware's Subscription Overhaul is Engineering 60%+ Operating Margins"
   - *Topics:* Deconstructing the $69B acquisition, elimination of perpetual licenses, SKU consolidation to VMware Cloud Foundation (VCF), and debt deleveraging.
   - *Includes:* Standalone vs. pro-forma margin comparison table and CIO enterprise switching cost podcast placeholder.

4. **Blog 4: Risk Matrix & Bear Case Stress-Testing**
   - *Title:* "Bear Case Stress-Test: Customer Concentration Risks, Apple RF Renewal, and Antitrust Clouds"
   - *Topics:* Apple RF filter dependency (~18.5% of revenue), hyperscaler in-house silicon disintermediation (Google/Meta), EU antitrust complaints, and a $243 bear case.
   - *Includes:* Customer concentration bar chart placeholder and regulatory panel discussion video slot.

---

## 4. UI/UX Decision: "Is It Better if It's Pages or Scroll?"

A core requirement of the university assignment is to decide whether an equity research blog is better designed as **Separate Pages** or a **Continuous Long Scroll**.

### Our Group's Verdict: **Pages (Multi-Page Reader View with a Dashboard Hub) is Far Superior**

Below are the 5 academic UI/UX arguments your group can present to your professor:

1. **Cognitive Load & Scroll Fatigue:**
   - Financial analysis reports are dense, averaging 1,000 to 2,500 words per article with math tables, charts, and valuation models.
   - Stacking 4 full-length reports on a single continuous scroll yields over **6,000 words** and an enormous DOM height. Users experience disorienting "scroll fatigue" and lose their location.
2. **Information Scent & Executive Skimmability:**
   - In finance, readers (portfolio managers, institutional investors) first scan the executive dashboard: *Target Price, Rating, Upside, Catalysts*.
   - A **Page Hub** allows readers to inspect the summary cards first and click into the specific thesis they care about, rather than being forced to scroll linearly through unrelated sections.
3. **Citation, Grading & Deep Linking:**
   - For academic grading, a professor needs to evaluate individual submissions (e.g. *“Grading Group Member A's Bear Case”*).
   - Dedicated pages provide distinct URL hashes (`#post-1`, `#post-2`, `#post-3`, `#post-4`), allowing direct bookmarks and citations.
4. **Media & Performance Optimization:**
   - Multiple embedded video players and interactive charts stacked on one long scroll drag down page load speed, layout shifts, and mobile performance. Dedicated pages isolate media to their respective articles.
5. **Interactive Demo in Prototype:**
   - Our prototype includes a **live layout switcher** in the top navigation (`[ Pages ]` vs `[ Scroll ]`). The user and professor can switch between both modes in real time to experience the ergonomic advantage of Pages firsthand!

---

## 5. How to Customize Videos and Pictures

Every article contains dedicated visual containers with clear visual badges:

### Optional Pictures / Charts
- Look for `<div class="chart-placeholder-box">` in `index.html` or `app.js`.
- Click the interactive **"Expand / Replace Image"** button to preview custom image URLs.
- To permanently use your group's charts, replace the mock SVG/HTML with:
  ```html
  <img src="images/your-chart.png" alt="Revenue Breakdown" class="rounded-lg shadow w-full" />
  ```

### Optional Videos
- Look for `<div class="media-placeholder-box">`.
- Click **"Add/Replace Video URL"** or the red play button to open the interactive modal.
- To embed a real YouTube or presentation video, paste:
  ```html
  <iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
  ```

---

## 6. How to Publish the Website Online (Free & Instant)

When your group finishes drafting, you can publish this prototype to the web in **under 3 minutes** using any of these free zero-config platforms:

### Option A: Netlify Drop (Easiest: Drag & Drop, No Terminal)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire folder `D:\Finance Sheets\broadcom-analyst-blog` directly into your browser window.
3. Netlify will deploy it instantly and provide a live URL (e.g., `https://broadcom-equity-blog.netlify.app`) to submit to your professor!

### Option B: GitHub Pages
1. Create a new GitHub repository called `broadcom-equity-blog`.
2. Push the files in this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Broadcom Analyst Blog prototype"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/broadcom-equity-blog.git
   git push -u origin main
   ```
3. In your GitHub repository, click **Settings > Pages > Source: Deploy from branch (main) > Save**.
4. Your website is live at `https://YOUR_USERNAME.github.io/broadcom-equity-blog/`!

### Option C: Vercel
1. Go to [https://vercel.com](https://vercel.com).
2. Connect your GitHub repository or use `npx vercel` inside this folder.
3. Done in 30 seconds!

---

## 7. How Content Works

Articles are no longer stored inside `app.js`. Each article is one JSON file:

```text
content/articles-html/*.json   (the 5 designed articles, HTML body)
content/articles/*.json        (new articles written in the simple editor)
        |  scripts/build-articles.mjs  (runs on every Netlify deploy)
        v
articles.json  (generated, not committed)  -->  app.js loads it and renders the site
```

Teammates edit content in **Pages CMS** (login required, see `TEAM-GUIDE.md`). Every save is committed to GitHub and Netlify republishes the site. The public website itself has no edit feature.

### Local preview
```bash
node scripts/dev-server.mjs
```
Then open http://localhost:8080 (this rebuilds `articles.json` first). Opening `index.html` directly from disk will not load the articles.

---

## 8. Project File Structure

```text
D:\Finance Sheets\broadcom-analyst-blog\
│
├── index.html            # Main HTML5 single-page app with mobile-responsive layout
├── styles.css            # Broadcom design tokens, responsive tables, text resizer, print styles
├── app.js                # Client routing, rendering, and loading of articles.json
├── content/              # Article files edited through Pages CMS
├── scripts/              # build-articles.mjs (build) and dev-server.mjs (local preview)
├── .pages.yml            # Pages CMS configuration
├── netlify.toml          # Netlify build settings
├── TEAM-GUIDE.md         # One-page guide for teammates
└── README.md             # Project documentation and UX rationale
```

*Prepared by the Student Group Project Team • October 2026*
