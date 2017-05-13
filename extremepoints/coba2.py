import json

finaldata = {}
with open('bahasa.json') as json_data:
    database = json.load(json_data)
    for data in database:
        s = data['code']
        finaldata[s] = data

    with open('bahasaindexed.json', 'w') as bahasajson:
        json.dump(finaldata, bahasajson)
# s = 'putoh'
