import profileImg from '../../images/profile2.png';

export default function FloatingImage() {
  return (
    <div className="floating-image-container">
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      {/* Profile Image - Floating */}
      <img
        src={profileImg}
        alt="Kofi Agyekum - Frontend Engineer"
        className="floating-image"
      />
    </div>
  );
}
