import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { OptionsDropdown } from "../../components/OptionsDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import ModalAlert from "../../components/ModalAlert";
import useAlert from "../../hooks/useAlert";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setRecipe,
    setComments
  } = props;

  const [displayEditForm, setDisplayEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { setAlert } = useAlert();
  const [show, setShow] = useState(false);

  const showDeleteModal = (event) => {
    setShow(true);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`)
      setRecipe(prevRecipe => ({
        results: [{
          ...prevRecipe.results[0],
          comments_count: prevRecipe.results[0].comments_count - 1
        }]
      }))
      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      setAlert("Your comment is deleted successfuly!", "success");
    } catch (err) {
      setAlert("Something went wrong, please try again!", "danger");
    };
    setShow(false);
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {displayEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setDisplayEditForm={setDisplayEditForm} />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !displayEditForm && (
          <OptionsDropdown
            handleEdit={() => setDisplayEditForm(true)}
            handleDelete={showDeleteModal}
          />
        )}
      </Media>
      <ModalAlert
        show={show}
        handleClose={() => setShow(false)}
        deleteConfirm={handleDelete}
        title="Delete confirmation"
        message={"Are you sure that you want to delete this comment?"}
      />
    </>
  );
};

export default Comment;