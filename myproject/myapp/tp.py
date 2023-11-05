import numpy as np
import pandas as pd

def fun():
    df = pd.read_csv("file.csv", keep_default_na=False)

    arr = df.to_numpy()
    return arr



