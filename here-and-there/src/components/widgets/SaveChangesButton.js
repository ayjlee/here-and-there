import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const SaveChangesButton = ({ onSave }) => {
  return (
    <button id="save-changes-btn" onClick={onSave}>Save Changes</button>
  );
};

export default SaveChangesButton;
