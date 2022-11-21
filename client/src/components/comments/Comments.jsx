import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions/post";
import "./comment.scss";

const Comments = ({ _id, autor, created_at, descripcion }) => {
  const dispatch = useDispatch();
  return (
    <div className="comment" key={_id}>
      <div className="comment-autor d-flex justify-content-between">
        <div className="autor">
          <div className="name step--1 fw-bold">{autor.nombre}</div>
          <div className="date step--2 fst-italic">{created_at}</div>
        </div>
        <div className="notice-autor-close-icon">
          <CloseIcon
            onClick={() => {
              dispatch(deleteComment({ _id }));
            }}
          />
        </div>
      </div>
      <div className="content d-flex step--1">{descripcion}</div>
    </div>
  );
};

export default Comments;
