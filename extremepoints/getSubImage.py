# import the necessary packages
import numpy as np
import argparse
import imutils
import cv2

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", help = "path to the image")
args = vars(ap.parse_args())

# load the image
image = cv2.imread(args["image"])
height, width, channels = image.shape
imagefolder = "image/"
textfolder = "text/"
boundaries = [
	# ([255, 255, 255],[255, 255, 255]),#1
	# ([0, 0, 0],[0, 0, 0]),#2
	([224, 224, 224],[224, 224, 224]),#3
	([193, 193, 129],[193, 193, 129]),#4
	([204, 255, 51],[204, 255, 51]),#5
	([255, 64, 0],[255, 64, 0]),#6
	([204, 255, 153],[204, 255, 153]),#7
	([255, 204, 153],[255, 204, 153]),#8
	([192, 128, 64],[192, 128, 64]),#9
	([192, 160, 64],[192, 160, 64]),#10
	([192, 64, 64],[192, 64, 64]),#11
	([255, 153, 0],[255, 153, 0]),#12
	([255, 153, 102],[255, 153, 102]),#13
	([255, 102, 0],[255, 102, 0]),#14
	([255, 255, 102],[255, 255, 102]),#15
	([255, 153, 153],[255, 153, 153]),#16
	([255, 204, 0],[255, 204, 0]),#17
	([ 0, 128, 224],[ 0, 128, 224]),#18
	([ 64, 192, 0],[ 64, 192, 0]),#19
	([128, 224, 192],[128, 224, 192]),#20
	([ 64, 192, 160],[ 64, 192, 160]),#21
	([204, 102, 102],[204, 102, 102]),#22
	([192, 255, 64],[192, 255, 64]),#23
	([192, 255, 160],[192, 255, 160]),#24
	([ 0, 224, 0],[ 0, 224, 0]),#25
	([ 0, 255, 192],[ 0, 255, 192]),#26
	([ 64, 192, 128],[ 64, 192, 128]),#27
	([ 64, 128, 64],[ 64, 128, 64]),#28
	([192, 0, 128],[192, 0, 128]),#29
	([204, 204, 0],[204, 204, 0]),#30
	([204, 153, 0],[204, 153, 0]),#31
	([ 0, 51, 102],[ 0, 51, 102]),#32
	([ 51, 102, 204],[ 51, 102, 204]),#33
	([ 64, 255, 255],[ 64, 255, 255]),#34
	([ 0, 192, 192],[ 0, 192, 192]),#35
	([ 64, 160, 160],[ 64, 160, 160]),#36
	([128, 128, 128],[128, 128, 128]),#37
	([128, 0, 160],[128, 0, 160]),#38
	([192, 160, 255],[192, 160, 255]),#39
	([ 0, 0, 255],[ 0, 0, 255]),#40
	([ 0, 51, 153],[ 0, 51, 153]),#41
	([189, 255, 255],[189, 255, 255]),#42
	([122, 245, 252],[122, 245, 252]),#43
	([ 64, 192, 255],[ 64, 192, 255]),#44
	([96, 96, 96],[96, 96, 96]),#45
	([192, 0, 255],[192, 0, 255]),#46
	([192, 0, 192],[192, 0, 192]),#47
	([ 64, 224, 255],[ 64, 224, 255]),#48
	([164, 160, 160],[164, 160, 160]),#49
	([128, 64, 128],[128, 64, 128]),#50
	([ 64, 0, 128],[ 64, 0, 128]),#51
	([ 65, 1, 130],[ 65, 1, 130]),#52
	([254, 160, 240],[254, 160, 240]),#53
	([102, 102, 204],[102, 102, 204]),#54
]

# loop over the boundaries
i = 0
for (lower, upper) in boundaries:
	i = i + 1
	# creat e NumPy arrays from the boundaries
	lower = np.array(lower, dtype = "uint8")
	upper = np.array(upper, dtype = "uint8")

	# find the colors within the specified boundaries and apply
	# the mask
	mask = cv2.inRange(image, lower, upper)
	output = cv2.bitwise_and(image, image, mask = mask)
	cv2.imwrite(imagefolder+str(i)+".png", output)

	gray = cv2.cvtColor(output, cv2.COLOR_BGR2GRAY)
	gray = cv2.GaussianBlur(gray, (5, 5), 0)

	# threshold the image, then perform a series of erosions +
	# dilations to remove any small regions of noise
	thresh = cv2.threshold(gray, 45, 255, cv2.THRESH_BINARY)[1]
	thresh = cv2.erode(thresh, None, iterations=2)
	thresh = cv2.dilate(thresh, None, iterations=2)

	# find contours in thresholded image, then grab the largest
	# one
	cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
	cnts = cnts[0] if imutils.is_cv2() else cnts[1]
	file = open(textfolder+str(i)+".txt", 'w')
	file.write(str(cnts))
	file.close()
