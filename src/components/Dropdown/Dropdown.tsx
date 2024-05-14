import React, { useState } from "react";
import "./Dropdown.css";

interface DropdownProps {
  elements: JSX.Element[];
  currentElementNumber: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonName: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  elements,
  currentElementNumber,
  open,
  setOpen,
  buttonName,
}) => {
  return (
    <>
      <div className="dropdown">
        <button
          id="main-btn"
          onClick={() => {
            setOpen(!open);
          }}
        >{`${buttonName} - ${currentElementNumber}`}</button>
        {open ? <ul className="menu">{elements}</ul> : null}
      </div>
    </>
  );
};

export default Dropdown;
