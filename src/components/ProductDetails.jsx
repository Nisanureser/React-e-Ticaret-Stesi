import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slices/productSlice";
import "../css/ProductDetails.css";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { addToBasket, calculateBasket } from "../redux/slices/basketSlice";
import { addToStar } from "../redux/slices/starSlice";

function ProductDetails() {
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const { products, selectedProduct } = useSelector((store) => store.product);

  const { price, image, title, description } = selectedProduct;
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const addBasket = () => {
    const payload = {
      id,
      price,
      image,
      title,
      description,
      count,
    };
    dispatch(addToBasket(payload));
    dispatch(calculateBasket());
  };
  const addStar = () => {
    const payload = {
      id,
      price,
      image,
      title,
      description,
      count,
    };
    dispatch(addToStar(payload));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = () => {
    products &&
      products.map((product) => {
        if (product.id == id) {
          dispatch(setSelectedProduct(product));
        }
      });
  };
  return (
    <div>
      <div className="product_details">
        <div className="product_details_img">
          <img src={image} alt="" />
        </div>
        <div className="product_details_explanation">
          <h1>{title}</h1>
          <p>{description}</p>
          <h2>{price}₺</h2>
          <div className="icons">
            <CiCirclePlus onClick={increment} /> <span>{count}</span>{" "}
            <CiCircleMinus onClick={decrement} />
          </div>
          <div className="button">
            <button onClick={addBasket}>SEPETE EKLE</button>
            <CiStar onClick={addStar} className="starIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
