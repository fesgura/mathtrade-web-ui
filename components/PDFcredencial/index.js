import React, { useCallback, useEffect, useRef } from "react";
import logoSrc from "/assets/img/logo_img.png";

import { cropWord } from "utils";
import I18N from "i18n";

const PDFcredencial = ({ user }) => {
  const canvasRef = useRef(null);

  const width = 1039;
  const height = 744;

  const drawImage = useCallback((props) => {
    const newImg = new Image();

    const onLoad = () => {
      props.ctx.drawImage(
        newImg,
        0,
        0,
        newImg.width,
        newImg.height,
        props.x,
        props.y,
        props.width,
        props.height
      );
    };
    newImg.addEventListener("load", onLoad);
    newImg.addEventListener("error", onLoad);
    newImg.src = props.src;
  }, []);

  useEffect(() => {
    if (user && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFF";
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, height);

      const p = 35;

      // LOGO
      const logoScale = 3;
      drawImage({
        x: p,
        y: p,
        width: logoScale * logoSrc.width,
        height: logoScale * logoSrc.height,
        src: logoSrc.src,
        ctx,
      });

      // avatar

      const avatar_w = 300;
      drawImage({
        x: width - p - avatar_w,
        y: p,
        width: avatar_w,
        height: avatar_w,
        src: user.avatar,
        ctx,
      });
      ctx.strokeRect(width - p - avatar_w, p, avatar_w, avatar_w);

      if (!user.avatar) {
        ctx.fillStyle = "rgb(240, 105, 105)";
        ctx.fillRect(width - p - avatar_w, p, avatar_w, avatar_w);
        ctx.font = "bold 100px Arial";
        ctx.fillStyle = "#FFF";
        ctx.fillText(
          user.username.substring(0, 1),
          width - p - 0.5 * avatar_w - 25,
          p + 0.5 * avatar_w + 25
        );
      }

      /////// LABELS
      ctx.fillStyle = "#AAA";
      ctx.font = "bold 32px Arial";
      ctx.fillText("USUARIO", p, 350);
      ctx.fillRect(p, 360, width - 2 * p, 2);

      ctx.fillText("NOMBRE y APELLIDO", p, 550);
      ctx.fillRect(p, 560, width - 2 * p, 2);

      /////// TEXTS
      ctx.fillStyle = "#000";
      ctx.font = "bold 74px Arial";
      ctx.fillText(cropWord(user.username, 22, "..."), p, 440);

      ctx.fillText(
        cropWord(`${user.first_name} ${user.last_name}`, 24, "..."),
        p,
        640
      );

      //
    }
  }, [user, canvasRef]);

  return (
    <>
      <p>
        <I18N id="UserCardSign.help.1" />
      </p>
      <p>
        <I18N id="UserCardSign.help.2" />
      </p>
      <div className="user-credencial-container">
        <canvas
          width={width}
          height={height}
          ref={canvasRef}
          className="user-credencial"
          title="credencial"
        />
      </div>
    </>
  );
};

export default PDFcredencial;
