import React,{useContext} from 'react';

import DropDownTrigger from '../DropDownTrigger';
import CanvassTrigger from './CanvassTrigger';

import { appContext } from '../../context/ContextWrapper';

const LocationIndicator = (props) => {

  const {
          categoryName,getRequiredSelectedLocation,
          selectedLocation,setSelectedState
        } = props.propsObject;

  const appStates = useContext(appContext);

  const {setSelectedCategory} = appStates;

  const handleClick = ()=>{
    setSelectedState("");
    setSelectedCategory(categoryName)
  };

  let _location = "";

  if (selectedLocation) {
    _location = getRequiredSelectedLocation(selectedLocation);
  }

  
  return (
    <CanvassTrigger handleClick={handleClick}>
      <span>
        Location
      </span>
      <span className="small d-block text-muted">
        {
          selectedLocation? _location: "All Nigeria"
        }
      </span>
      <DropDownTrigger dropEnd="dropend">
        <p className="dropdown-toggle dropdown-toggle-split p-0 mt-0"/>
      </DropDownTrigger>
    </CanvassTrigger>
  )
}

export default LocationIndicator;