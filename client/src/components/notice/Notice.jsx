import { Image, Transformation } from "cloudinary-react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./notice.scss";
import { useEffect } from "react";
import { getPosts } from "../../redux/actions/post";
import { useDispatch, useSelector } from "react-redux";

const Notice = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);

  if (loading) {
    return <h5>Espere...</h5>;
  }

  return (
    <div className="notice-container d-flex justify-content-center col col-8">
      <div className="col-12">
        <span>
          <ArrowCircleRightIcon />
        </span>
        <input
          className="notice-input col-12 text-center"
          type="text"
          placeholder="¿Tienes algún anuncio importante?"
        />
      </div>
      <div className="notice-wrapper d-flex col-12">
        {posts.map((post) => (
          <div className="notice-notice" key={post.uid}>
            <div className="notice-autor d-flex">
              <div className="avatar">
                <Image cloudName="dawjd5cx8" publicId="20190721_192752_dagpjk">
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
                <div className="name step--0 fw-bold">{post.autor.nombre}</div>
                <div className="date step--1">{post.created_at}</div>
              </div>
            </div>
            <div className="content d-flex step-0">{post.descripcion}</div>
            <div className="comment-wrapper">
              <div className="comment-button step--1">
                Comentarios ({post.comentario.length})
              </div>
              {post.comentario.map((comment) => (
                <div className="comment" key={comment._id}>
                  <div className="comment-autor d-flex">
                    <div className="autor">
                      <div className="name step--1 fw-bold">
                        {comment.autor.nombre}
                      </div>
                      <div className="date step--1">{comment.created_at}</div>
                    </div>
                  </div>
                  <div className="content d-flex step--1">
                    {comment.descripcion}
                  </div>
                </div>
              ))}
              <div className="input-comment col-12 d-flex">
                <div className="col-12">
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                </div>
                <input
                  className="notice-input col-11 text-center step--1"
                  type="text"
                  placeholder="Escribe un comentario..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
