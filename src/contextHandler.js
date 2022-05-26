import React, { createContext, useContext } from 'react';

const CameraContext = createContext({reso: "360P"});
const ToggleContext = createContext();

export { CameraContext, ToggleContext };