

export function SectionContainer({ children }: { children: React.ReactNode }) {
  return(
    <section id="about" className="about-me-main__container">
      <div className="about-me-sub__container">
        {children}
      </div>
    </section>
  )
}