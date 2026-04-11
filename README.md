# 🚀 Deploying to Netlify - Quick Guide

## Option 1: Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop this folder onto the Netlify dashboard
3. Done! Your site will be live instantly

## Option 2: GitHub Deployment (Recommended for updates)
1. Push this folder to a GitHub repository
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Deploy settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.`
6. Click "Deploy site"

---

## 📝 Setting Up Contact Form (Formspree)

### Get Your Free Formspree Form ID:
1. Go to [formspree.io](https://formspree.io)
2. Sign up (free tier: 50 submissions/month)
3. Create a new form
4. Copy your Form ID (e.g., `xwkgjoan`)

### Add Your Form ID:
Edit `contact.html` and replace `YOUR_FORM_ID`:
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 🔧 Custom Domain (Optional)
1. In Netlify dashboard → Domain settings
2. Add custom domain
3. Configure DNS as instructed

---

## 📁 Updating Your Portfolio

### To Update Content:
Edit `data/portfolio.json`:
```json
{
  "name": "Your Name",
  "projects": [...],
  "skills": {...}
}
```

### To Add Projects:
Add to the `projects` array in `portfolio.json`:
```json
{
  "title": "New Project",
  "description": "Description here",
  "category": "Web Development",
  "tech": "Django • React",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://..."
}
```

### To Update Skills:
Modify the `skills` object in `portfolio.json`:
```json
"skills": {
  "Frontend": [
    { "name": "New Skill", "icon": "fab fa-icon", "proficiency": 85 }
  ]
}
```

---

## 🎨 Tech Stack
- **CSS Framework:** Custom CSS (copied from original Django project)
- **3D Effects:** Three.js
- **Animations:** GSAP + CSS animations
- **Data:** JSON file (easy to edit)
- **Contact Form:** Formspree (free tier)

---

## ⚡ Quick Tips
- All images go in `/images/` folder
- CSS customizations in `/css/style.css`
- JS customizations in `/js/main.js`
- No build step required - pure HTML/CSS/JS!

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com
- Formspree Docs: https://formspree.io/docs
