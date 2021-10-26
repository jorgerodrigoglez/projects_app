import React, { useState } from "react";

const SelectPriorities = ({ selectPriorities, handlePriority }) => {
  // para mostrar u ocultar select
  const [showSelect, setShowSelect] = useState(false);

  const priorities = [
    { id: "Urgente", text: "Urgente"},
    { id: "Alta", text: "Alta"},
    { id: "Media", text: "Media"},
    { id: "Baja", text: "Baja"}
  ];

  return (
    <div onClick={() => setShowSelect(!showSelect)} className="select__form">
      <div className="select__form__priorities">
        <div className="select__form__selected">
          {selectPriorities.toUpperCase()}
        </div>
        {showSelect && (
          <div className="select__form__options">
            {priorities.map(prioritie => (
              <div
                className="select__form__option"
                key={prioritie.id}
                data-value={prioritie.id}
                onClick={handlePriority}
              >
                {prioritie.text}
              </div>
            ))}
          
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPriorities;
