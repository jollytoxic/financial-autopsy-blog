// Combines content/articles-html/*.json and content/articles/*.json into articles.json for the site.
// Runs on every Netlify deploy. If any file is invalid, the build fails and the previous live site stays up.
import fs from "node:fs";
import path from "node:path";

const DIRS = ["content/articles-html", "content/articles"];
const articles = [];

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".json"))) {
    const full = path.join(dir, file);
    let d;
    try {
      d = JSON.parse(fs.readFileSync(full, "utf8"));
    } catch (e) {
      throw new Error(`Invalid JSON in ${full}: ${e.message}`);
    }
    if (d.published === false) continue;

    const base = path.basename(file, ".json").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    articles.push({
      id: d.id || (base.startsWith("post-") ? base : "post-" + base),
      order: typeof d.order === "number" ? d.order : 999,
      slug: d.slug || base,
      title: d.title || "Untitled",
      subtitle: d.subtitle || "",
      summary: d.summary || "",
      category: d.category || "Research",
      tag: d.tag || "Research",
      tagColor: d.tagColor || "bg-slate-100 text-slate-800 border-slate-200",
      date: d.date || "",
      readingTime: d.readingTime || "",
      author: {
        name: d.authorName || "Julian Lim, CFA",
        role: d.authorRole || "Senior Investment Analyst",
        avatar: d.authorAvatar || "JL"
      },
      ticker: d.ticker || "AVGO",
      rating: d.rating || "",
      targetPrice: d.targetPrice || "",
      currentPrice: d.currentPrice || "",
      priceDate: d.priceDate || "",
      upside: d.upside || "",
      horizon: d.horizon || "",
      content: d.content || ""
    });
  }
}

articles.sort((a, b) => a.order - b.order);

const seen = new Set();
for (const a of articles) {
  if (seen.has(a.id)) throw new Error(`Duplicate article id "${a.id}". Give each article a unique id.`);
  seen.add(a.id);
}

fs.writeFileSync("articles.json", JSON.stringify(articles), "utf8");
console.log(`Built articles.json with ${articles.length} articles`);
