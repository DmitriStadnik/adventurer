import React, {useState} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router";
import {noise} from "../../utils/perlin";

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

const generateNoiseArr = (width, height) => {
  noise.seed(Math.random());
  let arr = [];

  for (let x = 0; x < height; x++) {
    arr.push([]);
    for (let y = 0; y < width; y++) {

      let value = noise.simplex3(x / 35, y / 35, 50);

      arr[x].push(convertValue(Number(value), -1, 1, -5, 6).toFixed(1));
    }
  }

  return arr;
}

const Adventure = () => {
  const [noiseArr] = useState(generateNoiseArr(400, 400));
  return (
    <Wrapper>
      {noiseArr && noiseArr.map((row, i) => (
        <ArrRow key={i}>
          {row && row.map((item, j) => (
            <ArrCol color={getColor(item)} key={i + '-' + j}>{''}</ArrCol>
          ))}
        </ArrRow>
      ))}
    </Wrapper>
  )
}

export default withRouter(Adventure);