import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as tf from "@tensorflow/tfjs";

const UseLoadDogModel = () => {
  const [state, setState] = useState("");
  useEffect(() => {
    loadModel();
  }, []);

  async function loadModel() {
    const model = await tf.loadGraphModel(`assets/model/model.json`);

    setState(model);
  }

  return state;
};

export default UseLoadDogModel;
