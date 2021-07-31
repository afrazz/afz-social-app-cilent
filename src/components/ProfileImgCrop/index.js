/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import ReactCrop from 'react-image-crop';
import React, {useState, useRef, useCallback} from 'react';
import {Avatar, makeStyles, CircularProgress} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import CropDialog from '../CropDialog';
import {onUploadprofileImg} from '../../slices/userSlice';
import 'react-image-crop/dist/ReactCrop.css';

const useStyles = makeStyles(theme => ({
  profileIcon: {
    width: 120,
    height: 120,
    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 60,
    },
  },
}));

const CropImage = ({userProfileImg}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.user);
  const [open, setDialogOpen] = useState(false);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const imgRef = useRef(null);

  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onClose = () => {
    setDialogOpen(false);
  };

  const onSave = () => {
    // const user = 'afraz';
    const formData = new FormData();
    // formData.append('user[id]', 2);
    formData.append('myFile', croppedImage);
    dispatch(onUploadprofileImg(formData));
    document.querySelector('#profileImg').value = '';
    onClose();
  };

  const handleFile = e => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setSrc(fileReader.result);
      setDialogOpen(true);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   // const user = 'afraz';
  //   const formData = new FormData();

  //   formData.append('user[id]', 2);
  //   formData.append('user[profile_pic]', croppedImage);
  //   // eslint-disable-next-line no-use-before-define

  //   // addPhotoToUser(user, formData);
  // };
  console.log(croppedImage, croppedImageUrl);
  // Third
  const onImageLoaded = useCallback(img => {
    imgRef.current = img;
  }, []);

  const onCropChange = crop => {
    setCrop(crop);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const croppedImage = new File([u8arr], filename, {type: mime});
    setCroppedImage(croppedImage);
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const reader = new FileReader();
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setCroppedImageUrl(reader.result);
        dataURLtoFile(reader.result, 'cropped.jpg');
      };
    });
  };

  const onCropComplete = crop => {
    if (imgRef.current && crop.width && crop.height) {
      getCroppedImg(imgRef.current, crop);
      // setCroppedImageUrl(croppedImageUrl);
    }
  };

  return (
    <form>
      <label htmlFor="profile_pic" />
      <label htmlFor="profileImg">
        {loading ? (
          <CircularProgress color="primary" style={{marginTop: 35}} />
        ) : (
          <Avatar
            alt="Profile"
            src={userProfileImg}
            className={classes.profileIcon}
            // onChange={handleFile}
            // onClick={handleOpen}
          />
        )}

        <input id="profileImg" type="file" onChange={handleFile} hidden />
      </label>
      {/* <input type="file" id="profile_pic" onChange={handleFile} /> */}
      {src && (
        <CropDialog open={open} onClose={onClose} onSave={onSave}>
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
            // locked
            imageStyle={{maxHeight: '400px', width: 'auto'}}
          />
        </CropDialog>
      )}
      {/* <img src={croppedImageUrl} alt="jhui" /> */}
    </form>
  );
};

export default CropImage;
