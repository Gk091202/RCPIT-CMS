# 🚀 Deploy to Vercel - Complete Guide

## ✅ Preparation Done

Your code is ready for deployment with:

- ✅ Dynamic PORT for hosting
- ✅ Smart API URL detection
- ✅ Node.js 22.x specified

---

## 📤 STEP 1: Push to GitHub

Run these commands:

```bash
git push -u origin main
```

If this is your **first push**, add the remote first:

```bash
git remote add origin https://github.com/Gk091202/RCPIT-CMS.git
git push -u origin main
```

**If asked for credentials:**

- Username: `Gk091202`
- Password: Your **Personal Access Token** (not password)
  - Create at: https://github.com/settings/tokens/new
  - Select scopes: `repo`

---

## 🚂 STEP 2: Deploy Backend to Railway (5 minutes)

**Why Railway?** Your app needs a backend server to run Node.js and store data in SQL database.

### 2.1 Sign Up & Connect

1. Go to: **https://railway.app**
2. Click: **"Login with GitHub"**
3. Authorize Railway

### 2.2 Deploy from GitHub

1. Click: **"New Project"**
2. Select: **"Deploy from GitHub repo"**
3. Choose: **`RCPIT-CMS`** repository
4. Railway auto-detects Node.js and deploys (2-3 minutes)

### 2.3 Get Your Backend URL

1. Click on your project
2. Go to: **Settings** → **Networking** → **Public Networking**
3. Click: **"Generate Domain"**
4. **Copy this URL** (example: `https://rcpit-cms-production-abc123.up.railway.app`)

### 2.4 Test Your Backend

Open in browser: `https://your-railway-url.railway.app/api/events`

You should see: `[]` (empty array) ✅

---

## 🔧 STEP 3: Update Your Code with Railway URL

Open `index.js` and find line 6-7. Replace:

```javascript
: 'https://YOUR-RAILWAY-URL.railway.app/api';
```

With your actual Railway URL:

```javascript
: 'https://rcpit-cms-production-abc123.railway.app/api';
```

**Then commit and push:**

```bash
git add index.js
git commit -m "Update Railway backend URL"
git push
```

---

## 🌐 STEP 4: Deploy Frontend to Vercel (3 minutes)

### 4.1 Sign Up

1. Go to: **https://vercel.com**
2. Click: **"Sign Up"**
3. Choose: **"Continue with GitHub"**
4. Authorize Vercel

### 4.2 Import Your Repository

1. Click: **"Add New"** → **"Project"**
2. Click: **"Import Git Repository"**
3. Find and select: **`RCPIT-CMS`**
4. Click: **"Import"**

### 4.3 Configure Project

- **Project Name:** `rcpit-cms` (or any name)
- **Framework Preset:** Other
- **Root Directory:** `./`
- **Build Command:** Leave empty
- **Output Directory:** Leave empty
- Click: **"Deploy"**

### 4.4 Wait for Deployment

Vercel will deploy in 1-2 minutes. You'll see a progress bar.

---

## 🎉 STEP 5: Your Website is LIVE!

### You'll get a URL like:

```
https://rcpit-cms.vercel.app
```

### Test Your Live Website:

1. **Open the URL** in your browser
2. **Click "Student Login"** → **"Sign Up Here"**
3. **Create a test account**
4. **Login and browse**
5. **Try admin login:**
   - Username: `admin`
   - Password: `admin123`

---

## 🔄 Making Updates Later

Whenever you make changes:

```bash
git add .
git commit -m "Your update message"
git push
```

**Both Railway and Vercel will auto-deploy!** 🚀

---

## 🆘 Troubleshooting

### "Cannot connect to backend"

- ✅ Check Railway is running: Go to Railway dashboard
- ✅ Verify Railway URL in `index.js` line 7
- ✅ Check Railway logs for errors

### "Database not working"

- Railway creates database automatically
- Check Railway logs: Dashboard → View Logs
- Restart service if needed

### "Vercel deployment failed"

- Check Vercel logs in dashboard
- Usually auto-fixes on retry
- Push again: `git commit --allow-empty -m "retry" && git push`

### "GitHub authentication failed"

- Use Personal Access Token, not password
- Create at: https://github.com/settings/tokens/new
- Give it `repo` permission

---

## 💰 Cost

- **Railway:** $5 free credit/month (enough for small sites)
- **Vercel:** FREE forever for personal projects
- **Total:** $0 for hobby use! 🎉

---

## 📱 Share Your Website

After deployment, share your Vercel URL with:

- Students → Register and join clubs
- Faculty → Monitor activities
- Administration → Track events

Example: `https://rcpit-cms.vercel.app`

---

## ✨ Your Deployment URLs

**Frontend (Vercel):**

```
https://rcpit-cms.vercel.app
(or your custom domain)
```

**Backend (Railway):**

```
https://your-app.railway.app
(API endpoints)
```

**GitHub Repository:**

```
https://github.com/Gk091202/RCPIT-CMS
```

---

## 🎯 Quick Checklist

- [ ] Push code to GitHub
- [ ] Deploy backend to Railway
- [ ] Copy Railway URL
- [ ] Update `index.js` with Railway URL
- [ ] Push updated code
- [ ] Deploy frontend to Vercel
- [ ] Test live website
- [ ] Share URL with students!

**Ready? Start with STEP 1!** 🚀
