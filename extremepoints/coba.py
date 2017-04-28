import json
with open('bahasa.json') as json_data:
    data = json.load(json_data)
    dajs = {}
    for d in data:
        dajs[d['name']] = d
with open('bahasaindexed.json', 'w') as outfile:
    json.dump(dajs, outfile)
# print(dajs)
