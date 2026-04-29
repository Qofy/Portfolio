import { uniCourses } from "../data/background";
import { seniorHCourses } from "../data/background";

export function Educational() {
  return (
    <div className="educational-bg">
      <section className="university">
        <h1>
          University of Europe for Applied Sciences — Bachelor of Software Engineering
          <br />
          <span className="location">Hamburg, Germany</span> | 
          <em> 2023 – 2026</em>
        </h1>
        
        <div className="courses-main">
          <h3>Courses</h3>
          <div className="courses-container">
            {Object.entries(uniCourses).map(([semester, courses], index) => (
              <div key={semester} className="semester-courses">
                <h4>Semester {index + 1}</h4>
                <ul>
                  {courses.map((course, courseIndex) => (
                    <li key={courseIndex}>{course}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="senior-high">
        <h1>
          Mt. Sinai Senior High School, Ghana — WASSCE, Visual Arts & ICT Focus
          <br />
          <span className="location">Eastern Region</span> | <em>2019 – 2021</em>
        </h1>
        
        <div className="subjects-container">
          <div className="subject-group">
            <h3>{seniorHCourses.coreSubjects.header}</h3>
            <ul>
              {seniorHCourses.coreSubjects.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
          
          <div className="subject-group">
            <h3>{seniorHCourses.electiveSubject.header}</h3>
            <ul>
              {seniorHCourses.electiveSubject.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="software-used-at-uni">
        {/* Add software/tools content here */}
      </section>
    </div>
  );
}
