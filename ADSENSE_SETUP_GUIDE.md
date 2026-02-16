# AdSense Setup Guide - Getting Real Ad Slot IDs

## Problem: Placeholder Ad Slots

The current AdSense configuration uses **placeholder ad slot IDs** (1111111111, 2222222222, etc.). These are not real AdSense ad units, which causes the error:

```
AdSense error: TagError: adsbygoogle.push() error: No slot size for availableWidth=0
```

## Solution: Get Real Ad Slot IDs from Google AdSense

### Step 1: Create Ad Units in AdSense Dashboard

1. Go to [Google AdSense Dashboard](https://www.google.com/adsense/)
2. Click on **"Ads"** in the left sidebar
3. Click **"By ad unit"** tab
4. Click **"+ New ad unit"** button

### Step 2: Create Ad Units for Each Location

You need to create **5 ad units** for different locations:

#### 1. Top Banner Ad
- **Name:** `Top Banner Ad`
- **Type:** Display ad
- **Size:** Responsive (or 728x90 Leaderboard)
- **Copy the Ad Unit ID** (looks like: `1234567890`)

#### 2. Sidebar Ad
- **Name:** `Sidebar Ad`
- **Type:** Display ad
- **Size:** Responsive (or 300x250 Medium Rectangle)
- **Copy the Ad Unit ID**

#### 3. Bottom Banner Ad
- **Name:** `Bottom Banner Ad`
- **Type:** Display ad
- **Size:** Responsive (or 728x90 Leaderboard)
- **Copy the Ad Unit ID**

#### 4. In-Content Top Ad
- **Name:** `In-Content Top Ad`
- **Type:** Display ad
- **Size:** Responsive
- **Copy the Ad Unit ID**

#### 5. In-Content Bottom Ad
- **Name:** `In-Content Bottom Ad`
- **Type:** Display ad
- **Size:** Responsive
- **Copy the Ad Unit ID**

### Step 3: Update Configuration File

Open `src/config/adsense.js` and replace the placeholder values:

```javascript
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-2176490979231754', // ✅ Already correct
  
  adSlots: {
    topBanner: 'YOUR_TOP_BANNER_SLOT_ID',        // Replace 2222222222
    sidebar: 'YOUR_SIDEBAR_SLOT_ID',             // Replace 1111111111
    bottomBanner: 'YOUR_BOTTOM_BANNER_SLOT_ID',  // Replace 3333333333
    inContentTop: 'YOUR_IN_CONTENT_TOP_SLOT_ID', // Replace 4444444444
    inContentBottom: 'YOUR_IN_CONTENT_BOTTOM_SLOT_ID', // Replace 5555555555
    homePage: 'YOUR_HOME_PAGE_SLOT_ID'          // Replace 6666666666 (optional)
  }
};
```

### Step 4: Verify Ad Slot IDs

Ad Slot IDs should:
- ✅ Be **numeric only** (e.g., `1234567890`)
- ✅ Be **8-12 digits long**
- ✅ **NOT** be placeholder values (1111111111, 2222222222, etc.)

### Step 5: Test After Update

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to production**

3. **Check browser console** - errors should be gone

4. **Verify ads are showing** in AdSense dashboard

## Current Status

✅ **Publisher ID:** Already configured (`ca-pub-2176490979231754`)  
❌ **Ad Slots:** Using placeholders - **NEED TO UPDATE**

## Error Prevention

The code now includes validation that:
- ✅ Prevents loading ads with placeholder slot IDs
- ✅ Validates slot ID format before loading
- ✅ Only loads ads when containers are visible and have width

**Until you add real ad slot IDs, ads will not load (which prevents errors).**

## Quick Reference: Where to Find Ad Unit IDs

1. **AdSense Dashboard** → **Ads** → **By ad unit**
2. Click on an ad unit
3. Look for **"Ad unit ID"** or **"Slot ID"**
4. Copy the numeric ID (e.g., `1234567890`)

## Important Notes

- ⚠️ **Don't use placeholder IDs** - they cause errors
- ⚠️ **Wait for AdSense approval** - ads won't show until approved
- ⚠️ **One ad unit per location** - don't reuse the same slot ID
- ✅ **Responsive ads work best** - they adapt to container size

---

**After updating with real ad slot IDs, the errors will stop and ads will start loading!**

