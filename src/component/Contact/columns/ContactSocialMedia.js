import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  COMPANY_FACEBOOK_URL,
  COMPANY_INSTAGRAM_URL,
} from "../../../const/const";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import useStyles from "../ContactStyled";

export const ContactSocialMedia = () => {
  const classes = useStyles();
  return (
    <div className="col-sm-6 text-left mt-5">
      <Typography variant="h2" className={classes.title}>
        Datos de Contacto
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          component="a"
          href={COMPANY_FACEBOOK_URL}
          className={classes.link}
          target="_blank"
        >
          <ListItemIcon>
            <FacebookIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText secondary="Facebook" />
        </ListItem>

        <ListItem
          button
          component="a"
          href={COMPANY_INSTAGRAM_URL}
          className={classes.link}
          target="_blank"
        >
          <ListItemIcon>
            <InstagramIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText secondary="Instagram" />
        </ListItem>

        <ListItem
          button
          component="a"
          href="mailto:trinanesc@gmail.com"
          className={classes.link}
          target="_blank"
        >
          <ListItemIcon>
            <EmailIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText secondary="trinanesc@gmail.com" />
        </ListItem>
      </List>
    </div>
  );
};
