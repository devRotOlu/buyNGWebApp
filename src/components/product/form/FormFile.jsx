import React,{useRef,useContext} from 'react';
import {uid} from "react-uid";
import {DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';

import Image from "./Image";
import ImageList from '../addProduct/ImageList';

import { appContext } from '../../../context/ContextWrapper';

const FormFile = (props) => {

    const {name,labelText,validationText} = props;

    const appStates = useContext(appContext);
    const {productObject,setProductObject} = appStates;

    const {imageFiles} = productObject;

    const textRef = useRef();

    const handleFileChange =(event)=>{
      event.preventDefault();
      if (imageFiles.length < 4) {
        const filesToAdd = 4 - imageFiles.length;
        const files = [...event.target.files].filter((file,index)=>{
           return index <= (filesToAdd - 1);
        }); 
        setProductObject({...productObject,[name]:[...imageFiles,...files]});
      }
    }

    const styleTextRef = ()=> textRef.current.style.color = "red";

    const handleDragEnd = (draggedItem)=>{

      const {destination:{index :destinationIndex},source:{index:sourceIndex}} = draggedItem;

      const files = imageFiles;
  
      const [sourceFile] = files.splice(sourceIndex,1);

      files.splice(destinationIndex,0,sourceFile);

      setProductObject({...productObject,imageFiles:files});
    }

    const images = imageFiles.map((image,index)=>{
      const imageURL = URL.createObjectURL(image);
      return (
              <Draggable key ={uid(image)} draggableId = {uid(image)} index={index}>
                  {
                    provided=>{
                      // var transform = provided.draggableProps.style.transform;
                      // if (transform) {
                      //   var xTranslate = transform.split(",")[0];
                      //   provided.draggableProps.style.transform = `translate(${xTranslate},0px)`;
                      // }
                      return(
                        <li  className="imageList" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                          <Image propsObject={{
                            image,imageURL,imageIndex:index,setProductObject,productObject,styleTextRef
                          }} 
                          />
                        </li>
                      )
                    }
                  }
              </Draggable>
              )
    })
    
  return (
    <div className="inputWrapper">
        <p style={{marginTop:"0",fontWeight:"bolder"}} ref={textRef}>{labelText}</p>
        <p className="instructions">First picture - is the title picture. You can change the order of photos:<br/> just grab your photos and drag</p>
        <div style={{display:"flex",alignItems:"center"}}>
          <label className="fileLabel " >
            <input className="formElements formElementInput fileInput" type="file" name={name} accept="image/*" id={name} multiple onChange={handleFileChange}/>
            <i className="bi bi-plus-lg filePlus"/>
          </label>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {
                provided=> <ImageList provided={provided} images={images}/>
              }
            </Droppable>
          </DragDropContext>
        </div>
        <p className="instructions">
          Each picture must not exceed 5 Mb<br/>
          Supported formats are *.jpg and *.png
        </p>
    </div>
  )
}

export default FormFile;
