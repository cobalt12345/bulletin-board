import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";

export const keyMap = {
    SAVE_MESSAGE: ['command+enter', 'ctrl+enter']
};

export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: '200px',
    // lineHeight: '200px',
    width: '250px',
    padding: 5,
    fontSize: '3rem',
    overflow: 'scroll',
    fontFamily: 'Reenie Beanie',
    color: '#000'
}));


