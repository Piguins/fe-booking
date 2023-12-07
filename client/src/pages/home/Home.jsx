import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import PropertyList from '../../components/propertyList/PropertyList';
import Building from '../../components/building/Building';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import Promote from '../../components/promote/Promote';
import './home.css'


const Home = () => {

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h2 className="title">Browse by property type</h2>
        <PropertyList />
        <Featured />
        <h2 className="title">Get inspiration for your next trip</h2>
        <Promote />
        <h2 className="title">Homes guests love</h2>
        <Building />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home
