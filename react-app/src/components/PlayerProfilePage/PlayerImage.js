import React, { useEffect, useState, useCallback } from "react";
import defaultUser from "./default-user.png";
import { Image } from "@chakra-ui/react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Cropper from "react-easy-crop";

const PlayerImage = ({ playerid }) => {
  const [playerImageUrl, setPlayerImageUrl] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [upload, setUpload] = useState(false);
  let count = 0;
  const updateXAndY = async (dimensions) => {
    const res = await fetch(`/api/media/update/images/${playerid}`, {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(dimensions),
    });
    if (res.ok) {
      const answer = await res.json();
      const { x, y } = answer.img;
    }
  };

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    if (count > 1) {
      setX(croppedArea.x);
      setY(croppedArea.y);
      setUpload(false);
      count = 0;
      let response = await fetch(`/api/media/images/${playerid}`);
      if (response.ok) {
        let profile_url = await response.json();
        
        const xy = { x: croppedArea.x, y: croppedArea.y };
        const updateProfileImageXY = {
          ...xy,
          url: profile_url.URL,
        };
        updateXAndY(updateProfileImageXY);
      }
    }
    count++;
  }, []);
  useEffect(() => {
    const getProfileUrl = async () => {
      let response = await fetch(`/api/media/images/${playerid}`);
      if (response.ok) {
        let profile_url = await response.json();
        console.log(profile_url, "grab profile url");
        if (profile_url.x !== null) {
          setX(profile_url.x);
          setY(profile_url.y);
          console.log("its been set");
        }
        setPlayerImageUrl(profile_url.URL);
      }
    };
    getProfileUrl();
  }, [playerImageUrl, playerid]);

  const updateFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      const res = await fetch(`/api/media/images/${playerid}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const imageUpload = await res.json();
        setPlayerImageUrl(imageUpload.URL);
        setUpload(true);
      }
    }
  };
  return (
    <div className="player_profile_container_image">
      <div>
        {upload && (
          <Cropper
            image={playerImageUrl}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
        {playerImageUrl ? (
          <Image
            width="25em"
            height="25em"
            objectPosition={`${x}% ${y}%`}
            objectFit="cover"
            src={playerImageUrl}
          />
        ) : (
          <Image boxSize="245px" objectFit="cover" src={defaultUser} />
        )}
      </div>
      <div className="file_upload_container">
        <form>
          <input
            type="file"
            name="file"
            onChange={updateFile}
            size="60"
            accept="image/*"
          />
          <label id="file_upload" for="file">
            <CloudUploadIcon />
          </label>
        </form>
      </div>
    </div>
  );
};

export default PlayerImage;
