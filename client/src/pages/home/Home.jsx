import React from "react";
import Notice from "../../components/notice/Notice";
import Poster from "../../components/poster/Poster";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useEffect } from "react";
import { getPosts, addPosts, addComments } from "../../redux/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  const [formPostValues, handlePostChange, reset] = useForm({
    descripcion: "",
  });

  const { descripcion } = formPostValues;

  const handlePost = () => {
    dispatch(addPosts({ descripcion }));
    reset();
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="home-container">
      <Poster />
      <div className="container d-flex justify-content-center">
        <div className="notice-container d-flex justify-content-center col col-8">
          <div className="col-12">
            <span>
              <ArrowCircleRightIcon onClick={handlePost} />
            </span>
            <input
              className="notice-input col-12 text-center"
              type="text"
              name="descripcion"
              placeholder="¿Tienes algún anuncio importante?"
              value={descripcion}
              onChange={handlePostChange}
            />
          </div>
          {loading ? (
            <h5 className="d-flex justify-content-center mt-5">Espere...</h5>
          ) : (
            <div className="notice-wrapper d-flex col-12">
              {posts.map((post) => (
                <Notice key={post.uid} {...post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
