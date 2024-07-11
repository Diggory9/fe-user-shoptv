
import { ProductModel } from "@/models/product-model";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';


const CImageGallery = ({ product }: { product: ProductModel }) => {
    const selectedProductItem = product?.productItems?.find((item) => item.selected);
    const images = selectedProductItem?.productImages?.map((image) => ({
        original: image.url as string,
        thumbnail: image.url as string,
    })) || [];

    return (
        <div className="container mx-auto py-10">
            {images.length > 0 ? (
                <ImageGallery items={images} />
            ) : (
                <div>No images available.</div>
            )}
        </div>
    );
};
export default CImageGallery