import { useContext } from "react";

import { TicketBasketContext } from "../../contexts/TicketBasketContext";
import {
  addTwoTent,
  removeTwoTent,
  addThreeTent,
  removeThreeTent,
  // greenOption,
} from "./ticketFunction";
export default function AddOnesCart() {
  const { ticketBasket, setTicketBasket } = useContext(TicketBasketContext);

  // Cart UI varibles:
  const totalTwoTent = ticketBasket.tent2PersonPrice * ticketBasket.tent2PersonAmount;
  const totalThreeTent = ticketBasket.tent3PersonPrice * ticketBasket.tent3PersonAmount;

  const totalPrice =
    totalTwoTent +
    totalThreeTent +
    (ticketBasket.isGreenCamping ? ticketBasket.greenCamping : 0) +
    ticketBasket.ticketPrice * ticketBasket.ticketAmount;
  const totalItems =
    ticketBasket.tent2PersonAmount +
    ticketBasket.tent3PersonAmount +
    ticketBasket.isGreenCamping +
    ticketBasket.ticketAmount;

  // Function for green option add-on
  function greenOption(e) {
    const checked = e.target.checked;
    if (checked) {
      setTicketBasket((old) => {
        return {
          ...old,
          isGreenCamping: true,
        };
      });
    } else {
      setTicketBasket((old) => {
        return {
          ...old,
          isGreenCamping: false,
        };
      });
    }
  }

  return (
    <section id="add-ons_cart">
      <div id="top-bar">
        <p>Add-on</p>
        <p>Quanity</p>
        <p>Price</p>
      </div>
      <article className="note">
        <p>Note: The price includes the crew setting up your tent</p>
      </article>

      <section className="add-ons_cart_content">
        <article className="two-person_ui">
          <div className="tent_name">
            <p>2 person</p>
            <p>Tent</p>
          </div>
          <div className="tent_ui">
            <button onClick={() => removeTwoTent(ticketBasket, setTicketBasket)}>-</button>
            <span className="amount">{ticketBasket.tent2PersonAmount}</span>
            <button onClick={() => addTwoTent(ticketBasket, setTicketBasket)}>+</button>
          </div>

          <div className="tent_total">
            {ticketBasket.tent2PersonAmount > 1 ? totalTwoTent : ticketBasket.tent2PersonPrice} kr.
          </div>
        </article>

        <article className="three-person_ui">
          <div className="tent_name">
            <p>3 person</p>
            <p>Tent</p>
          </div>
          <div className="tent_ui">
            <button onClick={() => removeThreeTent(ticketBasket, setTicketBasket)}>-</button>
            <span className="amount">{ticketBasket.tent3PersonAmount}</span>
            <button onClick={() => addThreeTent(ticketBasket, setTicketBasket)}>+</button>
          </div>

          <div className="tent_total">
            <p>
              {ticketBasket.tent3PersonAmount > 1 ? totalThreeTent : ticketBasket.tent3PersonPrice}{" "}
              kr.
            </p>
          </div>
        </article>

        <article className="green_camping_ui">
          <div className="green_name">
            <p>Green camping</p>
            <p>Option to help change the world</p>
          </div>

          <div className="green_ui">
            <input
              onChange={greenOption}
              type="checkbox"
              checked={ticketBasket.isGreenCamping}
              className="green-option_check"
            ></input>
          </div>

          <div className="green_total">
            <p>249 kr.</p>
          </div>
        </article>
      </section>
      <article className="total_bar">
        <p>Total ({totalItems} items)</p>
        <p className="total_price">{totalPrice} kr.</p>
      </article>
    </section>
  );
}
