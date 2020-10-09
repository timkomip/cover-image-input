import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useMemo, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "inline-block",
    position: "relative",
  },
  img: {
    maxWidth: 300,
    maxHeight: 300,
    boxShadow: theme.shadows[3],
  },
  placeholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 300,
    boxShadow: theme.shadows[3],
    cursor: "pointer",
  },
  delete: {
    backgroundColor: theme.palette.grey[200],
    boxShadow: theme.shadows[3],
    position: "absolute",
    top: -10,
    right: -10,
    background: "white",
    "&:hover": {
      background: "white",
    },
  },
}));

function getDataUrl(file) {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      res(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

function uniqueId() {
  return Math.random().toString("16").slice(3);
}

export default function CoverImageInput({ file, onChange }) {
  const inputRef = useRef();
  const classes = useStyles();
  const id = useMemo(() => `upload-${uniqueId()}`, []);
  const [previewSrc, setPreviewSrc] = useState(null);

  const handleDeleteClick = () => {
    inputRef.current.value = "";
    onChange(null);
    setPreviewSrc(null);
  };

  const handleInputChange = async (e) => {
    const file = inputRef.current.files[0];
    onChange(file);
    setPreviewSrc(await getDataUrl(file));
  };

  return (
    <>
      <input
        id={id}
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleInputChange}
      />
      {!file ? (
        <label htmlFor={id} className={classes.placeholder}>
          <Typography color="textSecondary">
            Click to select an image
          </Typography>
        </label>
      ) : (
        <div className={classes.container}>
          <IconButton className={classes.delete} onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <img src={previewSrc} className={classes.img} alt="Cover Art" />
        </div>
      )}
    </>
  );
}
