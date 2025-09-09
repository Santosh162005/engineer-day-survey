# Engineer Day Event Ideas Survey Website

A responsive survey website for collecting creative event ideas for Engineer Day celebrations.

## Features

- 📝 Comprehensive survey form with validation
- 📱 Responsive design for all devices  
- 💾 Local storage for submissions (no backend needed)
- ✨ Modern, professional UI
- 🎯 Specific fields for engineering events

## How to Host Live for FREE

### Option 1: GitHub Pages (Recommended)

1. **Create GitHub Repository:**
   - Go to [GitHub.com](https://github.com) and sign up/login
   - Click "New Repository"
   - Name: `engineer-day-survey`
   - Make it Public
   - Don't initialize with README (we already have files)

2. **Upload Files:**
   - Click "uploading an existing file"
   - Drag and drop: `index.html`, `style.css`, `script.js`
   - Commit files

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save

4. **Access Your Live Site:**
   - URL: `https://yourusername.github.io/engineer-day-survey`
   - Takes 5-10 minutes to go live

### Option 2: Netlify

1. **Go to [Netlify.com](https://netlify.com)**
2. **Sign up/Login**
3. **Drag & Drop Deploy:**
   - Drag the entire survey folder to Netlify
   - Get instant live URL like: `https://random-name.netlify.app`

### Option 3: Vercel

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Import Project:**
   - Connect your GitHub repository
   - Deploy automatically

## Local Testing

Open `index.html` in your browser to test locally before hosting.

## Data Collection

- Submissions are stored in browser's localStorage
- To view submissions, open browser console and run: `viewSubmissions()`
- For production, consider integrating with Google Forms or similar

## Customization

- Edit `style.css` for different colors/styling
- Modify `index.html` to add/remove form fields
- Update `script.js` for different validation rules

## Admin Features

- View all submissions: Open console and type `viewSubmissions()`
- Export data: Copy from localStorage and paste into spreadsheet

## Browser Support

Works on all modern browsers including Chrome, Firefox, Safari, Edge.

---

Your survey website is ready to collect amazing Engineer Day event ideas! 🚀
