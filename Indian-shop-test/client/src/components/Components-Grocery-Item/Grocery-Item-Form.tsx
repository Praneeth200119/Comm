import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Typography, Grid, Container } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import { Divider, Link } from '@mui/material';

interface GroceryItem {
  itemName: string;
  productId: string;
  tags: string;
  price: string;
  discount: string;
  description: string;
  images: FileList | null;
}

interface Props {
  initialItem?: GroceryItem;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    input: {
      display: "block",
    },
    link: {
      color: '#FF6600',
      fontSize: 16,
      fontFamily: 'Proxima Nova',
      fontWeight: 400,
      textDecoration: 'underline',
      wordWrap: 'break-word',
      marginRight: 30
    },
    submitButton: {
      color: '#FFF',
      background: '#FF6600'
    }
  })
);


const GroceryItemForm: React.FC<Props> = ({ initialItem }) => {
  const classes = useStyles();
  const [itemName, setItemName] = useState("");
  const [productId, setProductId] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (initialItem) {
      setItemName(initialItem.itemName);
      setProductId(initialItem.productId);
      setTags(initialItem.tags);
      setPrice(initialItem.price);
      setDiscount(initialItem.discount);
      setDescription(initialItem.description);
      setImages(initialItem.images);
    }
  }, [initialItem]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can perform further actions like sending data to backend
    console.log("Form submitted:", {
      itemName,
      productId,
      tags,
      price,
      discount,
      description,
      images,
    });
    // Reset form fields after submission
    resetForm();
  };

  const resetForm = () => {
    setItemName("");
    setProductId("");
    setTags("");
    setPrice("");
    setDiscount("");
    setDescription("");
    setImages(null);
  };

  const inputBoxStyle = {
    width: 400,
    height: 56,
    borderRadius: 4,
    border: '1px solid #D9D9D9',
  };

  return (
    <Container >
      <div className={classes.root} style={{ paddingBottom: 200 }}>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            <Grid container item xs={12}>
              <Typography variant="h3" gutterBottom >
                {initialItem ? "Edit Product Details" : "Add Product Details"}
              </Typography>
            </Grid>
            <Divider variant="middle" style={{ width: '100%' }} />
            <Grid container spacing={3} item xs={6}>
              <h2>Product Details</h2>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Prodcut Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  style={inputBoxStyle}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="No of Units"
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="SI Units"
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Unit Weight"
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Quantity"
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Category"
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <h2>Price Details</h2>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Price"
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Discount"
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Tags (Comma separated)"
                  value={tags}
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setTags(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder="Price"
                  value={price}
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Discount"
                  value={discount}
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  placeholder="Description"
                  value={description}
                  style={inputBoxStyle}
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <h2>Product Images</h2>
              </Grid>
              <Grid item xs={12}>
                <DragAndDropImages />
              </Grid>
            </Grid>
            <Divider variant="middle" style={{ width: '100%' }} />
            <Grid container spacing={2} item xs={12} style={{ padding: 20, alignItems: "center" }} justifyContent="flex-end">
              <Link className={classes.link} href="#" rel="noopener noreferrer">
                Cancel
              </Link>
              <Button className={classes.submitButton} type="submit" variant="contained" >
                {initialItem ? "Save Changes" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container >
  );
};

export default GroceryItemForm;

const DragAndDropImages = () => {
  const [images, setImages] = useState([]);

  const handleDrop = (droppedImages: any) => {
    // Handle dropped images
    // setImages([...images, ...droppedImages]);
  };

  return (
    <div>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText="Drag and drop your images here"
        onChange={handleDrop}
        filesLimit={6} // Limit the number of files
        maxFileSize={5000000} // Limit the size of each file (5MB)
        showAlerts={false} // Disable default alerts
      />
      {/* Render preview of uploaded images */}
      {images.map((file, index) => (
        <img key={index} src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
      ))}
    </div>
  );
};
