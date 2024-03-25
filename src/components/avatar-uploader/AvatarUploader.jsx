import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';

import { RHFUploadFile } from '../hook-form'
import Iconify from '../iconify';
import {
  StyledAvatar,
  StyledBoxImage,
  StyledDisplayUploader,
  StyledUploaderArea,
  StyledImageWrapper,
  StyledPlaceHolder
} from './styles';

const AvatarUploader = (props) => {
  const { avatarUrl, name } = props;
  const imageRef = useRef();
  const [image, setImage] = useState(avatarUrl);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClick = async () => {
    imageRef?.current?.click();
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);

      setImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <StyledUploaderArea role='presentation' tabIndex={0}>
      <RHFUploadFile
        name={name}
        style={{ display: 'none' }}
        tabIndex={-1}
        imageRef={imageRef}
        handleSelectFile={handleSelectFile}
      />

      <StyledDisplayUploader component='span'>
        <StyledImageWrapper>
          {image ?
              (<StyledBoxImage component='img' alt='avatar' src={image} />)
            :
              (<StyledAvatar />)}
        </StyledImageWrapper>
      </StyledDisplayUploader>
      <StyledPlaceHolder onClick={handleClick}>
        <Iconify icon='ant-design:camera-outlined' width={25} height={25} />
        <Typography varint='body1' color='white'>
          Upload Photo
        </Typography>
      </StyledPlaceHolder>
    </StyledUploaderArea>
  );
};

export default AvatarUploader;
