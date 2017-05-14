import json

def merge_two_dicts(x, y, lis, awal):
    z = x.copy()
    l = z
    ite = 0
    prev = l
    ss = ''
    while (awal > ite):
        ss = lis[ite]
        if not l.has_key(ss):
            l = prev
            break
        else:
            ite+=1
            prev = l
            l = l[ss]
    # if ss != '':
    #     lidata = list(y.keys())
    #     if len(lidata) > 0  :
    #         first =  lidata[0]
    #         likey =  list(l.keys())
    #         prevkey =  list(prev.keys())[0]
    #         # print(l[ss])
    #         hehe = likey[len(likey)-1]
    #         lol = {}
    #         for key in likey:
    #             data1 = l[key]
    #             lol[key] = data1
    #         for key in lidata:
    #             data2 = y[key]
    #             lol[key] = data2
    #         prev[prevkey] = lol
    # else:
    l.update(y)
    return z

finaldata = {}
with open('bahasa.json') as json_data:
    database = json.load(json_data)
    for data in database:
        stri = data['classification']
        li = stri.split(",")
        lis = []
        n = len(li) - 1
        before = ''
        temp = {}
        awal = 0
        temp2 = finaldata
        while (n >= awal):
            ss = li[awal]
            if not temp2.has_key(ss):
                break
            else:
                lis.append(ss)
                temp2 = temp2[ss]
                awal += 1
        while (n >= awal):
            lol = {}
            ss = li[n]
            if before != '':
                lol[ss] = temp.copy()
                temp.pop(before, None)
                temp = lol.copy()
            else:
                lol[ss] = {'code' :data['code'], "pop_numbers": data['pop_numbers']}
                temp = lol.copy()
            before = ss
            n -= 1
        finaldata = merge_two_dicts(finaldata, temp, lis, awal)
        # alternate = data['alt_name']
        #
        # listalternate = str(alternate).split(", ")
        # for alter in listalternate:
        #     finaldata[alter] = data
        # finaldata[s] = data

    with open('treebahasa.json', 'w') as bahasajson:
        json.dump(finaldata, bahasajson)
