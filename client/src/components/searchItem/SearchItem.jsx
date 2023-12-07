import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchItem.css';

const searchItem = ( props) => {
    const { handleClick } = props;

    const onSearch = () => {
        handleClick();
    }
  return (
    <div className="searchItem">
        <div className="siImg">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/374636786.webp?k=b0789f2841990954378907aec065a17a8838bcdbff3e8dd7732fafc388788faa&o=&s=1" alt="" className='siAvt'/>
            <FontAwesomeIcon icon={faHeart} className="siHeart"/>
        </div>
        <div className="siContent">
            <div className="siAbout">
                <h2 className='siName'>Bay Hotel Urayasu-ekimae</h2>
                <div className="siAddress">
                    <span>Urayasu, Tokyo</span>
                    <span>Show on map</span>
                    <span>15.1 km from center</span>
                    <span>Subway Access</span>
                </div>
                <div className="siDes">
                    <span className='siRoom'>Moderate Queen Room - Non-Smoking</span>
                    <span className='siBed'>1 Queen Bed</span>
                    <p className='siCancel'>FREE cancellation • No prepayment needed</p>
                    <span className='siPromote'>You can cancel later, so lock in this great price today!</span>
                    <p className='siRemain'>Only 2 rooms left at this price on our site</p>
                </div>
            </div>
            <div className="siPrice">
                <div className="siRating">
                    <div>
                        <p>Excellent</p>
                        <span>856 reviews</span>
                    </div>
                    <button>8.7</button>
                </div>
                <div className="siDetails">
                    <p className="siTotal">VND 1,923,913</p>
                    <span className="siTax">Additional charges may apply</span>
                    <button className="siAvailable" onClick={onSearch}>See Availability</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default searchItem