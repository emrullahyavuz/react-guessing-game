import React from "react";

const Card = ({ card,handleSelected,rotated }) => {
  return (
    <div className="w-full mx-auto relative">
     <div className={`${rotated ? "rotated" : ""}`}>
     <img src={card.path} className={`h-52 w-full ${rotated ? "rotatedImg" : ""}`} />
      <img 
      onClick={() => handleSelected(card)}
      src="img/kapak.png" 
      className={`h-52 absolute inset-0 w-full ${rotated ? "hidden" : ""}`} 
      />
     </div>
     <div>
      
     </div>
    </div>
  );
};

export default Card;
