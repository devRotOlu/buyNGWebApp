import React,{useEffect,useState,useRef} from 'react';

const Image = (props) => {
    
    const [listWidth, setListWidth] = useState("90px");

    const [isRequiredSize,setIsRequiredSize] = useState(undefined);

    const imageRef = useRef();

    const angleFactor = useRef(0);

    const {
            image,imageURL,
            imageIndex,setProductObject, 
            productObject,styleTextRef
        } = props.propsObject;

    const deleteImage = ()=>{

        const images = productObject.imageFiles.filter((image,index)=> index !== imageIndex);


        setProductObject({...productObject,imageFiles:images});
    }

    const rotateImage = ()=> {
        angleFactor.current++;
        if (angleFactor.current > 4) {
            angleFactor.current = 1;
        }
        imageRef.current.style.transform = `rotate(${angleFactor.current*90}deg)`;
    }
    

    // useEffect(()=>{
    //     const image = imageRef.current;
    //     const imageWidth = image.naturalWidth;
    //     console.log(imageWidth,"imageWidth");
    //    // setListWidth(imageWidth);
    // },[])

    const validateImageSize = ()=>{
        setTimeout(()=>{
            const imageSize = productObject.imageFiles[imageIndex].size;
            const isRequiredSize = (imageSize/1000000) <= 5;
            if (isRequiredSize) {
                setIsRequiredSize(true);
            }
            else{
                setIsRequiredSize(false);
            }
        },3000)
    }

    useEffect(()=>{
        if (isRequiredSize === false) {
            deleteImage();
            styleTextRef();
        }
    },[isRequiredSize])

    useEffect(()=>{
        validateImageSize();
    },[])


    const loaderWrapperDisplay = isRequiredSize? "none": "flex";
    const imageWrapperDisplay = isRequiredSize? "block" : "none";

    const readImageWidth = (event)=>{
        const image = event.target;
        const imageWidth = getComputedStyle(image).width;
        console.log(imageWidth,"imageWidth");
       // setListWidth(imageWidth);
    }
    
  return (
        <React.Fragment>
            <span className={`listChild loaderWrapper d-${loaderWrapperDisplay}`} >
                <span className="spinner-border" role="status"/>
            </span>

            <span className={`listChild imageWrapper d-${imageWrapperDisplay}`}>
                <img  className="images" ref={imageRef} onLoad={readImageWidth} src={imageURL} alt={image.name}/>
                <span className="imageCover">
                    <span onClick={rotateImage}  className="reloadWrapper imageIcons">
                        <i className="bi bi-arrow-clockwise" style={{fontSize:"20px"}}/>
                    </span>
                    <span  onClick={deleteImage} className="cancelWrapper imageIcons">
                        <i className="bi bi-x-lg" style={{fontSize:"18px"}}/>
                    </span>
                </span>
            </span>
        </React.Fragment>
    )
}

export default Image;
