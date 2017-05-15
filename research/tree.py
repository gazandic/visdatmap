import json

finaldata = []
def makeTree(database, parent):
    likey =  list(database.keys())
    currentdata = []
    if len(likey) == 0:
        print(database)
    if "pop_numbers" in likey or "code" in likey:
        return [{
            'name' : database['code'],
            'population' : int(database['pop_numbers']),
            'childSum' : 1
        }]
    else:
        for key in likey:
            eachdata = {}
            eachdata['name'] = key
            if parent != '':
                eachdata['parent'] = parent
            else:
                eachdata['parent'] = 'null'
            children = makeTree(database[key], key)
            # if len(children) > 0:
            eachdata['children'] = children
            totalpopulation = 0
            totalsubsegment = 0
            for eachchildren in children:
                totalpopulation += int(eachchildren['population'])
                totalsubsegment += eachchildren['childSum']
            eachdata['population'] = totalpopulation
            eachdata['childSum'] = totalsubsegment
            currentdata.append(eachdata)
        return currentdata

with open('treebahasa.json') as json_data:
    database = json.load(json_data)
    parent = 'language'
    data = {}
    data['name'] = "language"
    data['parent'] = 'null'
    data['children'] = makeTree(database, parent)
    finaldata.append(data)
    with open('treebahasa-refined.js', 'w') as bahasajson:
        bahasajson.write('var languageTree = ')
        json.dump(finaldata, bahasajson)
