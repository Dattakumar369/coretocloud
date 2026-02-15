import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllTopics, getTopicById } from '../data';
import { generateSEOTitle, generateSEODescription, generateSEOKeywords } from '../utils/seoHelpers';

function SEOHead({ title, description, keywords, topicId }) {
  const location = useLocation();
  const baseUrl = 'https://learnstackhub.com';
  
  useEffect(() => {
    // Get topic data if topicId is provided
    let pageTitle = title || 'LearnStackHub - Master Java Full Stack Development';
    let pageDescription = description || 'LearnStackHub: Your complete journey from Core Java fundamentals to cloud-ready full-stack development. Learn Java, Servlets, JSP, JDBC, Hibernate, MySQL with interactive tutorials and live code execution.';
    let pageKeywords = keywords || 'Java, Java Tutorial, Spring Boot, React, Full Stack, Programming, Learn Java, JDBC, Servlets, JSP, Hibernate, MySQL';
    let pageUrl = baseUrl + location.pathname;
    let pageImage = baseUrl + '/LSH.png';

    if (topicId) {
      const topic = getTopicById(topicId);
      if (topic) {
        // Use SEO helper functions for better titles and descriptions
        pageTitle = generateSEOTitle(topic);
        pageDescription = description || generateSEODescription(topic);
        pageKeywords = keywords || generateSEOKeywords(topic);
      }
    }

    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', pageKeywords);
    
    // Open Graph tags
    updateMetaTag('og:title', pageTitle, true);
    updateMetaTag('og:description', pageDescription, true);
    updateMetaTag('og:url', pageUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:image', pageImage, true);
    updateMetaTag('og:site_name', 'LearnStackHub', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', pageImage);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

  }, [location.pathname, title, description, keywords, topicId]);

  return null; // This component doesn't render anything
}

export default SEOHead;

