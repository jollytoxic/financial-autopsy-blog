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

## What is published
1. Welcome to The Financial Autopsy
2. Broadcom (NASDAQ: AVGO): Anatomy of a Growth Machine (5 figures in the Media tab)
3. Follow the Cash: What September and October Revealed About Broadcom's AI Growth

Four older draft posts (Initiation, AI Networking, VMware, Bear Case) are hidden, not deleted. They are the entries whose file names start with `archive-`. They still contain amber **PLACEHOLDER, VERIFY** claims, so verify those before ticking **Published** on any of them.

## Before submission: missing reference lists
Posts 2 and 3 now end with a **References** section where every entry is an amber placeholder describing the source that is needed. Replace each placeholder with the full reference (author, date, title, URL), then delete the `<span class="placeholder-claim" ...>` and `</span>` around it.

## Publishing (site owner only)
1. On GitHub, open https://github.com/jollytoxic/financial-autopsy-blog/compare/main...drafts
2. Click **Create pull request**, then **Merge pull request**.
3. The real site updates in about 1 minute. Each publish uses 15 of the 300 monthly Netlify credits, so publish once a day at most.

## If something goes wrong
- If the preview didn't update after 2 minutes, tell the site owner. The live site keeps the last working version, so nothing breaks for readers.
- Don't edit the same article at the same time as a teammate.
- Never paste passwords or personal information into articles.
