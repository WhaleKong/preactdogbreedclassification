import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as tf from "@tensorflow/tfjs";
import Particles from "preact-particles";
import useLoadDogModel from "../../components/useLoadDogModel";
import style from "./style.css";
import Labels from "../../../labels";

export default function DogsDetection() {
  const model = useLoadDogModel();
  const [previewUrl, setPreviewUrl] = useState();
  const [predictionStatus, setPredictionStatus] = useState();

  const onLoadPreview = (e) => {
    const image = e.target.files[0];
    if (!image) return;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(image));
    setPredictionStatus("predicting");
  };

  const predict = async () => {
    const pixels = tf.browser
      .fromPixels(document.querySelector("img"))
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();
    console.log("pixels", pixels);
    const modelPrediction = await model.predict(pixels).data();
    const dataDog = Array.from(modelPrediction)
      .map((p, i) => {
        return {
          probability: p,
          className: Labels[i],
        };
      })
      .sort((a, b) => {
        return b.probability - a.probability;
      });
    setPredictionStatus(dataDog[0].className);
  };

  return (
    <>
      <Particles
        className={style.particles}
        id="tsparticles"
        params={{
          fpsLimit: 60,

          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <div className={style.home}>
        <div className="d-flex flex-column align-items-center mt-3">
          {!model ? (
            <div style={{ color: "white" }} className={style.headerchoosedog}>
              "Loading the model...
            </div>
          ) : (
            <>
              <div
                style={{ color: "white", fontSize: 30 }}
                className={style.headerchoosedog}
              >
                Choose a dog image
              </div>
              <div class="input-group mb-3" style={{ width: "55%" }}>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile02"
                    onChange={onLoadPreview}
                    accept="image/*"
                  />
                  <label class="custom-file-label" for="inputGroupFile02">
                    Choose file
                  </label>
                </div>
              </div>
              {/* <input type="file" onChange={onLoadPreview} accept="image/*" /> */}
              {previewUrl && (
                <div style={{ marginTop: 10 }} className={style.borderimage}>
                  <img
                    src={previewUrl}
                    onLoad={predict}
                    width={224}
                    height={224}
                    alt="preview"
                  />
                </div>
              )}
              {predictionStatus === "predicting" ? (
                "Predicting..."
              ) : (
                <div style={{ fontSize: 50 }} className={style.headerchoosedog}>
                  {predictionStatus}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
