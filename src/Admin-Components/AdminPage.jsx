import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import AdminNavbar from './AdminNavbar'
import AllProducts from '../Admin-Product-Component/AllProducts'
import AllCategories from '../Category-Components/AllCategories'
import AddCategory from '../Category-Components/AddCategory'
import AddProduct from '../Admin-Product-Component/AddProduct'
import AdminLogOut from './AdminLogOut'
import UpdateProduct from '../Admin-Product-Component/UpdateProduct'
import AllUsers from '../Admin-User-Component/AllUsers'
import AddUser from '../Admin-User-Component/AddUser'
import UpdateCategory from '../Category-Components/UpdateCategory'
import AllOrders from './AllOrders'
import OrderedItems from './OrderedItems'
import UploadImage from '../Admin-Product-Component/UploadImage'
import HomeNavbar from '../MainPage-Components/HomeNavbarUser'
import DeliveryPartners from '../Admin-User-Component/DeliveryPartners'
import UpdateDeliveryPartner from '../Admin-User-Component/UpdateDeliveryPartner'
import AddDeliveryPartner from '../Admin-User-Component/AddDeliveryPartner'
import UpdateUser from '../Admin-User-Component/UpdateUser'


const AdminPage = () => {
  return (
    <Router>
      <HomeNavbar />
      <AdminNavbar />
      <Switch>
        <Route exact path="/admin" component={AdminLogin}></Route>
        <Route exact path="/addadmin" component={AddUser}></Route>
        <Route exact path="/orders/:id" component={OrderedItems}></Route>
        <Route exact path="/uploadimage/:id" component={UploadImage}></Route>
        <Route exact path="/allorders" component={AllOrders}></Route>
        <Route exact path="/adminnavbar" component={AdminNavbar}></Route>
        <Route exact path="/productsall" component={AllProducts}></Route>
        <Route exact path="/allcategories" component={AllCategories}></Route>
        <Route exact path="/addcategory" component={AddCategory}></Route>
        <Route exact path="/addproduct" component={AddProduct}></Route>
        <Route exact path="/alogout" component={AdminLogOut}></Route>
        <Route exact path="/allusers" component={AllUsers}></Route>
        <Route exact path="/deliverypartner" component={DeliveryPartners}></Route>
        <Route exact path="/editdeliverypartner/:id" component={UpdateDeliveryPartner}></Route>
        <Route exact path="/adddeliverypartner" component={AddDeliveryPartner}></Route>
        <Route exact path="/editproduct/:id" component={UpdateProduct}></Route>
        <Route exact path="/edituser/:id" component={UpdateUser}></Route>
        <Route exact path="/editcategory/:id" component={UpdateCategory}></Route>
      </Switch>
    </Router>

  );
}

export default AdminPage;