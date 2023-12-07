import { useNavigate } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };


  return (
    <div className='navbar'>
        <div className='navContainer'>
            <span className='logo' onClick={handleNavigate}>Booking.com</span>
            <div className='navItems'>
                <button className='navButton'>Register</button>
                <button className='navButton'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar