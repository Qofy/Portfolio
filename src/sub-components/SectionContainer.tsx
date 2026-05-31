type SectionContainerProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export function SectionContainer({
  children,
  id,
  className = 'about-me-main__container',
}: SectionContainerProps) {
  return (
    <section id={id} className={className}>
      <div className="about-me-sub__container">
        {children}
      </div>
    </section>
  );
}
