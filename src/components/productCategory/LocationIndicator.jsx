import React,{useContext} from 'react';

import DropDownTrigger from '../DropDownTrigger';
import CanvassTrigger from './CanvassTrigger';

import { appContext } from '../../context/ContextWrapper';

const LocationIndicator = ({categoryName}) => {

  const appStates = useContext(appContext);

  const {setSelectedCategory} = appStates;

  const handleClick = ()=> setSelectedCategory(categoryName);

  return (
    <CanvassTrigger handleClick={handleClick}>
      <span>
        Location
      </span>
      <span className="small d-block text-muted"> All Nigeria</span>
      <DropDownTrigger dropEnd="dropend">
        <p className="dropdown-toggle dropdown-toggle-split p-0 mt-0"/>
      </DropDownTrigger>
    </CanvassTrigger>
  )
}

export default LocationIndicator;