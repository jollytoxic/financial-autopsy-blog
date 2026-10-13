# Team Guide: Editing "The Financial Autopsy"

## Where to edit
Open the editor here: **https://app.pagescms.org/jollytoxic/financial-autopsy-blog/drafts**

Sign in with GitHub, or use the email invite you were sent. Only invited people can see the editor. The public website has no edit button.

**Always work on the `drafts` branch** (the link above opens it). The branch name is shown under the project name in the top left of Pages CMS. Don't switch it to `main`.

## Seeing your changes
After you click **Save**, your change appears on the preview site in about 1 minute:
**https://drafts--fn205gba01.netlify.app**

The real site (https://fn205gba01.netlify.app) only updates when the site owner publishes the drafts. This keeps us inside Netlify's free monthly limit. If we used it up, the whole site would go offline until November.

## Editing an existing article
Use the collection **Articles (designed)**.

- Open the article. The body is HTML. **Only change the words between `>` and `<`.**
- Don't delete lines that start with `<div`, `</div>`, `<table`, `</table>` and similar. They draw the coloured boxes, tables and charts.
- Click **Save**.

## Writing a new article
Use the collection **New articles (simple editor)**.

1. Click **Add an entry**.
2. Fill in the title, summary, date and order (6, 7, ...).
3. Write the body like in Word.
4. Click **Save**.

## Hiding an article without deleting it
Untick **Published** and Save. Tick it again to bring the article back.

## Images
Upload with the **Media** tab, then insert the image in the body.

## Prices and valuation (as of 13 Oct 2026)
All prices, targets and multiples were updated from Yahoo Finance on 13 Oct 2026:
- Price $356.26, 12-month target $540 (+51.6%), bear case $243 (-31.8%).
- Target = 50/50 blend of a DCF ($537) and 28x FY2027 consensus EPS of $19.39 ($543). Details are in the Initiation memo, section 3.

If you refresh the prices, update the **Current price** and **Price date** fields in every article, plus the numbers in the memo text.

## Placeholders to verify (amber highlight)
Some claims could not be checked against a source. They are shown on the site with an amber highlight and a **PLACEHOLDER, VERIFY** label, so readers know they are not confirmed yet. These are placeholders for the team to fill in, not checked facts.

| Article | Placeholder |
|---|---|
| Initiation memo | ASIC run-rate "exceeding $14B+"; software gross margins "north of 74%"; "over 80% of Fortune 500 enterprises" |
| AI Networking | GPUs idle "up to 35% of compute cycles"; power cut "by over 30%"; networking revenue "+43% year-over-year"; networking margins "above 75%" |
| VMware Model | operating margins 28.4% / 48.2% / 62.0%+; "$12B+ EBITDA"; net debt "peaked near $73 billion"; "target 2.5x gross debt-to-EBITDA" |
| Bear Case | customers "over 35%" of revenue; Apple "roughly 20%"; Apple ~18.5%, Hyperscaler A ~11.0%, Hyperscaler B ~7.5%, top 3 ~37%; AI growth "from 30%+" |
| Top ticker bar | VMware ARR run-rate $12.4B (ask the site owner, it's in `index.html`) |

**To fix one:** in the article body, find the text inside
`<span class="placeholder-claim" title="...">THE CLAIM</span>`.
Replace THE CLAIM with the verified figure, then delete the opening `<span ...>` and the closing `</span>` around it. The highlight disappears. Keep a note of your source.

## Publishing (site owner only)
1. On GitHub, open https://github.com/jollytoxic/financial-autopsy-blog/compare/main...drafts
2. Click **Create pull request**, then **Merge pull request**.
3. The real site updates in about 1 minute. Each publish uses 15 of the 300 monthly Netlify credits, so publish once a day at most.

## If something goes wrong
- If the preview didn't update after 2 minutes, tell the site owner. The live site keeps the last working version, so nothing breaks for readers.
- Don't edit the same article at the same time as a teammate.
- Never paste passwords or personal information into articles.
