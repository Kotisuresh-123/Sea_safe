import Button from "../common/Button";

export default function SOSButton() {
  const sendSOS = () => {
    alert("🚨 SOS Alert Sent!");
  };

  return (
    <div className="sos-container">
      <Button label="🚨 SEND SOS" onClick={sendSOS} type="danger" />
    </div>
  );
}