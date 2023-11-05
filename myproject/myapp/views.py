from django.shortcuts import render, redirect
from .models import user_collection
import gridfs
import db
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
import os
from . import table_extraction


def upload_to_db(file_loc, file_name, fs, name, roll, branch, division, password):
    with open(file_loc, "rb") as file_data:
        data = file_data.read()
    
    fs.put(data, filename=file_name, name=name, roll=roll, branch=branch, division=division, password=password)
    return

# def dowload_from_db(download_loc, db, fs, file_name):
#     data = db.uploads.files.find_one({"filename":file_name})
#     fs_id = data['_id']
#     out_data = fs.get(fs_id).read()
    
#     with open(download_loc, "wb") as output:
#         output.write(out_data)
     

def index(req):
    roll = req.COOKIES.get('roll')
    if roll==None:
        return redirect('/signin')
    database = db.db
    user = database.uploads.files.find_one({"roll" : roll})
    name = user['name']
    #return render(req, 'index.html', {'name' : name})
    return render(req, 'home_1.html', {'name' : name})

def signup(req):
    if req.method == "POST":
        database = db.db
        fs = gridfs.GridFS(database, collection="uploads")
        myfile = req.FILES['files']   
        fss = FileSystemStorage()
        file_name = fss.save(myfile.name, myfile)
        file_loc = fss.url(file_name)
        dir = os.getcwd()
        full_file_loc = dir + file_loc
        name = req.POST['fname']
        roll = req.POST['roll']
        user = database.uploads.files.find_one({"roll" : roll})
        if user:
            return render(req,'signup.html', {"message" : "User already exists"})
      
        branch = req.POST['branch']
        division = req.POST['division']
        password = req.POST['pass']
    
        arrset = table_extraction.convert_to_tab(full_file_loc)

        tt=arrset[0]
        
        if division=="2":
            tt=arrset[1]
        
        print(tt)
        
        
        
        upload_to_db(full_file_loc, file_name, fs,name,roll,branch,division,password)
        
        return render(req, 'signup.html', {"message" : "Account created, you can now signin in to your account"})
        
    return render(req, "signup.html")


# def showtt(req):
#     database = db.db
#     data = database.uploads.files.find_one({"roll":"UI21CS41"})
#     #print(data['timetable'])
#     data_tt = np.fromstring(data['timetable'],dtype=int)
#     print(data_tt)
#     #return render(req, "tp.html", {"file_name" : data_tt[2][3]})
#     return render(req, "tp.html")

    
def signin(req):
    if req.method == "POST":
        roll = req.POST['fname']
        passw = req.POST['pass']
        database = db.db
        data = database.uploads.files.find_one({'roll' : roll})
        if data['password'] == passw:
            response = redirect('/')
            response.set_cookie('roll' , roll, max_age=100)
            return response
            #return render(req, 'index.html' , {'name' : data['name']})
        else:
            return render(req,'signin.html', {"message" : "invalid credentials"})
        
    return render(req, 'signin.html')


    
def signout(req):
    response = redirect('/signin')
    response.delete_cookie('roll')
    return response