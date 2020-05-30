export default class Perlin {
  constructor(seed = 0) {
    this.permutationTable = new Uint32Array(1024);
    this.permutationTable = window.crypto.getRandomValues(this.permutationTable) // seed?
  }

  GetPseudoRandomGradientVector (x, y) {
    let v = (((x * 1836311903) ^ (y * 2971215073) + 4807526976) & 1023).toFixed();
    v = this.permutationTable[v] & 3;

    switch (v) {
      case 0:  return [1, 0];
      case 1:  return [-1, 0];
      case 2:  return [0, 1];
      default: return [0, -1];
    }
  }

  QunticCurve (t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  };

  Lerp (a, b, t) {
    return a + (b - a) * t;
  };

  Dot (a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }

  Noise (fx, fy) {
    const left = Math.floor(fx);
    const top  = Math.floor(fy);
    let pointInQuadX = fx - left;
    let pointInQuadY = fy - top;

    const topLeftGradient     = this.GetPseudoRandomGradientVector(left, top);
    const topRightGradient    = this.GetPseudoRandomGradientVector(left + 1, top);
    const bottomLeftGradient  = this.GetPseudoRandomGradientVector(left, top + 1);
    const bottomRightGradient = this.GetPseudoRandomGradientVector(left + 1, top + 1);

    const distanceToTopLeft     = [pointInQuadX, pointInQuadY];
    const distanceToTopRight    = [pointInQuadX - 1, pointInQuadY];
    const distanceToBottomLeft  = [pointInQuadX, pointInQuadY - 1];
    const distanceToBottomRight = [pointInQuadX - 1, pointInQuadY - 1];

    const tx1 = this.Dot(distanceToTopLeft, topLeftGradient);
    const tx2 = this.Dot(distanceToTopRight, topRightGradient);
    const bx1 = this.Dot(distanceToBottomLeft, bottomLeftGradient);
    const bx2 = this.Dot(distanceToBottomRight, bottomRightGradient);

    pointInQuadX = this.QunticCurve(pointInQuadX);
    pointInQuadY = this.QunticCurve(pointInQuadY);

    const tx = this.Lerp(tx1, tx2, pointInQuadX);
    const bx = this.Lerp(bx1, bx2, pointInQuadX);

    return this.Lerp(tx, bx, pointInQuadY);
  }

  Noise2D (fx, fy, octaves, persistence = 0.5) {
    let amplitude = 1;
    let max = 0;
    let result = 0;

    while (octaves-- > 0) {
      max += amplitude;
      result += this.Noise(fx, fy) * amplitude;
      amplitude *= persistence;
      fx *= 2;
      fy *= 2;
    }

    return result / max;
  }

}

  
