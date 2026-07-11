import { professionalExperience } from "../data/background";

export function Educational() {
  return (
    <div className="educational-bg">

      {/* University */}
      <section className="university">
        <h1>University of Europe for Applied Sciences</h1>
        <span>Bachelor of Software Engineering</span>
        <p className="location">Hamburg, Germany &nbsp;|&nbsp; <em>2023 – 2026</em></p>
        <div className="courses-main">
          <h3>German Grade: 2.3 (Good)</h3>
          <p className="status">Current Status: Thesis Writing</p>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="senior-high">
        <h2>Professional Experience</h2>

        {professionalExperience.map((job, index) => (
          <div key={index} className="job-entry">
            <h3>
              {job.company}
              <span className="role"> — {job.role}</span>
            </h3>
            <p className="location">{job.location} &nbsp;|&nbsp; <em>{job.period}</em></p>

            <div className="subjects-container">
              <div className="subject-group">
                <h4>Responsibilities</h4>
                <ul>
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="subject-group">
                <h4>Achievements</h4>
                <ul>
                  {job.achievements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}