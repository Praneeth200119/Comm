import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    text: {
        color: '#696767',
        fontSize: 16,
        fontFamily: 'Proxima Nova',
        fontWeight: 400,
        wordWrap: 'break-word',
    },
    link: {
        color: '#FF6600',
        fontSize: 16,
        fontFamily: 'Proxima Nova',
        fontWeight: 400,
        textDecoration: 'underline',
        wordWrap: 'break-word',
    },
    inputElements: {
        border: '1px solid #D9D9D9',
        borderRadius: theme.shape.borderRadius, // You can also add border radius if needed
        padding: theme.spacing(1),
    },
    submitButton: {
        color: '#FFF',
        background: '#FF6600'
    }
}));
