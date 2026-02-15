import { Link } from 'react-router-dom';
import { BookOpen, Code, Play, Zap, ArrowRight, Clock, FileText, Users, Award, Rocket, Target, CheckCircle } from 'lucide-react';
import { courseStructure, getAllTopics } from '../data';

function Home() {
  const features = [
    {
      icon: <BookOpen size={28} />,
      title: 'Step-by-Step Tutorials',
      description: 'Clear, beginner-friendly explanations that make complex concepts easy to understand'
    },
    {
      icon: <Code size={28} />,
      title: 'Real-World Examples',
      description: 'Learn with practical code examples from actual industry projects'
    },
    {
      icon: <Play size={28} />,
      title: 'Try It Yourself',
      description: 'Write and run Java code directly in your browser - no setup needed!'
    },
    {
      icon: <Rocket size={28} />,
      title: 'Full Stack Path',
      description: 'Complete journey from Core Java to Spring Boot and beyond'
    }
  ];

  const allTopics = getAllTopics();
  const totalTopics = allTopics.length;

  const courseDescriptions = {
    corejava: 'Master the fundamentals - variables, OOP, collections, multithreading & more',
    jdbc: 'Connect Java applications to databases with JDBC and MySQL',
    servlets: 'Build dynamic web applications with Java Servlets',
    jsp: 'Create powerful server-side web pages with JSP'
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section fade-in">
        <div className="hero-badge">
          <Zap size={16} />
          <span>☁️ Free Cloud-Ready Java Course</span>
        </div>
        
        <h1 className="hero-title">
          From <span className="highlight">Core</span> to
          <br />Cloud ☁️
        </h1>
        
        <p className="hero-subtitle">
          Your complete journey from Java fundamentals to cloud-ready full-stack development. 
          Master Core Java, Servlets, JSP, and JDBC with interactive tutorials and live code execution.
        </p>
        
        <div className="hero-buttons">
          <Link to="/tutorial/java-introduction" className="btn btn-primary">
            <Play size={20} />
            Start Learning Free
          </Link>
          <a href="#courses" className="btn btn-secondary">
            <BookOpen size={20} />
            Explore Courses
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginTop: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { value: `${totalTopics}+`, label: 'Tutorials', icon: '📚' },
            { value: '150+', label: 'Code Examples', icon: '💻' },
            { value: '4', label: 'Courses', icon: '🎯' },
            { value: '100%', label: 'Free', icon: '🆓' }
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: '800',
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                {stat.icon} {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', fontWeight: '600' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Cards */}
      <section id="courses" className="courses-section">
        <div className="section-header">
          <h2 className="section-title-main">📖 Choose Your Learning Path</h2>
        </div>

        <div className="courses-grid">
          {Object.entries(courseStructure).map(([courseKey, course]) => {
            const topicCount = Object.values(course.sections).reduce(
              (acc, section) => acc + section.topics.length, 0
            );
            const firstTopic = Object.values(course.sections)[0]?.topics[0];
            
            return (
              <Link 
                key={courseKey}
                to={firstTopic ? `/tutorial/${firstTopic.id}` : '/'}
                className="course-card"
                data-course={courseKey}
                style={{ '--card-accent': course.color }}
              >
                <div className="course-icon">
                  {course.icon}
                </div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">
                  {courseDescriptions[courseKey]}
                </p>
                <div className="course-meta">
                  <span>
                    <FileText size={16} />
                    {topicCount} Topics
                  </span>
                  <span>
                    <Clock size={16} />
                    {Math.ceil(topicCount * 15 / 60)} Hours
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Detailed Course Content */}
      <section className="courses-section">
        <div className="section-header">
          <h2 className="section-title-main">📋 What You'll Learn</h2>
        </div>

        {Object.entries(courseStructure).map(([courseKey, course]) => (
          <div key={courseKey} className="course-module">
            <div className="course-module-header">
              <span className="module-icon">{course.icon}</span>
              <h3>{course.title}</h3>
            </div>
            
            <div className="sections-grid">
              {Object.entries(course.sections).map(([sectionKey, section]) => (
                <Link 
                  key={sectionKey}
                  to={`/tutorial/${section.topics[0].id}`}
                  className="section-card"
                >
                  <h4>{section.title}</h4>
                  <p>{section.topics.length} Topics</p>
                  <ul>
                    {section.topics.slice(0, 4).map(topic => (
                      <li key={topic.id}>{topic.title}</li>
                    ))}
                    {section.topics.length > 4 && (
                      <li className="more">+{section.topics.length - 4} more</li>
                    )}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title-main">✨ Why Students Love Us</h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card fade-in stagger-${index + 1}`}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Different */}
      <section style={{
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderRadius: '24px',
        marginBottom: '3rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>
          🎯 What Makes Our Tutorials Different?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { icon: '💬', title: 'Human-Friendly Writing', desc: 'No boring textbook language. We explain like a friend would!' },
            { icon: '🏢', title: 'Real Project Examples', desc: 'See how concepts are used in actual E-Commerce & Banking apps' },
            { icon: '🎮', title: 'Interactive Code Editor', desc: 'Write, edit, and run Java code right in your browser' },
            { icon: '📊', title: 'Visual Diagrams', desc: 'Complex concepts explained with clear visual representations' },
            { icon: '❓', title: 'Practice Questions', desc: 'Test your understanding with hands-on coding challenges' },
            { icon: '🆓', title: 'Always Free', desc: 'Quality education should be accessible to everyone' }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{item.title}</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h2 style={{ marginBottom: '1rem', color: 'white', fontSize: '2rem' }}>
          ☁️ Ready to Scale from Core to Cloud?
        </h2>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          marginBottom: '2rem', 
          maxWidth: '550px', 
          margin: '0 auto 2rem',
          fontSize: '1.1rem'
        }}>
          Join thousands of developers mastering Java from fundamentals to cloud deployment. 
          Start your CoreToCloud journey today - it's completely free!
        </p>
        <Link to="/tutorial/java-introduction" className="btn btn-primary" style={{
          background: 'white',
          color: '#667eea',
          padding: '1rem 2rem',
          fontSize: '1.1rem'
        }}>
          <Play size={22} />
          Start Learning Now
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}

export default Home;
