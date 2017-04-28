import json

with open('bahasaindexed.json') as json_data2:
    jsond = json.load(json_data2)
with open('indonesianstate2.js') as json_data:
    data = json.load(json_data)
for feature in data['features']:
    s = feature['id']
    s = ' '.join(word[0].upper() + word[1:] for word in s.split())
    print(s)
    if (s in jsond):
        print(data[s])
# s = 'putoh'
