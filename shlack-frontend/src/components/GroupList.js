import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box, Avatar, Grid, List, ListItem, ListItemText, Divider} from "@material-ui/core";
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { getGroups } from '../store/actions/group';
import { useEffect } from 'react';
import { Route, useParams, Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  panelHeader: {
    height: "3em",
    color: theme.typography.color,
    paddingLeft: "1em"
  },
  root: {
    width: '100%',
    maxWidth: 360,
  },
  groupDiv: {
    height: "5vh"
  },
  groupText: {
    color: "white",
    width: "17vw",
    height: "4vh"
  },
  addIcon: {
    color: "white"
  },
  navLink: {
    textDecoration: "none"
  }
}));

const GroupList = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);
  const groups = useSelector((state) => state.group.groupList)

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  const classes = useStyles();
  if (!groups) {
    return null;
  }
  return (
    <Grid container>
      <Grid container direction="row" justify="space-between" alignItems="center" className={classes.panelHeader}>
        <Grid item>
          <Typography variant="subtitle1" >
            Groups
          </Typography>
        </Grid>
        <Grid item>
          <IconButton backgroundColor="white" >
            <AddIcon className={classes.addIcon}/>
          </IconButton>
          {/* {formVisible ? (
            <ChannelForm token={token} />
          ) : (
            null
        )} */}
        </Grid>
      </Grid>
      <Grid container >
        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {groups.map(group => {
            return (
              <ListItem button key={group.id} className={classes.groupDiv} >
                <Link to={`/groups/${group.id}`} className={classes.navLink}>
                  <ListItemText className={classes.groupText} primary={`# Group`} />
                  <Divider/>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default GroupList;
