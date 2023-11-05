import numpy as np
import pandas as pd

def refined_arr(arr):

    arr = np.delete(arr,[0,10,11,12,13],0)
    arr = np.delete(arr,[0,1],1)

    b1=[]

    for i in arr[0]:
        if(i!=""):
            a = [i]
            b1.append(a)


    for i in range(1,len(arr)):
        for j in range(0,len(arr[i])):
            k = j//2
            if arr[i][j]!="" :
                subname = arr[i][j].split('\n')[0]
                if 'LAB' in subname:
                    section = arr[i][j].split('\n')[1]
                    if section=='(B1)':
                        b1[k].append(subname)
                else:
                    b1[k].append(subname)
                    
         
    b2=[]
    for i in arr[0]:
        if(i!=""):
            a = [i]
            b2.append(a)

    for i in range(1,len(arr)):
        for j in range(0,len(arr[i])):
            k = j//2
            if arr[i][j]!="" :
                subname = arr[i][j].split('\n')[0]
                if 'LAB' in subname:
                    section = arr[i][j].split('\n')[1]
                    if section=='(B2)':
                        b2[k].append(subname)
                else:
                    b2[k].append(subname)
    
    return b1,b2
    



