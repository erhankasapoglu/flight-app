import '../styles/progressTimeline.scss';

const ProgressTimeline = ({ progress }) => {
  const steps = [
    { label: 'Uçuşlar', progress: 1 },
    { label: 'Yolcu Bilgileri', progress: 2 },
    { label: 'Ödeme Bilgileri', progress: 3 },
  ];
  const getProgressClass = (current, progress) => {
    if (current > progress) {
      return "completed";
    } else if (current >= progress) {
      return "ongoing";
    } else {
      return "";
    }
  }
  return (
    <div className="timeline-container">
      {steps.map((step, index) => (
        <div key={index} className={`timeline-step ${getProgressClass(progress, step.progress)}`}>
          <div className="step-number">
            {step.completed ? <span>&#10003;</span> : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="connector" style={{ visibility: progress > step.progress ? 'visible' : 'hidden' }}></div>
          )}
          <div className="step-label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTimeline;
