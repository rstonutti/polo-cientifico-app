import { Image, Transformation } from "cloudinary-react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addComments, deletePosts } from "../../redux/actions/post";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CloseIcon from "@mui/icons-material/Close";
import "./notice.scss";
import Comments from "../comments/Comments";

const Notice = ({ uid, autor, created_at, descripcion, comentario }) => {
  const dispatch = useDispatch();
  const { uid: id } = useSelector((state) => state.auth);

  const [formCommentValues, handleCommentChange, reset] = useForm({
    descripcionComment: "",
  });

  const { descripcionComment } = formCommentValues;

  const handleComment = (uid) => {
    dispatch(addComments({ descripcion: descripcionComment, uid }));
    reset();
  };

  return (
    <div className="notice-notice" key={uid}>
      <div className="notice-autor d-flex">
        <div className="d-flex">
          <div className="avatar">
            <Image cloudName="dawjd5cx8" publicId={autor.avatar}>
              <Transformation
                height="40"
                width="40"
                radius="max"
                aspectRatio="1.5"
                crop="fill"
              />
            </Image>
          </div>
          <div className="autor">
            <div className="name step--0 fw-bold">{autor.nombre}</div>
            <div className="date step--2 fst-italic">{created_at}</div>
          </div>
        </div>
        {id === autor._id && (
          <div className="notice-autor-close-icon">
            <CloseIcon
              onClick={() => {
                dispatch(deletePosts({ uid }));
              }}
            />
          </div>
        )}
      </div>
      <div className="content-comment d-flex step-0">{descripcion}</div>
      <div className="comment-wrapper">
        <div className="comment-button step--2">
          Comentarios ({comentario.length})
        </div>
        {comentario.map((comment) => (
          <Comments key={comment._id} {...comment} />
        ))}
        <div className="input-comment col-12 d-flex">
          <div className="col-12">
            <span>
              <ArrowCircleRightIcon onClick={() => handleComment(uid)} />
            </span>
          </div>
          <input
            className="notice-input col-11 text-center step--1"
            type="text"
            name="descripcionComment"
            placeholder="Escribe un comentario..."
            value={descripcionComment}
            onChange={handleCommentChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Notice;
