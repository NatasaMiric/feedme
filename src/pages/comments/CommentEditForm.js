import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
  const { id, content, setDisplayEditForm, setComments } = props;
  const [editContent, setEditContent] = useState(content);
  const { setAlert } = useAlert();

  const handleChange = (event) => {
    setEditContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: editContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: editContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setDisplayEditForm(false);
    } catch (err) {      
      setAlert("Something went wrong, please try again!", "danger");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={editContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setDisplayEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;