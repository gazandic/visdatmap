import json

def merge_two_dicts(x, y):
    z = x.copy()
    
    # print(z[list(z.keys())[0]])
    z.update(y)
    return z

finaldata = {}
with open('bahasa.json') as json_data:
    database = json.load(json_data)
    for data in database:
        s = data['name']
        li = list(s)
        n = len(li) - 1
        before = ''
        temp = {}
        while (n >= 0):
            lol = {}
            ss = li[n]
            if before != '':
                lol[ss] = temp.copy()
                temp.pop(before, None)
                temp = lol.copy()
            else:
                lol[ss] = data
                temp = lol.copy()
            before = ss
            n -= 1
        finaldata = merge_two_dicts(finaldata, temp)

        # alternate = data['alt_name']
        #
        # listalternate = str(alternate).split(", ")
        # for alter in listalternate:
        #     finaldata[alter] = data
        # finaldata[s] = data

    with open('bahasaindexedname.js', 'w') as bahasajson:
        bahasajson.write('var indexnama = ')
        json.dump(finaldata, bahasajson)
