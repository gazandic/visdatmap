import json

finaldata = []
def makeTree(database, parent, depth):
    likey =  list(database.keys())
    currentdata = []
    if len(likey) == 0:
        print(database)
    if "pop_numbers" in likey or "code" in likey:
        return [{
            'name' : database['code'],
            'population' : int(database['pop_numbers']),
            'childSum' : 1,
            'depth' : depth
        }]
    else:
        for key in likey:
            eachdata = {}
            eachdata['name'] = key
            if parent != '':
                eachdata['parent'] = parent
            else:
                eachdata['parent'] = 'null'
            children = makeTree(database[key], key, depth+1)
            # if len(children) > 0:
            eachdata['children'] = children
            totalpopulation = 0
            totalsubsegment = 0
            for eachchildren in children:
                totalpopulation += int(eachchildren['population'])
                totalsubsegment += eachchildren['childSum']
            eachdata['population'] = totalpopulation
            eachdata['childSum'] = totalsubsegment
            eachdata['depth'] = depth
            currentdata.append(eachdata)
        return currentdata

with open('treebahasa.json') as json_data:
    database = json.load(json_data)
    parent = 'language'
    data = {}
    data['name'] = "language"
    data['parent'] = 'null'
    data['children'] = makeTree(database, parent, 0)
    finaldata.append(data)
    with open('treebahasav2.json', 'w') as bahasajson:
        # bahasajson.write('var languageTree = ')
        json.dump(finaldata, bahasajson)
