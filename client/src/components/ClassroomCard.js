import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../css/ClassroomCard.css'; // Import CSS file for styling

const ClassroomCard = ({ classroom }) => {
  return (
    <div className="classroom-card">
      <h2>{classroom.name}</h2>
      <Link to={`/classroom/${classroom.id}`} className="btn-view-details">
        View Details
      </Link>
    </div>
  );
};

export default ClassroomCard;
