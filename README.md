# MandalaMaker

DESCRIPTION
This application shows the user a Canvas, where he can draw Mandalas: 
The user can randomly draw somewhere on the canvas by clicking and holding the mouse down while moving. 

There is a middlepoint, where the drawing gets mirrored.
In order to replicate the drawing multiple times at the right angle,
first the Position of the mouse has to be translated from the coordinates in the canvas to the coordination relative to the middlepoint. 
This is done by calculating the angle between 12 Oclock and the mouseposition.
Because of the periodic nature of the Sinus curve, there are 4 different calculations, depending on the relative Positioning.
With adding the angle (360°/numbers of desired mirrorings) now the next mirroring line can be drawn.

![](mandalaexample.gif)
![](mandalaexample2.gif)

FUTURE ADDITIONS
-Adding a Button to change the numbers of mirrorings

-Adding grid to support the drawing process

-let the user pick, where the middlepoint should be instead of fixed

-Adding a Colorpicker Plugin

-Adding slider to change the linewidth

-Adding the possibility to erase a line

-better Design
