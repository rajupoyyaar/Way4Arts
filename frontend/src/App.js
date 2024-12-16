import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import Header from './Components/Header';
import Footer from './Components/Footer';
import LandingPage from './Pages/LandingPage';
import ArtistRegistration from './Pages/ArtistRegistration';
import ArtistLogin from './Pages/ArtistLogin';
import UploadArt from './Pages/UploadArt';
import CustomerRegistration from "./Pages/Customers/CustomerRegistration"
import CustomerLogin from './Pages/Customers/CustomerLogin';
import PlaceOrder from './Pages/Orders/PlaceOrder';
import TrackOrder from './Pages/Orders/TrackOrder';
import ManageOrders from "./Pages/ManageOrders"

function App() {
  return (
    <div className='app-container'>
      <Header />
      <main className="main-screen">
        <Routes>
          <Route path='/' Component={LandingPage} exact />
          <Route path='/artist-registration' Component={ArtistRegistration} />
          <Route path='/artist-login' Component={ArtistLogin}/>
          <Route path="/upload-art" Component={UploadArt} />

          <Route path="/customer-registration" Component={CustomerRegistration}/>
          <Route path="/customer-login" Component={CustomerLogin}/>

          <Route path="/place-order" Component={PlaceOrder}/>
          <Route path="/track-orders" Component={TrackOrder}/>

          <Route path="/artist/manage-orders" Component={ManageOrders} />
        </Routes>
      </main>
      <Footer />  
    </div>
  );
}

export default App;
