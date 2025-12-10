import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComponentById } from '../../utils/componentLibrary';
import Icon from '../../components/atoms/Icon/Icon';
import './ComponentDetailPage.css';

const ComponentDetailPage = () => {
  const { componentId } = useParams();
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const [propsState, setPropsState] = useState({});

  useEffect(() => {
    const comp = getComponentById(componentId);
    if (comp) {
      setComponent(comp);
      // Initialize props state with defaults
      const initialState = {};
      Object.keys(comp.props).forEach(key => {
        const propDef = comp.props[key];
        if (propDef.default !== undefined) {
          initialState[key] = propDef.default;
        }
      });
      setPropsState(initialState);
    }
  }, [componentId]);

  if (!component) {
    return (
      <div className="component-detail-page">
        <div className="component-not-found">
          <h2>Component not found</h2>
          <button onClick={() => navigate('/ui-checker')} className="back-button">
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const handlePropChange = (propName, value) => {
    setPropsState(prev => ({
      ...prev,
      [propName]: value
    }));
  };

  const renderControl = (propName, propDef) => {
    const value = propsState[propName] ?? propDef.default;

    switch (propDef.type) {
      case 'boolean':
        return (
          <label className="control-item">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handlePropChange(propName, e.target.checked)}
            />
            <span>{propName}</span>
          </label>
        );

      case 'select':
        return (
          <div className="control-item">
            <label className="control-label">{propName}</label>
            <select
              value={value}
              onChange={(e) => handlePropChange(propName, e.target.value)}
              className="control-select"
            >
              {propDef.options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'number':
        return (
          <div className="control-item">
            <label className="control-label">{propName}</label>
            <input
              type="number"
              value={value}
              min={propDef.min}
              max={propDef.max}
              step={propDef.step}
              onChange={(e) => handlePropChange(propName, Number(e.target.value))}
              className="control-input"
            />
          </div>
        );

      case 'string':
        return (
          <div className="control-item">
            <label className="control-label">{propName}</label>
            {propDef.examples ? (
              <select
                value={value}
                onChange={(e) => handlePropChange(propName, e.target.value)}
                className="control-select"
              >
                {propDef.examples.map(example => (
                  <option key={example} value={example}>
                    {example || '(empty)'}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropChange(propName, e.target.value)}
                className="control-input"
                placeholder={propDef.default}
              />
            )}
          </div>
        );

      case 'array':
        return (
          <div className="control-item">
            <label className="control-label">{propName}</label>
            <div className="control-info">
              Array with {Array.isArray(value) ? value.length : 0} items
            </div>
          </div>
        );

      case 'function':
        return (
          <div className="control-item">
            <label className="control-label">{propName}</label>
            <div className="control-info">Function handler</div>
          </div>
        );

      case 'element':
        return (
          <div className="control-item">
            <label className="control-label">{propName}</label>
            <div className="control-info">React element</div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderComponent = () => {
    if (!component) return null;

    const Component = component.component;
    const props = { ...propsState };

    // Handle onChange for input-like components
    if (component.id === 'input' || component.id === 'formField') {
      if (!props.onChange) {
        props.onChange = (e) => {
          handlePropChange('value', e.target.value);
        };
      }
    }

    // Handle onClick for interactive components
    if (!props.onClick && (component.id === 'button' || component.id === 'callToAction' || component.id === 'roleCard' || component.id === 'sidebarMenuItem')) {
      props.onClick = () => console.log('Component clicked');
    }

    // Handle onSubmit for forms
    if (component.id === 'loginForm' && !props.onSubmit) {
      props.onSubmit = (data) => console.log('Form submitted:', data);
    }

    // Handle special cases with children
    if (component.id === 'button') {
      const { children, ...restProps } = props;
      return <Component {...restProps}>{children || 'Button'}</Component>;
    }

    if (component.id === 'label') {
      const { children, ...restProps } = props;
      return <Component {...restProps}>{children || 'Label'}</Component>;
    }

    if (component.id === 'callToAction') {
      const { children, ...restProps } = props;
      return <Component {...restProps}>{children || 'Call to Action'}</Component>;
    }

    if (component.id === 'roleCard') {
      // For RoleCard, we need to provide an icon
      if (!props.icon) {
        props.icon = <Icon name="circle" size={48} />;
      }
      return <Component {...props} />;
    }

    if (component.id === 'sideDropMenu') {
      // Ensure items is an array
      if (!Array.isArray(props.items)) {
        props.items = [
          { id: '1', label: 'Item 1', icon: 'circle', count: 5, isSelected: false },
          { id: '2', label: 'Item 2', icon: 'circle', count: null, isSelected: true }
        ];
      }
      return <Component {...props} />;
    }

    // Default rendering
    return <Component {...props} />;
  };

  return (
    <div className="component-detail-page">
      <header className="component-detail-header">
        <button onClick={() => navigate('/ui-checker')} className="back-button">
          <Icon name="chevronDown" size={20} style={{ transform: 'rotate(90deg)' }} />
          Back to Library
        </button>
        <div className="component-detail-title-section">
          <h1 className="component-detail-title">{component.name}</h1>
          <span className="component-detail-category">{component.category}</span>
        </div>
        <p className="component-detail-description">{component.description}</p>
      </header>

      <div className="component-detail-content">
        <aside className="component-controls">
          <h2 className="controls-title">Controls</h2>
          <div className="controls-list">
            {Object.entries(component.props).map(([propName, propDef]) => (
              <div key={propName} className="control-group">
                {renderControl(propName, propDef)}
              </div>
            ))}
            {Object.keys(component.props).length === 0 && (
              <div className="control-info">This component has no configurable props</div>
            )}
          </div>
        </aside>

        <main className="component-preview-area">
          <div className="preview-header">
            <h2 className="preview-title">Preview</h2>
            <button 
              className="reset-button"
              onClick={() => {
                const initialState = {};
                Object.keys(component.props).forEach(key => {
                  const propDef = component.props[key];
                  if (propDef.default !== undefined) {
                    initialState[key] = propDef.default;
                  }
                });
                setPropsState(initialState);
              }}
            >
              Reset to Defaults
            </button>
          </div>
          <div className="preview-container">
            <div className="preview-wrapper">
              {renderComponent()}
            </div>
          </div>

          <div className="code-section">
            <h3 className="code-title">Props</h3>
            <pre className="code-block">
              <code>{JSON.stringify(propsState, null, 2)}</code>
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComponentDetailPage;
