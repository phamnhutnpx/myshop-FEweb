import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { listCommentProductsAdminAll } from "../../../Redux/Actions/productActions";
import { useEffect } from "react";

const CommentComponent = () => {
  const dispatch = useDispatch();
  const getAllComment = useSelector((state) => state.productListCommentAdmin);
  const { comments } = getAllComment;
  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = "../images/avatar/default.png";
  };

  const loadDataComment = useCallback(() => {
    dispatch(listCommentProductsAdminAll());
  }, [dispatch]);

  useEffect(() => loadDataComment(), [loadDataComment]);

  return (
    <div className="wrap-comment p-3">
      <h3>PRODUCT COMMENT</h3>
      <div className="list-comment rounded mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Content</th>
              <th>Author</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {comments?.length > 0 ? (
              comments?.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/products/${item.product}`}>{item.content}</Link>
                    </td>
                    <td>
                      <img
                        className="img-xs rounded-circle p-1"
                        src={item.user.avatarUrl}
                        onError={onAvatarLoadError}
                        alt="User avatar"
                      />
                      {item.user.name}
                    </td>
                    <td>{moment(item.createdAt).calendar()}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-2 bg-light border">
                  There are no comments for this product
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CommentComponent;
