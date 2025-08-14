import type { UploadProps } from '../types';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { mergeClasses } from 'minimal-shared/utils';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';

import { uploadClasses } from '../classes';
import { RejectedFiles } from '../components/rejected-files';
import { getFileMeta, useFilePreview } from '../../file-thumbnail';
import {
  UploadArea,
  PreviewImage,
  UploadContent,
  UploadWrapper,
  PlaceholderContainer,
} from './styles';

// ----------------------------------------------------------------------

export function UploadAvatar({
  sx,
  error,
  value,
  disabled,
  className,
  slotProps,
  helperText,
  loading = false,
  hideFilesRejected = false,
  ...dropzoneOptions
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    disabled,
    multiple: false,
    accept: { 'image/*': [] },
    ...dropzoneOptions,
  });

  const file = !Array.isArray(value) ? value : null;
  const hasSelectedFile = !!file;
  const hasError = isDragReject || !!error;
  const showFilesRejected = !hideFilesRejected && fileRejections.length > 0;

  const fileMeta = getFileMeta(file);
  const { previewUrl } = useFilePreview(file);

  const renderPlaceholder = () => (
    <PlaceholderContainer className={uploadClasses.placeholder.root}>
      <Iconify icon="solar:camera-add-bold" width={32} className={uploadClasses.placeholder.icon} />
      <Typography variant="caption" className={uploadClasses.placeholder.title}>
        {hasSelectedFile ? 'Update photo' : 'Upload photo'}
      </Typography>
    </PlaceholderContainer>
  );

  const renderLoading = () =>
    loading && (
      <CircularProgress
        thickness={1}
        size="100%"
        sx={{ zIndex: 9, top: 0, left: 0, position: 'absolute' }}
      />
    );

  const renderPreview = () =>
    hasSelectedFile && previewUrl && <PreviewImage alt={fileMeta.name} src={previewUrl} />;

  return (
    <UploadWrapper {...slotProps?.wrapper} className={uploadClasses.wrapper}>
      <UploadArea
        {...getRootProps()}
        className={mergeClasses([uploadClasses.avatar, className], {
          [uploadClasses.state.dragActive]: isDragActive,
          [uploadClasses.state.disabled]: disabled,
          [uploadClasses.state.error]: hasError,
          [uploadClasses.state.hasFile]: hasSelectedFile,
        })}
        sx={sx}
      >
        <input {...getInputProps()} />
        <UploadContent>
          {renderPreview()}
          {renderPlaceholder()}
        </UploadContent>
        {renderLoading()}
      </UploadArea>

      {helperText && helperText}
      {showFilesRejected && <RejectedFiles files={fileRejections} {...slotProps?.rejectedFiles} />}
    </UploadWrapper>
  );
}
