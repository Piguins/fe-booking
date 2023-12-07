import './mailList.css';

const MailList = () => {
  return (
    <div className="mailList">
        <h2>Save time, save money!</h2>
        <p>Sign up and we'll send the best deals to you</p>
        <div className='inputControl'>
            <input type="text" className="formInput" placeholder="Your email"></input>
            <input type="submit" className="submitBtn" value="Subscribe" />
        </div>
        <div className='info'>
            <input type="checkbox" className="checkbox"></input>
            <p className="infoDes">Send me a link to get the FREE Booking.com app!</p>
        </div>
    </div>
  )
}

export default MailList