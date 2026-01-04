# Special Pancake

A Node.js application for collecting and aggregating news articles from multiple RSS feeds across different political biases. Perfect for analyzing news coverage from various perspectives.

## Features

- 📰 Fetches articles from multiple news sources via RSS feeds
- 🎯 Categorizes sources by political bias (Left, Center, Right)
- 🔄 Prevents duplicate articles using unique link tracking
- 📊 Stores articles in MongoDB for easy querying
- 🚀 RESTful API for programmatic access

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **RSS Parser** for feed ingestion
- **dotenv** for environment configuration
- **Jade** templating engine

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd special-pancake
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/special-pancake
   PORT=3000
   ```

4. **Start MongoDB**

   Make sure MongoDB is running locally or use MongoDB Atlas connection string.

## Usage

### Start the Server

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:3000`

### API Endpoints

#### Ingest RSS Feeds

```http
POST http://localhost:3000/api/ingest/rss
```

Fetches articles from all configured RSS feeds and stores them in the database.

**Response:**

```json
{
  "message": "RSS ingestion complete",
  "inserted": 127
}
```

## Configure News Sources

Edit [config/feed.js](config/feed.js) to add or modify RSS feeds:

```javascript
module.exports = [
  {
    source: "BBC News",
    bias: "Center",
    url: "http://feeds.bbci.co.uk/news/rss.xml",
  },
  // Add more feeds...
];
```

### Current Sources

- **Center**: BBC News, Associated Press, NPR
- **Left**: The Guardian, Huffington Post
- **Right**: Fox News, Wall Street Journal

## Database Schema

### Article Model

```javascript
{
  title: String,              // Article headline
  normalizedTitle: String,    // Lowercase, no special chars
  link: String,               // Unique URL
  source: String,             // News outlet name
  bias: String,               // Left, Center, or Right
  publishedAt: Date,          // Publication date
  guid: String,               // RSS feed identifier
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

## Testing with Postman

1. Start the server: `npm start`
2. Open Postman
3. Create a POST request to `http://localhost:3000/api/ingest/rss`
4. Click Send
5. Check the response for number of articles inserted

## Project Structure

```
special-pancake/
├── bin/
│   └── www              # Server entry point
├── config/
│   ├── db.js            # MongoDB connection
│   └── feed.js          # RSS feed configuration
├── models/
│   └── Article.js       # Article schema
├── routes/
│   ├── index.js         # Home routes
│   ├── ingest.js        # RSS ingestion routes
│   └── users.js         # User routes
├── views/               # Jade templates
├── public/              # Static assets
├── app.js               # Express app configuration
├── package.json         # Dependencies
└── .env                 # Environment variables (create this)
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Module Not Found Errors

If you see errors about missing modules, install them:

```bash
npm install
```

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check your `DB_URL` in `.env`
- For Atlas, ensure your IP is whitelisted

### RSS Feed Errors

Some feeds may be temporarily unavailable or block requests. The application will log these errors but continue processing other feeds.

---

Built with ❤️ for news aggregation and analysis
