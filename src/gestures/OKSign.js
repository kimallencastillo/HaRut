import * as fp from "fingerpose";

const OKSignGesture = new fp.GestureDescription('ok_sign');

OKSignGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl);
OKSignGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.9);
OKSignGesture.addDirection(
    fp.Finger.Thumb,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );
  OKSignGesture.addDirection(
    fp.Finger.Thumb,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );
  //okSign index
  OKSignGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl);
  OKSignGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.VerticalDown,
    0.9
  );
  OKSignGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );
  OKSignGesture.addDirection(
    fp.Finger.Index,
    fp.FingerDirection.DiagonalUpLeft,
    1.0
  );
  //okSign middle
  OKSignGesture.addDirection(fp.Finger.Middle, fp.FingerCurl.NoCurl);
  OKSignGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.VerticalUp,
    1.0
  );
  OKSignGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );
  OKSignGesture.addDirection(
    fp.Finger.Middle,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );
  //okaySign ring
  OKSignGesture.addDirection(fp.Finger.Ring, fp.FingerCurl.NoCurl);
  OKSignGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);
  OKSignGesture.addDirection(
    fp.Finger.Ring,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );
  OKSignGesture.addDirection(
    fp.Finger.Ring,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );
  //okaySign pinky
  OKSignGesture.addDirection(fp.Finger.Pinky, fp.FingerCurl.NoCurl);
  OKSignGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);
  OKSignGesture.addDirection(
    fp.Finger.Pinky,
    fp.FingerDirection.DiagonalUpLeft,
    0.9
  );
  OKSignGesture.addDirection(
    fp.Finger.Pinky,
    fp.FingerDirection.DiagonalUpRight,
    0.9
  );

export default OKSignGesture;