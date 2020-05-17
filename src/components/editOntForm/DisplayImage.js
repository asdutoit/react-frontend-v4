import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 150,
    margin: 10,
    minWidth: 100,
    position: "relative",
  },
  modalRoot: {
    maxWidth: 1000,
    position: "absolute",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  delete: {
    position: "absolute",
    top: "0%",
    right: "0%",
  },
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const { image, ontId, setStateImages, stateImages } = props;
  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);
  const [deletingInProgress, setDeletingInProgress] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDelete = async () => {
    setDeletingInProgress(true);
    const response = await axios({
      method: "post",
      url: `http://localhost:7788/api/ont/image/${ontId}`,
      data: {
        image: image,
      },
    });
    setDeletingInProgress(false);
    if (response.data.res1.result === "ok") {
      stateImages.splice(stateImages.indexOf(image), 1);
      setStateImages([...stateImages]);
    }
  };

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="image-small"
            image={image}
            title="image-small"
            onClick={handleOpen}
          />
        </CardActionArea>
        <IconButton
          className={classes.delete}
          aria-label="settings"
          onClick={handleDelete}
        >
          {deletingInProgress ? <CircularProgress /> : <DeleteIcon />}
        </IconButton>
      </Card>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="image-modal-label"
        aria-describedby="image-modal-description"
      >
        {
          <Card style={modalStyle} className={classes.modalRoot}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="image-large"
                image={image}
                title="image-large"
              />
            </CardActionArea>
          </Card>
        }
      </Modal>
    </div>
  );
}
