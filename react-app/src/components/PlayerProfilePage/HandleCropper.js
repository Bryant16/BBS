import React,{useState,useCallback} from 'react';
import Cropper from 'react-easy-crop';

const HandleCropper = ({url, setUpload, playerid,vidid})=>{
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [x, setX] = useState('')
    const [y, setY] = useState('')
  let count = 0
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        const updateXAndY = async (dimensions) => {
            const res = await fetch(`/api/media/update/pic/${playerid}/${vidid}`, {
              headers: { "Content-type": "application/json" },
              method: "POST",
              body: JSON.stringify(dimensions),
            });
            if (res.ok) {
              const answer = await res.json();
              const { x, y } = answer.img;
              console.log(answer)
            }
          };
      if (count > 1) {
        setX(croppedArea.x);
        setY(croppedArea.y);
        console.log(x,y)
        setUpload(false)
        const xy = { x: croppedArea.x, y: croppedArea.y };
        const updateProfileImageXY = {
          ...xy,
          url: url,

        };
        updateXAndY(updateProfileImageXY);
      }
      count++
    }, [])
  
    return (
      <Cropper
        image={url}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    )
}

export default HandleCropper;