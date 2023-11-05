def convert_to_tab(file_path):
    import pip
    import numpy as np
    import pandas as pd
    from . import refine_arr

    def install_and_import(package):
        import importlib
        try:
            importlib.import_module(package)
        except ImportError:
            import pip
            pip.main(['install', package])
        finally:
            globals()[package] = importlib.import_module(package)
        
    def install(package):
        if hasattr(pip, 'main'):
            pip.main(['install', package])
        else:
            pip._internal.main(['install', package])


    install_and_import('camelot')

    install('PyPDF2<2.0')

    tab = camelot.read_pdf(file_path)

    tab[0].df.to_csv("file.csv")

    df = pd.read_csv("file.csv", keep_default_na=False)
  
    array = df.to_numpy()
    
    arrset = refine_arr.refined_arr(array)

    #print(array)
    return arrset

