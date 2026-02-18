// Script to verify sitemap URLs match actual topic IDs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');
const topicIds = new Set();

// Read all topic files and extract IDs
function readTopicFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      readTopicFiles(filePath);
    } else if (file.endsWith('.js') && file !== 'index.js') {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/id:\s*['"]([^'"]+)['"]/);
        if (match && match[1]) {
          topicIds.add(match[1]);
        }
      } catch (error) {
        console.warn(`Warning: Could not read ${filePath}:`, error.message);
      }
    }
  });
}

// Read sitemap
function verifySitemap() {
  readTopicFiles(dataDir);
  
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  
  // Extract all tutorial URLs from sitemap
  const urlMatches = sitemap.match(/\/tutorial\/([^<]+)</g) || [];
  const sitemapTopicIds = urlMatches.map(url => {
    return url.replace('/tutorial/', '').replace('<', '').trim();
  });
  
  // Find invalid URLs
  const invalidUrls = sitemapTopicIds.filter(id => !topicIds.has(id));
  
  // Find missing topics (topics that exist but aren't in sitemap)
  const missingTopics = Array.from(topicIds).filter(id => !sitemapTopicIds.includes(id));
  
  console.log('='.repeat(60));
  console.log('SITEMAP VERIFICATION REPORT');
  console.log('='.repeat(60));
  console.log(`Total topic IDs in data files: ${topicIds.size}`);
  console.log(`Total tutorial URLs in sitemap: ${sitemapTopicIds.length}`);
  console.log('');
  
  if (invalidUrls.length > 0) {
    console.log(`❌ INVALID URLs found (${invalidUrls.length}):`);
    invalidUrls.forEach(url => console.log(`   - ${url}`));
    console.log('');
  } else {
    console.log('✅ All URLs in sitemap are valid!');
    console.log('');
  }
  
  if (missingTopics.length > 0) {
    console.log(`⚠️  Missing topics (${missingTopics.length} topics not in sitemap):`);
    missingTopics.forEach(topic => console.log(`   - ${topic}`));
    console.log('');
  } else {
    console.log('✅ All topics are included in sitemap!');
    console.log('');
  }
  
  // Check for problematic URLs that were causing 404s
  const problematicUrls = [
    'servlet-architecture',
    'servlet-filter',
    'servlet-listener',
    'jdbc-architecture'
  ];
  
  const foundProblematic = problematicUrls.filter(url => sitemapTopicIds.includes(url));
  
  if (foundProblematic.length > 0) {
    console.log(`❌ PROBLEMATIC URLs still in sitemap (${foundProblematic.length}):`);
    foundProblematic.forEach(url => console.log(`   - ${url}`));
    console.log('');
  } else {
    console.log('✅ No problematic URLs found in sitemap!');
    console.log('');
  }
  
  // Verify redirects exist
  const appJsPath = path.join(__dirname, '..', 'src', 'App.jsx');
  const appJs = fs.readFileSync(appJsPath, 'utf8');
  
  const hasRedirects = problematicUrls.every(url => {
    return appJs.includes(`tutorial/${url}`) && appJs.includes('Navigate');
  });
  
  if (hasRedirects) {
    console.log('✅ Redirects are properly configured in App.jsx');
  } else {
    console.log('⚠️  Some redirects may be missing in App.jsx');
  }
  
  console.log('='.repeat(60));
  
  // Exit with error code if issues found
  if (invalidUrls.length > 0 || foundProblematic.length > 0) {
    process.exit(1);
  }
}

verifySitemap();

