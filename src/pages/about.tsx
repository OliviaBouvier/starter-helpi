import React, {useState} from 'react';
import './about.css';
import olivia_photo from '../assets/Olivia_photo.jpg';
import tarun_photo from '../assets/Tarun-photo.jpg';
import connor_photo from "../assets/Connor_photo.jpg";
import chris_photo from "../assets/Chris_photo.jpg";

type TeamMember = {
    name: string;
    photo: string;
    info: string;
    email: string;
    linkedin: string;
};

const teamMembers: TeamMember[] = [
    { name: "Olivia Bouvier", 
        photo: olivia_photo, 
        info: "Olivia is a junior Computer Science major at the University of Delaware with a concentration in AI and minors in English and Cognitive Science. She hopes to pursue a career in software development and to use computer science ethically to improve society.",
        email: "obouvier@udel.edu",
        linkedin: "https://linkedin.com/in/oliviabouvier"},
    { name: "Connor Griffith", 
        photo: connor_photo,
        info: "Connor is a junior Computer Science Student at the University of Delaware with a concentration in Cybersecurity. He plans to pursue his masters degree and break into the field of digital forensics. ",
        email: "congriff@udel.edu",
        linkedin: "https://linkedin.com/in/congriffith"},
    { name: "Chris Yanko", 
        photo: chris_photo,
        info: "Chris is a junior Computer Science major at the University of Delaware with a concentration in Cybersecurity. He hopes to pursue a career in cybersecurity to be able to protect people on the digital spectrum",
        email: "chrisy@udel.edu",
        linkedin: "https://linkedin.com/in/chris-yanko"},
    { name: "Tarun Baskaran", 
        photo: tarun_photo, 
        info: "Tarun is a junior majoring in Computer Science at the University of Delaware",
        email: "tarunb@udel.edu",
        linkedin: "https://linkedin.com/in/taru-baskaran"},
];

const stars = Array.from({ length: 30 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
}));

export const About = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);;

    const handleMemberClick = (member: TeamMember) => {
        setSelectedMember(member);
    };

    const closePopup = () => {
        setSelectedMember(null);
    };

    return (
    <>
        {/* <div className="night-sky"></div> */}
        <div className="page-content">
            <div className="about-header">
                <h1>ABOUT CAREER HELPI</h1>
            </div>
            <div className="about-body">
                <p>Our mission is to help individuals discover fulfilling careers through personalized assessments and guidance</p>
                <h2>Meet the Team</h2>
                <div className="team-box-wrapper">
                <div className="team-box">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member" onClick={() => handleMemberClick(member)}>
                            <div className="photo-placeholder">
                                {member.photo ? (
                                    <img src={member.photo} alt={`${member.name}`} className="team-photo" />
                                ) : (
                                    "No Photo"
                                )}
                                </div>
                            <p>{member.name}</p>
                        </div>
                    ))}
                </div>

                <div className="stars-around">
                    {stars.map((star, index) => (
                        <span
                            key={index}
                            className="star"
                            style={{
                                top: star.top,
                                left: star.left,
                                animationDelay: star.delay,
                            }}
                        ></span>
                    ))}
                    </div>
                </div>
            </div>
        </div>

        {selectedMember && (
            <div className="modal-overlay" onClick={closePopup}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{selectedMember.name}</h3>
                        <button className="close-button" onClick={closePopup}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>{selectedMember.info}</p>
                        <p>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${selectedMember?.email}`} target="_blank" rel="noopener noreferrer">
                                {selectedMember.email}
                            </a>
                        </p>
                        <p>
                        <strong>LinkedIn:</strong>{" "}
                            <a href={selectedMember?.linkedin} target="_blank" rel="noopener noreferrer">
                                View Profile
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};
