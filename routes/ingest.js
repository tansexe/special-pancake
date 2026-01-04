const express = require('express');
const Parser = require('rss-parser');
const Article = require('../models/article');
const feeds = require('../config/feed');

const router = express.Router();
const parser = new Parser();

const normalize = (text) =>
  text.toLowerCase().replace(/[^\w\s]/g, '').trim();

router.post('/rss', async (req, res) => {
  let inserted = 0;

  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed.url);

      for (const item of parsed.items) {
        try {
          await Article.create({
            title: item.title,
            normalizedTitle: normalize(item.title),
            link: item.link,
            source: feed.source,
            bias: feed.bias,
            publishedAt: item.pubDate,
            guid: item.guid || item.link
          });
          inserted++;
        } catch (err) {
          // duplicate entry ignored
        }
      }
    } catch (err) {
      console.error(`Feed error: ${feed.source}`, err.message);
    }
  }

  res.json({ message: "RSS ingestion complete", inserted });
});

module.exports = router;
