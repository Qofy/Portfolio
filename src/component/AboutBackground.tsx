import "../styles/component/background.scss";
import { Educational } from "../sub-components/Educational";

export function AboutBackground() {
  return (
    <section id="background" className="background-section">
      <div className="background-container">
        <header className="background-header">
          <h1 className="header">Background</h1>
        </header>
        <Educational />
        <div className="all-software-used">
          {/* Tools & Software — add content here */}
        </div>
      </div>
    </section>
  );
}
