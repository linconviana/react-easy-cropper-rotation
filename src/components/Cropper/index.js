import React, { useState} from 'react'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
import './styles.css'
import { generateDownload } from './utils/cropImage'


//https://www.youtube.com/watch?v=RmiP1AY5HFM   - assistir este

/// https://www.youtube.com/watch?v=KbPRpBdBN6w&t=750s
/// yarn add react-easy-crop
/// yarn add install @material-ui/core
/// https://www.npmjs.com/package/react-easy-crop
/// :: https://ricardo-ch.github.io/react-easy-crop/
//https://codesandbox.io/s/react-easy-crop-v69ly910ql?from-embed

const Croppie = () => {


    const [image, setImage] = useState(null)
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    }

    const onSelectFile = (event) => {

        if(event.target.files && event.target.files.length > 0){

            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener('load', () => {
                setImage(reader.result)
            })
        }
    }

    const [resultCrop, setResultCrop] = useState(null);
    const onDownload = () => {
        ///generateDownload(image, croppedArea, rotation);
        generateDownload(image, croppedArea, rotation, updateImgCrop);
        
    }

    const updateImgCrop = (image) => {
        debugger
        setResultCrop(image);
    }

    const changeRotation = (event) => {

        const name = event.target.name;

        if(name === '0')
            setRotation(0)
        else if(name === '90')
            setRotation(90)
        else if(name === '180')
            setRotation(180)
        else if(name === '270')
         setRotation(270)

    }

    return(
        <>

        <div className="container">
            
            <div className="container-cropper">

                {image && 
                    <>
                    <div className="cropper">
                        <Cropper
                        // image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        rotation={rotation}
                        showGrid={false}
                        />
                    </div>

                    <div className="slider">
                        <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => setZoom(zoom)}
                        classes={{ root: 'slider' }}
                        />
                    </div>

                    </>
                }

            </div>

            <div className="container-buttons">
                <input type="file" accept="image/*" onChange={onSelectFile} />
                <button type="button" onClick={onDownload} style={{marginLeft:"30px"}} >Cropper Imagem</button>
                <br /><hr />
                <button type="button" onClick={changeRotation} name="0" style={{marginLeft:"30px"}} >0º graus</button>
                <button type="button" onClick={changeRotation} name="90" style={{marginLeft:"30px"}} >90º graus</button>
                <button type="button" onClick={changeRotation} name="180" style={{marginLeft:"30px"}} >180º graus</button>
                <button type="button" onClick={changeRotation} name="270" style={{marginLeft:"30px"}} >270º graus</button>
            </div>

            {resultCrop &&
                <img src={resultCrop} alt="imagem cropper" />
            }

        </div>
        </>
    )
}

export default Croppie;