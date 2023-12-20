import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <Link className="searchItem" to={`/rooms/${item.id}`}>
      <img src={item.images[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">100m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.description}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${item.priceAmount}</span>
          <span className="siTaxOp">{item.priceCurrency}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/rooms/${item.id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
