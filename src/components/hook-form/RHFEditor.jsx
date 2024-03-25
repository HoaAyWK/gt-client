import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';

import ACTION_STATUS from '../../constants/actionStatus';


const StyledBox = styled(Box)(({ theme }) => ({
  '& .rdw-editor-wrapper': {
    border:  `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius
  },
  '& .rdw-editor-toolbar': {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  '& .rdw-option-wrapper': {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`
  },
  '& .rdw-dropdown-wrapper': {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`
  },
  '& .rdw-option-active': {
    backgroundColor: theme.palette.background.neutral,
  },
  '& .rdw-editor-main': {
    minHeight: 150,
    cursor: 'text',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  '& .error .rdw-editor-wrapper': {
    border: `1px solid ${theme.palette.error.main}`,
  }
}));


const RHFEditor = ({ name, label, initialContent, actionStatus, ...other }) => {
  const { control } = useFormContext();
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  useEffect(() => {
    if (initialContent) {
      const contentState = stateFromHTML(initialContent);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialContent, setEditorState]);

  useEffect(() => {
    if (actionStatus && actionStatus === ACTION_STATUS.SUCCEEDED) {
      setEditorState(EditorState.createEmpty());
    }
  }, [actionStatus]);


  return (
    <StyledBox>
      <Box sx={{ mb: 1 }}>
        <Typography variant='subtitle2' color='text.secondary'>
          {label}
        </Typography>
      </Box>
      <Controller
        name={name}
        control={control}
        defaultValue={initialContent}
        render={({ field, fieldState: { error } }) => {

          const onInternalChange = (currentContentState) => {
            const html = draftToHtml(currentContentState);
            const cleanedHtml = html === `<p></p>\n` ? '' : html;

            field.onChange(cleanedHtml);
          };

          return (
            <Box className={error ? 'error' : ''}>
              <Editor
                {...other}
                onChange={onInternalChange}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                  fontFamily: {
                    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                  },
                }}
              />
              {error && (
                <Typography variant='caption' color='error' sx={{ mt: 1, ml: 2 }}>{error.message}</Typography>
              )}
            </Box>
          )}
        }
      />
    </StyledBox>
  );
};

export default RHFEditor;
