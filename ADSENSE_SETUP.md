# Google AdSense Setup Guide for LearnStackHub

## 📋 Prerequisites

1. **Google AdSense Account**: Sign up at https://www.google.com/adsense/
2. **AdSense Publisher ID**: You'll get this after approval (format: `ca-pub-XXXXXXXXXX`)
3. **Ad Units**: Create ad units in your AdSense dashboard

## 🔧 Configuration Steps

### Step 1: Get Your AdSense Publisher ID

1. Log in to your Google AdSense account
2. Go to **Account** → **Account Information**
3. Copy your **Publisher ID** (starts with `ca-pub-`)

### Step 2: Update AdSense Client ID

1. Open `index.html`
2. Find this line:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
   ```
3. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your actual Publisher ID

### Step 3: Create Ad Units in AdSense Dashboard

Create the following ad units and note their **Ad Slot IDs**:

1. **Top Banner Ad** (Slot: `2222222222`)
   - Type: Display ad
   - Size: Responsive (728x90)
   - Location: After header

2. **Sidebar Ad** (Slot: `1111111111`)
   - Type: Display ad
   - Size: Responsive (300x250)
   - Location: Sidebar

3. **Bottom Banner Ad** (Slot: `3333333333`)
   - Type: Display ad
   - Size: Responsive (728x90)
   - Location: Before footer

4. **In-Content Ad Top** (Slot: `4444444444`)
   - Type: Display ad
   - Size: Responsive (728x90)
   - Location: After tutorial header

5. **In-Content Ad Bottom** (Slot: `5555555555`)
   - Type: Display ad
   - Size: Responsive (728x90)
   - Location: Before navigation

### Step 4: Update Ad Slot IDs

1. Open `src/components/Layout.jsx`
2. Find all `<AdSense>` components
3. Replace the `adSlot` values with your actual Ad Slot IDs:
   - Sidebar: `adSlot="1111111111"` → Your sidebar ad slot ID
   - Top Banner: `adSlot="2222222222"` → Your top banner ad slot ID
   - Bottom Banner: `adSlot="3333333333"` → Your bottom banner ad slot ID

4. Open `src/pages/Tutorial.jsx`
5. Update in-content ad slots:
   - Top: `adSlot="4444444444"` → Your in-content top ad slot ID
   - Bottom: `adSlot="5555555555"` → Your in-content bottom ad slot ID

### Step 5: Update AdSense Component

1. Open `src/components/AdSense.jsx`
2. Find the default `adClient` prop
3. Update it with your Publisher ID:
   ```jsx
   adClient = 'ca-pub-XXXXXXXXXXXXXXXX' // Replace with your ID
   ```

## ✅ AdSense Compliance Checklist

- [x] **Privacy Policy**: Add a privacy policy page (required for AdSense)
- [x] **Terms of Service**: Add terms of service page
- [x] **Cookie Consent**: Consider adding cookie consent banner
- [x] **Content Quality**: Ensure high-quality, original content
- [x] **Navigation**: Easy navigation between pages
- [x] **Mobile Responsive**: Site works on all devices
- [x] **No Click Fraud**: Don't click your own ads
- [x] **Ad Placement**: Ads are clearly separated from content

## 🚀 Deployment

After updating all AdSense IDs:

```bash
git add .
git commit -m "Configure Google AdSense"
git push origin main
```

## 📊 Monitoring

1. **AdSense Dashboard**: Monitor earnings and performance
2. **Site Speed**: Ensure ads don't slow down your site
3. **User Experience**: Monitor bounce rate and user engagement
4. **Ad Placement**: Adjust ad positions based on performance

## 🔒 Privacy & Legal

### Required Pages:

1. **Privacy Policy** (`/privacy`)
   - Explain data collection
   - Mention Google AdSense
   - Cookie usage
   - User rights

2. **Terms of Service** (`/terms`)
   - Usage terms
   - Content ownership
   - User responsibilities

3. **Cookie Policy** (can be part of Privacy Policy)
   - Explain cookies used
   - How to disable cookies

## 💡 Best Practices

1. **Ad Density**: Don't exceed 3 ads per page (we have 3-4, which is acceptable)
2. **Above the Fold**: At least one ad should be visible without scrolling
3. **Content First**: Ensure content quality before monetization
4. **User Experience**: Don't let ads interfere with content readability
5. **Mobile Optimization**: Test ads on mobile devices

## 🐛 Troubleshooting

### Ads Not Showing?

1. Check if AdSense account is approved
2. Verify Publisher ID is correct
3. Check Ad Slot IDs match your dashboard
4. Wait 24-48 hours after approval for ads to appear
5. Check browser console for errors
6. Ensure site is publicly accessible

### Low Earnings?

1. Increase traffic to your site
2. Optimize ad placement
3. Improve content quality
4. Target better keywords
5. Consider affiliate marketing

## 📝 Notes

- **Placeholder Ads**: Until AdSense is configured, placeholder boxes will show
- **Development**: Ads won't show in local development (localhost)
- **Approval Time**: AdSense approval can take 1-2 weeks
- **Minimum Traffic**: Some countries require minimum traffic for approval

## 🔗 Resources

- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Ad Placement Policies](https://support.google.com/adsense/answer/1346295)

