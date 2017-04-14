import numpy as np
import argparse
import imutils
import cv2
import sys

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", help = "path to the image")
args = vars(ap.parse_args())

# load the image
image = cv2.imread(args["image"])
height, width, channels = image.shape
li = []
print(width, height, channels)
base = width-600
try:
    # ball = image[0:500, base:width-1]
    # image[0:500, 0:600-1] = ball
    # cv2.imwrite("try.png", image)
    # li = set( tuple(v) for m2d in image for v in m2d )
    for x in range(base,width-1):
        for y in range(0,600):
            color = str(image[y, x])
            if not color in li:
                li.append(color)
except:
    print(sys.exc_info())
    print(li)
i = 0
for col in li:
    i += 1
    print("("+col+","+col+"), #"+str(i))
