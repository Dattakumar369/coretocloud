import { useState, useEffect } from 'react';

// Animated Hierarchy Diagram Component
export function HierarchyDiagram({ data, title, type = 'tree' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`diagram-container ${isVisible ? 'visible' : ''}`}>
      {title && <h3 className="diagram-title">{title}</h3>}
      <div className={`diagram diagram-${type}`}>
        {type === 'tree' && <TreeDiagram data={data} />}
        {type === 'flow' && <FlowDiagram data={data} />}
        {type === 'pillars' && <PillarsDiagram data={data} />}
        {type === 'layers' && <LayersDiagram data={data} />}
      </div>
    </div>
  );
}

// Tree Hierarchy Diagram
function TreeDiagram({ data }) {
  return (
    <div className="tree-diagram">
      <div className="tree-root">
        <div className="tree-node root-node pulse-glow">
          <span className="node-icon">{data.icon || '📦'}</span>
          <span className="node-label">{data.label}</span>
        </div>
        {data.children && (
          <div className="tree-children">
            <div className="tree-connector"></div>
            <div className="tree-branches">
              {data.children.map((child, index) => (
                <div key={index} className="tree-branch" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="branch-connector"></div>
                  <div className={`tree-node child-node color-${index % 4}`}>
                    <span className="node-icon">{child.icon || '📄'}</span>
                    <span className="node-label">{child.label}</span>
                    {child.description && <span className="node-desc">{child.description}</span>}
                  </div>
                  {child.children && (
                    <div className="sub-children">
                      {child.children.map((sub, subIndex) => (
                        <div key={subIndex} className="sub-node" style={{ animationDelay: `${(index * 0.1) + (subIndex * 0.05)}s` }}>
                          <span className="sub-icon">{sub.icon || '•'}</span>
                          <span className="sub-label">{sub.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Flow Diagram (for processes)
function FlowDiagram({ data }) {
  return (
    <div className="flow-diagram">
      {data.steps.map((step, index) => (
        <div key={index} className="flow-step" style={{ animationDelay: `${index * 0.15}s` }}>
          <div className={`flow-node step-${index % 4}`}>
            <div className="flow-number">{index + 1}</div>
            <div className="flow-content">
              <span className="flow-icon">{step.icon}</span>
              <span className="flow-label">{step.label}</span>
            </div>
          </div>
          {index < data.steps.length - 1 && (
            <div className="flow-arrow">
              <div className="arrow-line"></div>
              <div className="arrow-head">▶</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// OOP Pillars Diagram (3D style)
function PillarsDiagram({ data }) {
  return (
    <div className="pillars-diagram">
      <div className="pillars-roof">
        <div className="roof-text">{data.title || 'Object-Oriented Programming'}</div>
      </div>
      <div className="pillars-container">
        {data.pillars.map((pillar, index) => (
          <div 
            key={index} 
            className={`pillar pillar-${index}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="pillar-top"></div>
            <div className="pillar-body">
              <div className="pillar-icon">{pillar.icon}</div>
              <div className="pillar-name">{pillar.name}</div>
              <div className="pillar-desc">{pillar.description}</div>
            </div>
            <div className="pillar-base"></div>
          </div>
        ))}
      </div>
      <div className="pillars-foundation">
        <div className="foundation-text">{data.foundation || 'Java Programming'}</div>
      </div>
    </div>
  );
}

// Layers Diagram (for architecture)
function LayersDiagram({ data }) {
  return (
    <div className="layers-diagram">
      {data.layers.map((layer, index) => (
        <div 
          key={index} 
          className={`layer layer-${index}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="layer-content">
            <span className="layer-icon">{layer.icon}</span>
            <span className="layer-name">{layer.name}</span>
            <span className="layer-tech">{layer.tech}</span>
          </div>
          {index < data.layers.length - 1 && (
            <div className="layer-connector">
              <div className="connector-arrow">↓</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Animated Code Flow Visualization
export function CodeFlowAnimation({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="code-flow-animation">
      <div className="flow-steps">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flow-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="flow-marker">
              {index < currentStep ? '✓' : index + 1}
            </div>
            <div className="flow-text">{step}</div>
          </div>
        ))}
      </div>
      <div className="flow-progress">
        <div 
          className="progress-bar" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

// 3D Cube Animation for concepts
export function ConceptCube({ faces }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 90) % 360);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="concept-cube-container">
      <div className="cube" style={{ transform: `rotateY(${rotation}deg)` }}>
        <div className="cube-face front">{faces[0]}</div>
        <div className="cube-face right">{faces[1]}</div>
        <div className="cube-face back">{faces[2]}</div>
        <div className="cube-face left">{faces[3]}</div>
      </div>
    </div>
  );
}

// Animated Process Cards
export function ProcessCards({ processes }) {
  return (
    <div className="process-cards">
      {processes.map((process, index) => (
        <div 
          key={index} 
          className="process-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="card-glow"></div>
          <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
          <div className="card-icon">{process.icon}</div>
          <div className="card-title">{process.title}</div>
          <div className="card-desc">{process.description}</div>
        </div>
      ))}
    </div>
  );
}

export default HierarchyDiagram;

