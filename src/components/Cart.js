import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade'

export default class Cart extends Component {
  constructor( props ){
    super(props);
    this.state={
        showCheckout :false,
        name:"",
        email:"",
        adress:"",
    }; //show checkiut condition
  }
  handleInput = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  createOrder = (e) =>{
    e.preventDefault();//prevent refresh of page
    const order = {
        name: this.state.name,
        email: this.state.email,
        adress: this.state.adress,
        cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  }
  render() {
    const {cartItems} = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
             <div className='cart cart-header'>The cart is empty</div>
            ) : (
            <div className='cart cart-header'>You have {cartItems.length} items in the cart {" "} </div>
        )}
        <div>
        <div className='cart'>
        <Fade left cascade={true}>
        <ul className='cart-items'>
            {cartItems.map((item) => (
                <li key={item._id}>
                    <div>
                        <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                        <div>{item.title}</div>
                        <div className='right'>
                            {formatCurrency(item.price)} x {item.count} {" "}
                            <button onClick={() => this.props.removeFromCart(item)}>Remove</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        </Fade>
      </div>
      {cartItems.length !== 0 && ( //conditional display to cart not empty
      <div>
        <div className='cart'>
         <div className='total'>
            <div>
                Total: {" "}
                {formatCurrency(cartItems.reduce((a, c) => a+c.price * c.count,0))}
            </div>
            <button onClick={() => this.setState({ showCheckout:true})} className='button primary'>Proceed</button>
         </div>
        </div>
        {this.state.showCheckout && (
            <Fade right cascade={true}>
            <div className='cart'>
                <form onSubmit={this.createOrder}>
                    <ul className='form-container'>
                        <li>
                            <label>Email</label>
                            <input name="email" type="email" required onChange={this.handleInput}></input>
                        </li>
                        <li>
                            <label>Name</label>
                            <input name="name" type="text" required onChange={this.handleInput}></input>
                        </li>
                        <li>
                            <label>Adress</label>
                            <input name="adress" type="text" required onChange={this.handleInput}></input>
                        </li>
                        <li>
                            <button type='submit' className='button primary'>Checkout</button>
                        </li>
                    </ul>
                </form>
            </div>
            </Fade>
        )}
        </div>
      )}

      </div>
    </div>
    );
  }
}
