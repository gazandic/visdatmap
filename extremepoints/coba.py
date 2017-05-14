import json
import re
def openingText(txtFile):
    with open(txtFile+'.txt') as txt_data:
        finaldata = {}
        i = 0
        regionString = ''
        for line in txt_data:
            getRegion = re.compile(r'\+(.*)', flags=re.IGNORECASE)
            region = getRegion.findall(line)
            if not region:
                getId = re.compile(r'(.*)#', flags=re.IGNORECASE)
                getList = re.compile(r'#(.*)', flags=re.IGNORECASE)
                # getList = re.compile(r'#((.*),)', flags=re.IGNORECASE)
                _id = getId.findall(line)[0]
                # lastHasil = getLast.findall(line)[0]
                listOfHasil = []
                gasil = str(getList.findall(line)[0])
                print(gasil)
                listOfHasil = gasil.split(",")
                # listOfHasil.append(lastHasil)
                pulaudata = {}
                pulaudata['data'] = listOfHasil
                pulaudata['pulau'] = regionString
                finaldata[str(_id)] = pulaudata
            else:
                regionString = str(region[0])
        with open('hasil'+txtFile+'.js','w') as json_data:
            json_data.write('var index'+txtFile+' = ')
            json.dump(finaldata, json_data)

openingText('malukuPapua')
