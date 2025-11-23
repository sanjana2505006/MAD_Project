# Coding Practice Dashboard

A modern, dark-themed web dashboard for practicing coding problems. Built with React and featuring a sleek, distraction-free interface for focused learning.

## Features

✨ **Dashboard Overview**
- Real-time statistics tracking (total solved, streaks, avg time, acceptance rate)
- Recent activity feed showing latest problem attempts
- Quick statistics summary

🔤 **Problems Section**
- Browse and filter problems by difficulty and status
- Categorized by topic (Arrays, Strings, Dynamic Programming, Algorithms)
- Search and filter capabilities
- Difficulty indicators (Easy, Medium, Hard)

📊 **Progress Tracking**
- Weekly activity chart
- Category-wise performance metrics
- Progress bars and statistics
- Detailed metrics table

💬 **Community Forum**
- Discuss coding problems with other users
- View community threads and replies
- Like and engage with discussions

## Tech Stack

- **Frontend Framework**: React 18
- **Icons**: Lucide React
- **Styling**: CSS3 with CSS Variables (Dark Theme)
- **Build Tool**: Create React App

## Installation

1. Navigate to the dashboard folder:
```bash
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The dashboard will open at `http://localhost:3000`

## Project Structure

```
dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MainContent.jsx
│   │   ├── StatCard.jsx
│   │   └── ProblemCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Problems.jsx
│   │   ├── Progress.jsx
│   │   └── Forum.jsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   └── pages.css
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## Customization

### Color Theme

The dashboard uses CSS variables for theming. Edit `src/styles/index.css` to customize colors:

```css
:root {
  --bg-primary: #0f172a;      /* Main background */
  --bg-secondary: #1e293b;    /* Secondary background */
  --bg-tertiary: #334155;     /* Tertiary background */
  --text-primary: #f1f5f9;    /* Primary text */
  --text-secondary: #cbd5e1;  /* Secondary text */
  --accent-blue: #3b82f6;     /* Accent color */
  /* ... more colors */
}
```

### Adding New Pages

1. Create a new file in `src/pages/`
2. Import it in `src/components/MainContent.jsx`
3. Add a new case in the `renderPage()` function
4. Add navigation item in `src/components/Sidebar.jsx`

## Future Enhancements

- [ ] API integration for real problems database
- [ ] User authentication and profiles
- [ ] Real-time code editor integration
- [ ] Solution submissions and evaluation
- [ ] Leaderboards and achievements
- [ ] Dark/Light theme toggle
- [ ] Mobile app integration
- [ ] WebSocket for live notifications

## License

This project is part of the MAD Project. See the main repository for licensing details.

## Support

For issues or suggestions, please refer to the main MAD Project repository.
