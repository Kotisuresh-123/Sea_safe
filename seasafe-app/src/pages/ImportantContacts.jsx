import "./../styles/ImportantContacts.css";

const contacts = [
  {
    title: "🚨 Indian Coast Guard",
    phone: "1554",
    description: "Marine emergency, rescue operations, distress assistance."
  },
  {
    title: "🚓 Police",
    phone: "100",
    description: "Emergency police assistance."
  },
  {
    title: "🚑 Ambulance",
    phone: "108",
    description: "Medical emergency services."
  },
  {
    title: "🔥 Fire & Rescue",
    phone: "101",
    description: "Fire emergencies and rescue."
  },
  {
    title: "🌊 Disaster Management",
    phone: "1070",
    description: "Cyclones, floods, tsunami and natural disasters."
  },
  {
    title: "⚓ Port Authority",
    phone: "Contact Local Port",
    description: "Port information and vessel assistance."
  },
  {
    title: "🛟 Fisheries Department",
    phone: "1800-425-1660",
    description: "Fishing regulations and assistance."
  },
  {
    title: "📞 SeaSafe Emergency",
    phone: "SOS",
    description: "Future AI emergency assistance."
  }
];

export default function ImportantContacts() {
  return (
    <div className="contacts-page">

      <div className="contacts-header">
        <h1>🌊 Important Marine Contacts</h1>
        <p>
          Emergency numbers for fishermen, sailors, coastal travelers and
          marine rescue services.
        </p>
      </div>

      <div className="contacts-grid">
        {contacts.map((contact, index) => (
          <div className="contact-card" key={index}>

            <h2>{contact.title}</h2>

            <h3>{contact.phone}</h3>

            <p>{contact.description}</p>

            {contact.phone !== "Contact Local Port" &&
             contact.phone !== "SOS" && (
              <a href={`tel:${contact.phone}`}>
                <button>📞 Call Now</button>
              </a>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}