# import the necessary packages
import numpy as np
import argparse
import imutils
import cv2
import json
from random import randint
from ImageProcessor import ImageProcessor
from PIL import Image

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", help = "path to the image")
args = vars(ap.parse_args())

# 7.758906 Latitude,  -10.939120 Latitude, 94.876212 Longitude , 140.954585 Longitude
minLong = 94.876212 - 0.03
maxLong = 140.954585 + 0.13
longRange = maxLong - minLong
minLat = 7.758906 - 0.05
maxLat = -10.939120 - 0.26
latRange = maxLat - minLat
# load the image
image = cv2.imread(args["image"])
height, width, channels = image.shape
imagefolder = "image/"
textfolder = "text/"
boundaries = [
	([0, 255, 255],[0, 255, 255]), #1
	([122, 245, 252],[122, 245, 252]), #2
	([164, 160, 160],[164, 160, 160]), #3
	([254, 160, 240],[254, 160, 240]), #4
	([64, 224, 255],[64, 224, 255]), #5
	([255, 153, 0],[255, 153, 0]), #6
	([255, 255, 153],[255, 255, 153]), #7
	([192, 64, 64],[192, 64, 64]), #8
	([64, 64, 64],[64, 64, 64]), #9
	([128, 64, 128],[128, 64, 128]), #10
	([64, 0, 128],[64, 0, 128]), #11
	([0, 160, 224],[0, 160, 224]), #12
	([192, 0, 128],[192, 0, 128]), #13
	([64, 160, 160],[64, 160, 160]), #14
	([0, 64, 128],[0, 64, 128]), #15
	([0, 0, 64],[0, 0, 64]), #16
	# ([255, 255, 255],[255, 255, 255]), #17
	([204, 102, 102],[204, 102, 102]), #18
	([0, 192, 192],[0, 192, 192]), #19
	([192, 192, 128],[192, 192, 128]), #20
	([51, 102, 204],[51, 102, 204]), #21
	([255, 204, 153],[255, 204, 153]), #22
	([0, 0, 255],[0, 0, 255]), #23
	([0, 128, 255],[0, 128, 255]), #24
	([64, 192, 255],[64, 192, 255]), #25
	([0, 0, 192],[0, 0, 192]), #26
	([255, 64, 0],[255, 64, 0]), #27
	([65, 1, 130],[65, 1, 130]), #28
	([204, 204, 0],[204, 204, 0]), #29
	([128, 128, 128],[128, 128, 128]), #30
	([0, 128, 224],[0, 128, 224]), #31
	([0, 224, 0],[0, 224, 0]), #32
	([192, 160, 0],[192, 160, 0]), #33
	([64, 224, 64],[64, 224, 64]), #34
	([0, 51, 153],[0, 51, 153]), #35
	([192, 192, 0],[192, 192, 0]), #36
	([0, 64, 192],[0, 64, 192]), #37
	([0, 255, 192],[0, 255, 192]), #38
	([255, 153, 102],[255, 153, 102]), #39
	([204, 153, 0],[204, 153, 0]), #40
	([204, 255, 153],[204, 255, 153]), #41
	([255, 153, 153],[255, 153, 153]), #42
	([64, 255, 255],[64, 255, 255]), #43
	([19, 233, 238],[19, 233, 238]), #44
	([102, 102, 204],[102, 102, 204]), #45
	([255, 102, 0],[255, 102, 0]), #46
	([255, 161, 161],[255, 161, 161]), #47
	([0, 51, 102],[0, 51, 102]), #48
	([192, 192, 192],[192, 192, 192]), #49
	([192, 160, 255],[192, 160, 255]), #50
	([255, 204, 0],[255, 204, 0]), #51
	([64, 255, 64],[64, 255, 64]), #52
	([255, 192, 255],[255, 192, 255]), #53
	([64, 192, 128],[64, 192, 128]), #54
	([64, 192, 0],[64, 192, 0]), #55
	([0, 0, 128],[0, 0, 128]), #56
	# ([0, 0, 0],[0, 0, 0]), #57
	([64, 0, 192],[64, 0, 192]), #58
	([192, 0, 192],[192, 0, 192]), #59
	([64, 128, 64],[64, 128, 64]), #60
	([193, 193, 129],[193, 193, 129]), #61
	([204, 255, 51],[204, 255, 51]), #62
	([192, 255, 160],[192, 255, 160]), #63
	([64, 192, 64],[64, 192, 64]), #64
	([0, 128, 128],[0, 128, 128]), #65
	([192, 0, 255],[192, 0, 255]), #66
	([255, 255, 102],[255, 255, 102]), #67
	([64, 128, 255],[64, 128, 255]), #68
	([255, 64, 64],[255, 64, 64]), #69
	([189, 255, 255],[189, 255, 255]), #70
	([224, 224, 224],[224, 224, 224]), #71
	([128, 224, 192],[128, 224, 192]), #72
	([0, 128, 160],[0, 128, 160]), #73
	([192, 160, 192],[192, 160, 192]), #74
	([128, 0, 160],[128, 0, 160]), #75
	([64, 192, 160],[64, 192, 160]), #76
	([192, 128, 64],[192, 128, 64]), #77
	([96, 96, 96],[96, 96, 96]), #78
	([192, 160, 64],[192, 160, 64]), #79
	([192, 255, 64],[192, 255, 64]), #80
	([0, 224, 224],[0, 224, 224]), #81
]

# loop over the boundaries
i = 0
lirow = []
features = []
allstart = "var statesData = {\"type\":\"FeatureCollection\",\"features\":"
IP = ImageProcessor()
for (lower, upper) in boundaries:
	i = i + 1
	# creat e NumPy arrays from the boundaries
	lower = np.array(lower, dtype = "uint8")
	upper = np.array(upper, dtype = "uint8")
	b = str(hex(lower[0])).replace('0x','')
	if (b=='0'): b = '00'
	g = str(hex(lower[1])).replace('0x','')
	if (g=='0'): g = '00'
	r = str(hex(lower[2])).replace('0x','')
	if (r=='0'): r = '00'
	hexa = '#'+r+g+b
	# find the colors within the specified boundaries and apply
	# the mask
	mask = cv2.inRange(image, lower, upper)
	output = cv2.bitwise_and(image, image, mask = mask)
	# cv2.imwrite(imagefolder+str(i)+".png", output)

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

	# 7.758906 Latitude,  -10.939120 Latitude, 94.876212 Longitude , 140.954585 Longitude
	j = 0
	li = []
	idx = str(i)
	density = str(randint(0,100))
	for shape in cnts:
		j += 1
		ji = str(j)
		name = idx+" "+ji
		start = "{\"type\":\"Feature\",\"id\":\""+name+"\",\"properties\":{\"name\":\""+name+"\",\"hexa\":\""+hexa+"\",\"density\":"+density+"},\"geometry\":{\"type\":\"Polygon\",\"coordinates\":["
		lis = []
		# print(j)
		maxleft = width
		maxright = 0
		maxbot = 0
		maxtop = height
		for point in shape:
			if point[0][0] > width-650 and point[0][1] < 600:
				continue
			lati = point[0][1]
			longi = point[0][0]
			if (longi < maxleft): maxleft = longi
			if (longi > maxright): maxright = longi
			if (lati < maxtop): maxtop = lati
			if (lati > maxbot): maxbot = lati
			lati = (float(point[0][1]))
			longi = (float(point[0][0]))
			latitude =  minLat + (lati * latRange / height)
			longitude = minLong + (longi * longRange / width)
			xy = [longitude, latitude]
			lis.append(xy)

		# li.append(lis)
		row = str(start+str(lis)+"]}}")
		coordinates = lis
		lirow.append(row)
		data = {}
		# if (maxtop < height or maxbot > 0) and (maxleft < width or maxright > 0):
		# 	cropped = output[maxtop-30:maxbot+30,maxleft-30:maxright+30]
		# 	crop = Image.fromarray(cropped.astype('uint8'), 'RGB')
		# 	crop.save('lol'+name+'.png')
		# 	i = 3
		# 	found = False
		# 	while i < 3.18 and not found:
		# 		i+=0.01
		# 		s = IP.process_image(crop,i)
		# 		listofstr = s.split()
		# 		print(s)
		# 		if listofstr == []:
		# 			break
		# 		for stri in listofstr:
		# 			st = ' '.join(word[0].upper() + word[1:] for word in stri.split())
		# 			if (s in databahasa):
		# 			    name = str(databahasa[s]['name'])
		# 			    data = databahasa[s]
		# 			    found = True
		# 			    break
		startjson = {"type" : "Feature", "id":name, "properties":{"name": name, "hexa":hexa, "density":density},"geometry":{"type":"Polygon","coordinates":coordinates}}
		features.append(startjson)
#
lir = str(lirow).replace('\'','')
files = allstart+lir+"};"
file = open("indonesianstate.js", 'w')
file.write(files)
file.close()

# allstart2 = {"type":"FeatureCollection","features":features}
# with open('indonesianstate2.js', 'w') as outfile:
# 	outfile.write("var statesData = ")
# 	json.dump(allstart2, outfile)
