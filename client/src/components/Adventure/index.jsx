import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router";
import {noise} from "../../utils/perlin";
// import {PerlinNoise2} from "../../utils/perlin/perlin";
import Perlin from "../../utils/perlin/perlin";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArrRow = styled.div`
  width: 100%;
  height: 2px;
`;

const ArrCol = styled.span`
  width: 2px;
  height: 100%;
  margin: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${({color}) => color ? color : 'white'};
  &:hover {
    opacity: 0.5;
  }
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 800px;
  border: 5px solid black;
  overflow: scroll;
`;

const Canvas = styled.canvas`
  width: 3000px;
  height: 3000px;
`;

const getColor = (value) => {
  switch (true) {
    case value < -4:
      return '#1976D2';
    case value < -3 && value >= -4:
      return '#1E88E5';
    case value < -2 && value >= -3:
      return '#03A9F4';
    case value < -1 && value >= -2:
      return '#26C6DA';
    case value < 0 && value >= -1:
      return '#FFF176';
    case value < 1 && value >= 0:
      return '#D4E157';
    case value < 2 && value >= 1:
      return '#C0CA33';
    case value < 3 && value >= 2:
      return '#AFB42B';
    case value < 4 && value >= 3:
      return '#9E9D24';
    case value < 5 && value >= 4:
      return '#827717';
    case value < 6 && value >= 5:
      return '#795548';
    case value >= 6:
      return '#6D4C41';
  }
}

const getMiddlePoint = (min, max) => {
  return (min + max) / 2;
}

const convertValue = (value, min, max, minNext, maxNext) => {
  const middlePoint = getMiddlePoint(min, max);
  const middlePointNext = getMiddlePoint(minNext, maxNext);

  const percentage = Math.abs(value) / max;

  const dif = (percentage * (maxNext - middlePointNext));

  if (value === middlePoint) {
    return middlePointNext;
  } else if (value > middlePoint) {
    return middlePointNext + dif;
  } else {
    return middlePointNext - dif;
  }
}

const generateNoiseArr = (width, height, persistence, octaves) => {
  let arr = [];

  const perlin = new Perlin(0);

  for (let x = 0; x < height; x++) {
    arr.push([]);
    for (let y = 0; y < width; y++) {
      let value = perlin.Noise2D(x / 45, y / 45, octaves, persistence);

      arr[x].push(convertValue(Number(value), -1, 1, -5, 6).toFixed(1));
    }
  }

  return arr;
}

const Adventure = () => {
  const mainCanvas = React.createRef();
  const [noiseArr] = useState(generateNoiseArr(500, 500, 0.75, 3));

  console.log(noiseArr)

  useEffect(() => {
    const tileSize = 1;
    const canvas = mainCanvas.current;
    const ctx = canvas.getContext('2d');

    noiseArr.map((row, i) => {
      row.map((item, j) => {
        ctx.fillStyle = getColor(item);
        ctx.fillRect(tileSize * j, tileSize * i, tileSize, tileSize);
      })
    })


  }, [noiseArr])
  return (
    <Wrapper>
      <CanvasWrapper>
        <Canvas ref={mainCanvas} />
      </CanvasWrapper>
    </Wrapper>
  )
}

export default withRouter(Adventure);