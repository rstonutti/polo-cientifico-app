import { Image, Transformation } from "cloudinary-react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./notice.scss";

const Notice = () => {
  return (
    <div className="notice-container d-flex justify-content-center col col-8">
      <div className="col-12">
        <span>
          <ArrowCircleRightIcon />
        </span>
        <input
          className="notice-input col-12 text-center"
          type="text"
          placeholder="¿Tiene algún anuncio importante?"
        />
      </div>
      <div className="notice-wrapper d-flex col-12">
        <div className="notice-notice">
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
              <div className="name step--0 fw-bold">Rodrigo</div>
              <div className="date step--1">15-04-2022</div>
            </div>
          </div>
          <div className="content d-flex step-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            laudantium ut natus. Expedita impedit eius nostrum pariatur commodi
            illum alias, aliquid, veniam repellendus quod, magni ex corrupti
            tempora explicabo mollitia.
          </div>
          <div className="comment-wrapper">
            <div className="comment-button step--1">Comentarios (4)</div>
            <div className="comment">
              <div className="comment-autor d-flex">
                {/* <div className="avatar">
                  <Image
                    cloudName="dawjd5cx8"
                    publicId="20190721_192752_dagpjk"
                  >
                    <Transformation
                      height="20"
                      width="20"
                      radius="max"
                      aspectRatio="1.5"
                      crop="fill"
                    />
                  </Image>
                </div> */}
                <div className="autor">
                  <div className="name step--1 fw-bold">Rodrigo</div>
                  <div className="date step--1">15-04-2022</div>
                </div>
              </div>
              <div className="content d-flex step--1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus laudantium ut natus. Expedita impedit eius nostrum
                pariatur commodi illum alias, aliquid, veniam repellendus quod,
                magni ex corrupti tempora explicabo mollitia.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
