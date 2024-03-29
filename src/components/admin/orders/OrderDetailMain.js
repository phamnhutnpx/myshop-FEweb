import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getOrderDetails, isPaidOrder } from "./../../../Redux/Actions/orderActions";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import moment from "moment";

const OrderDetailmain = (props) => {
    const { orderId } = props;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

    const orderIsPaid = useSelector((state) => state.orderIsPaidAdmin);
    const { loading: loadingIsPaid, success: successIsPaid } = orderIsPaid;

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId, successDelivered, successIsPaid]);

    const deliverHandler = () => {
        if (window.confirm("Are you sure?")) {
            dispatch(deliverOrder(order));
        }
    };

    const isPaidHandler = () => {
        if (window.confirm("Are you sure?")) {
            dispatch(isPaidOrder(order));
        }
    };

    return (
      <section className="content-main">
        <div className="content-header">
          <Link to="/admin/orders" className="btn btn-dark text-white btn-size">
            Back To Orders
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="card">
            <header className="card-header p-3 Header-green">
              <div className="row align-items-center ">
                <div className="col-lg-6 col-md-6">
                  <span>
                    <i className="far fa-calendar-alt mx-2"></i>
                    <b className="text-white">{moment(order.createdAt).format("llll")}</b>
                  </span>
                  <br />
                  <small className="text-white mx-3 ">Order ID: {order._id}</small>
                </div>
                <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                  <select className="form-select d-inline-block" style={{ maxWidth: "200px" }}>
                    <option>Change status</option>
                    <option>Awaiting payment</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                  <Link className="btn btn-success ms-2" to="#">
                    <i className="fas fa-print"></i>
                  </Link>
                </div>
              </div>
            </header>
            <div className="card-body">
              {/* Order info */}
              <OrderDetailInfo order={order} />

              <div className="row">
                <div className="col-lg-9">
                  <div className="table-responsive">
                    <OrderDetailProducts order={order} loading={loading} />
                  </div>
                </div>
                {/* Payment Info */}
                <div className="col-lg-3">
                  <div className="box shadow-sm bg-light">
                    {order?.isDelivered ? (
                      <button className="btn btn-success col-12">
                        DELIVERED AT ( {moment(order.isDeliveredAt).format("MMM Do YY")})
                      </button>
                    ) : (
                      <>
                        {loadingDelivered && <Loading />}
                        <button onClick={() => deliverHandler()} className="btn btn-dark col-12 btn-size">
                          MARK AS DELIVERED
                        </button>
                      </>
                    )}
                    {order.isPaid ? (
                      <button className="btn btn-success col-12 mt-2">
                        IS PAID AT ( {moment(order.isPaidAt).format("MMM Do YY")})
                      </button>
                    ) : (
                      <>
                        {loadingIsPaid && <Loading />}
                        <button onClick={isPaidHandler} className="btn btn-dark col-12 btn-size mt-2">
                          MARK AS IS PAID
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
};

export default OrderDetailmain;
