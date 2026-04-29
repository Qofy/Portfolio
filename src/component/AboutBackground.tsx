import { Projects } from "./Projects";
import "../styles/component/background.scss";
import { Educational } from "../sub-components/Educational";

export function AboutBackground() {
  const backgroundContent = (
    <>
      <div>
        <Educational />
        <div className="all-software-used">
          {/* Add content here */}
        </div>
      </div>
    </>
  );

  return (
    <Projects 
      sectionCon="background-section"
      header="header"
      title="About My Background (Educational Background)"
      children={backgroundContent}
      sectionId="Background"
    />
  );
}
