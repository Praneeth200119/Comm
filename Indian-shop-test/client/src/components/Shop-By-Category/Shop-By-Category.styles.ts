import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const shopByCategory = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingTop: 50,
            paddingLeft: 40,
            paddingRight: 40,
        },
        media: {
            height: 300,
            width: "auto",
            margin: "auto",
        },
        cardContent: {
            textAlign: "left",
        },
        addButton: {
            marginTop: theme.spacing(2),
        },
        quantityControl: {
            display: "flex",
            alignItems: "center",
        },
        quantityInput: {
            width: 50,
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        mainTitle: {
            textAlign: "center",
            marginBottom: theme.spacing(4),
        },
    })
);

export const categoryCard = makeStyles((theme) => ({
    cardStyles: {
        maxWidth: 180,
        maxHeight: 180,
        borderRadius: 13,
        height: 180,
        width: 180,
        backgroundColor: "#F2F2F2",
    },
    imageStyles: {
        height: 130,
        width: 130,
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom:"-20px"
    },
    categoryTitle: {
        fontFamily: "Proxima Nova",
        fontSize: 16,
        fontWeight: 700,
        wordWrap: 'break-word',
        textAlign: 'center',
        width: '100%'
    },
    categoryTitleArea: {
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

