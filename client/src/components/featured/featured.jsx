import './featured.css';

const featured = () => {
  return (
    <div className='featured'>
        <div className='featuredContainer'>
            <div className='featuredHaft'>
                <div className='featuredItem'>
                    <div className='fItemContent'>
                        <h2 className='featuredTitle'>India</h2>
                        <span className='featuredFlag'></span>
                    </div>
                </div>
                <div className='featuredItem'>
                    <div className='fItemContent'>
                        <h2 className='featuredTitle'>Phu Quoc</h2>
                        <span className='featuredFlag'></span>
                    </div>
                </div>
            </div>
            <div className='featuredThird'>
                <div className='featuredItem'>
                    <div className='fItemContent'>
                        <h2 className='featuredTitle'>Tokyo</h2>
                        <span className='featuredFlag'></span>
                    </div>
                </div>
                <div className='featuredItem'>
                    <div className='fItemContent'>
                        <h2 className='featuredTitle'>Osaka</h2>
                        <span className='featuredFlag'></span>
                    </div>
                </div>
                <div className='featuredItem'>
                    <div className='fItemContent'>
                        <h2 className='featuredTitle'>Zurich</h2>
                        <span className='featuredFlag'></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default featured