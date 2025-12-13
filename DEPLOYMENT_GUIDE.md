# 🚀 Deployment Guide - Hospital Management System

## 📋 Current Deployment Setup

### Live URLs
- **Frontend (Netlify)**: https://jeeh.netlify.app
- **Backend (Render.com)**: https://hospital-backend-g8un.onrender.com
- **Database**: MongoDB Atlas (Cloud)
- **GitHub Repository**: https://github.com/Jee8825/hos_web.git

---

## ⚠️ CRITICAL: After ANY Code Changes

### 🔴 BACKEND Changes (Hos_backend folder)

**Step 1: Commit to GitHub**
```bash
cd /Users/Jee/College/II\ Year/MERN_Intern/Project/react_vite
git add Hos_backend/
git commit -m "Description of backend changes"
git push origin main
```

**Step 2: Deploy to Render.com**
1. Go to https://dashboard.render.com
2. Click on your service: **hospital-backend-g8un**
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait for deployment to complete (check logs)

---

### 🔵 FRONTEND Changes (Hos_web folder)

**Step 1: Commit to GitHub**
```bash
cd /Users/Jee/College/II\ Year/MERN_Intern/Project/react_vite
git add Hos_web/
git commit -m "Description of frontend changes"
git push origin main
```

**Step 2: Build for Production**
```bash
cd Hos_web
npm run build
```

**Step 3: Deploy to Netlify**
1. Go to https://app.netlify.com
2. Find your site: **jeeh.netlify.app**
3. Drag and drop the **`dist`** folder to deploy
4. Wait for deployment to complete

---

## 🔧 Environment Variables

### Backend (.env on Render.com)
```
MONGO_URI=mongodb+srv://jeeva_db:jeeva%40007@cluster0.7jwugwh.mongodb.net/hospital_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://jeeh.netlify.app
```

### Frontend (.env.production)
```
VITE_API_URL=https://hospital-backend-g8un.onrender.com/api
```

---

## 🛠️ Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Verify `FRONTEND_URL` in Render.com Environment tab is exactly: `https://jeeh.netlify.app`

### Issue: MongoDB Connection Failed
**Solution**: 
1. Go to MongoDB Atlas → Network Access
2. Ensure `0.0.0.0/0` is whitelisted (Allow access from anywhere)

### Issue: Frontend Not Connecting to Backend
**Solution**: 
1. Rebuild frontend: `npm run build`
2. Redeploy `dist` folder to Netlify
3. Check `.env.production` has correct backend URL

### Issue: Backend Not Starting on Render
**Solution**: Check Render logs for errors, verify all environment variables are set

---

## 📝 Deployment Checklist

### Before Making Changes
- [ ] Pull latest code: `git pull origin main`
- [ ] Test locally (Backend: `npm start`, Frontend: `npm run dev`)

### After Backend Changes
- [ ] Commit to GitHub
- [ ] Deploy to Render.com (Manual Deploy)
- [ ] Check Render logs for successful deployment
- [ ] Test API endpoints

### After Frontend Changes
- [ ] Commit to GitHub
- [ ] Run `npm run build`
- [ ] Deploy `dist` folder to Netlify
- [ ] Test live site

### After Both Changes
- [ ] Test full application flow
- [ ] Verify real-time updates work
- [ ] Check admin dashboard
- [ ] Test appointment booking
- [ ] Verify contact form submission

---

## 🎯 Quick Commands Reference

### Git Commands
```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

### Frontend Commands
```bash
cd Hos_web

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Commands
```bash
cd Hos_backend

# Install dependencies
npm install

# Run development server
npm start

# Run with nodemon (auto-restart)
npm run dev
```

---

## 🔐 Important Notes

1. **Never commit `.env` files** - They are in `.gitignore`
2. **Always test locally** before deploying
3. **Backend auto-deploys** can be enabled on Render (Settings → Auto-Deploy)
4. **Netlify auto-deploys** can be enabled by connecting GitHub repo
5. **MongoDB Atlas** - Keep IP whitelist updated
6. **Render free tier** - Backend may sleep after 15 min inactivity (first request takes ~30s)

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/
- **GitHub Repo**: https://github.com/Jee8825/hos_web.git

---

## 🎉 Success Indicators

✅ Backend logs show: "✅ Connected to MongoDB Atlas"
✅ Frontend loads without console errors
✅ Socket.io shows: "✅ Socket connected"
✅ Admin dashboard displays real-time data
✅ All CRUD operations work
✅ Real-time updates reflect across pages

---

**Last Updated**: December 2024
**Maintained By**: Jee
