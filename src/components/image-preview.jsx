const ImagePreview = ({ image, altText = "Vista previa de la imagen", className = "img-fluid" }) => {
    const defaultImage = "/img/image-not-found.png";

    return (
        <div className="col-12 mb-4">
            <img src={image || defaultImage} alt={altText} className={className} />
        </div>
    );
};

export default ImagePreview;
