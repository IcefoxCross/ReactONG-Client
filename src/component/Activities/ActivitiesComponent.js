import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, TextField, Container, Box } from "@material-ui/core/";
import {
  updateActivities,
  createActivities,
  getActivityById,
} from "../../services/querys/activitiesServices";
import useStyles from "./ActivitiesMaterialStyles";
import {
  CreateActivitiesSuccess,
  UpdateActivitiesSuccess,
} from "../Alert/AlertComponent";
import { useHistory, useParams } from "react-router";

const ActivitiesComponent = () => {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);
  const [img, setImg] = useState();
  const [formData, setFormData] = useState(new FormData());
  const [emptyFields, setEmptyFields] = useState(true);
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    handleEmptyFields();
  }, [activities]);

  useEffect(() => {
    if (id) {
      const fetchActivities = async () => {
        const activities = await getActivityById(id);
        setActivities(activities);
        setImg(activities.image);
      };
      fetchActivities();
      if (!activities.content) {
        fetchActivities(id);
      }
    }
  }, []);

  const changeHandler = (event) => {
    activities[event.target.id] = event.target.value;
    setActivities({ ...activities });
  };

  const handleImg = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    const image = event.target.files[0];
    formData.append("image", image);
    setFormData(formData);
  };

  const clearForm = () => {
    for (const property in activities) {
      activities[property] = "";
      setActivities({ ...activities });
    }
    setFormData(new FormData());
    setImg([]);
    setEmptyFields(true);
  };

  const handleSubmit = () => {
    if (img === undefined) {
      formData.append("image", "");
    }
    if (!activities.id) {
      for (const property in activities) {
        formData.append(property, activities[property]);
      }
      setFormData(formData);
      if (createActivities(formData)) {
        clearForm();
        CreateActivitiesSuccess();
        setTimeout(function () {
          history.push("/backoffice/activities");
          window.location.reload();
        }, 3000);
      }
    } else {
      for (const property in activities) {
        formData.append(property, activities[property]);
      }
      setFormData(formData);
      updateActivities(formData, activities.id);
      UpdateActivitiesSuccess();
      history.push("/backoffice/activities");
      window.location.reload();
    }
  };

  const handleEmptyFields = () => {
    if (!activities.name || !activities.content) {
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
    }
  };

  return (
    <Container>
      <Box p={2} m={2}>
        <h3>{!id ? "Crear" : "Modificar"} Actividad</h3>
      </Box>
      <form className={classes.root}>
        <TextField
          id="name"
          label="Name"
          value={activities.name || ""}
          onChange={changeHandler}
        />
        <CKEditor
          editor={ClassicEditor}
          data={!activities.id ? "" : activities.content}
          config={{
            removePlugins: [
              "ImageCaption",
              "ImageStyle",
              "ImageToolbar",
              "MediaEmbed",
            ],
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            activities["content"] = data;
            setActivities({ ...activities });
          }}
        />
        <img src={img} />
        <div>
          <Button
            className={classes.button}
            variant="contained"
            component="label">
            Agregar Imagen
            <input type="file" onChange={handleImg} id="image" hidden />
          </Button>
        </div>
        <Box p={2} m={2}>
          <Button
            className={classes.button}
            variant="contained"
            component="label"
            onClick={handleSubmit}
            disabled={emptyFields}>
            {!id ? "Crear" : "Modificar"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ActivitiesComponent;
