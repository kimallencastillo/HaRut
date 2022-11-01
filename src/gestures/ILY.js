// Import independancies
//import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';
import * as fp from "fingerpose";

// Define Gesture Description
export const ilyGesture = new fp.GestureDescription('i_love_you');


ilyGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
ilyGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
ilyGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

ilyGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
ilyGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
ilyGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
ilyGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

ilyGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl);
ilyGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);
ilyGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpLeft, 1.0);
ilyGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpRight, 1.0);


/*
// Thumb
ilyGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ilyGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
ilyGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index 

ilyGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ilyGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);
*/
// Pinky
/*
ilyGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
ilyGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25);
*/
//for (let finger of [Finger.Middle, Finger.Ring]) {

for (let finger of [fp.Finger.Middle, fp.Finger.Ring]) {
    ilyGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    //ilyGesture.addCurl(finger, FingerCurl.FullCurl, .75);
    //ilyGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export default ilyGesture;