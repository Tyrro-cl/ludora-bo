import { useNavigate } from "react-router-dom";
import { componentLibrary } from "../../utils/componentLibrary";
import "./UICheckerPage.css";

const UICheckerPage = () => {
  const navigate = useNavigate();

  const handleComponentClick = (componentId) => {
    navigate(`/ui-checker/${componentId}`);
  };

  const ComponentCard = ({ component }) => {
    return (
      <div
        className="component-card"
        onClick={() => handleComponentClick(component.id)}
      >
        <div className="component-card-header">
          <h3 className="component-card-name">{component.name}</h3>
          <span className="component-card-category">{component.category}</span>
        </div>
        <p className="component-card-description">{component.description}</p>
        <div className="component-card-preview">
          <div className="component-preview-wrapper">
            {component.id === "ludoraLogo" ? (
              <component.component />
            ) : component.id === "icon" ? (
              <component.component name="circle" size={24} />
            ) : component.id === "counter" ? (
              <component.component count={5} />
            ) : component.id === "label" ? (
              <component.component>Label</component.component>
            ) : component.id === "input" ? (
              <component.component placeholder="Preview" />
            ) : component.id === "button" ? (
              <component.component>Preview</component.component>
            ) : component.id === "callToAction" ? (
              <component.component>Preview</component.component>
            ) : component.id === "studentStatus" ? (
              <component.component content="Preview" />
            ) : component.id === "statusRoot" ? (
              <component.component content="Preview" />
            ) : component.id === "formField" ? (
              <component.component label="Preview" name="preview" placeholder="Preview" />
            ) : component.id === "sidebarMenuItem" ? (
              <component.component label="Preview" />
            ) : component.id === "roleCard" ? (
              <component.component title="Preview" />
            ) : component.id === "loginForm" ? (
              <div className="login-form-preview">
                <component.component onSubmit={() => {}} />
              </div>
            ) : component.id === "sideDropMenu" ? (
              <component.component
                title="Preview"
                items={[
                  { id: "1", label: "Item 1", icon: "circle", isSelected: false }
                ]}
              />
            ) : component.id === "sideNav" ? (
              <div className="side-nav-preview">
                <component.component state="expanded" />
              </div>
            ) : (
              <div className="preview-placeholder">Preview</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ui-checker-page">
      <header className="ui-checker-header">
        <h1 className="ui-checker-title">Component Library</h1>
        <p className="ui-checker-subtitle">
          Browse and test all available components. Click on any component to see its variants and interactive controls.
        </p>
      </header>

      <div className="ui-checker-content">
        <section className="component-section">
          <h2 className="section-title">Atoms</h2>
          <p className="section-description">Basic building blocks of the design system</p>
          <div className="component-grid">
            {componentLibrary.atoms.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </section>

        <section className="component-section">
          <h2 className="section-title">Molecules</h2>
          <p className="section-description">Simple combinations of atoms</p>
          <div className="component-grid">
            {componentLibrary.molecules.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </section>

        <section className="component-section">
          <h2 className="section-title">Organisms</h2>
          <p className="section-description">Complex components built from molecules and atoms</p>
          <div className="component-grid">
            {componentLibrary.organisms.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UICheckerPage;
