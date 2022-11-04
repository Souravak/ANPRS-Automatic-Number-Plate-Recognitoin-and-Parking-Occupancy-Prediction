#testing file operations
import os
import fileinput
import csv
from csv import writer
from pytz import timezone 
from datetime import datetime
from datetime import date
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def test() :
    print("Success")

def checkOwner( plate_num):
    # opening a text file
    file1 = open("assets/staffs_vehicle_list.txt", "r")
    
    # read file content
    readfile = file1.read()
    
    # checking condition for string found or not
    if (plate_num + "\n") in readfile: 
        return "mace"
    else: 
        return "outsider"
    
    # closing a file
    file1.close() 

def checkEntryOrExit(plate_num):

    plate_num = plate_num + ' '
    # print("Here too")
    entry = "entry"
    exit = "exit"
    file_name = "assets/TodaysEntryExitDetails.txt"
    
    # check whether entry or exit
    file_read = open(file_name, "r+")
    # read file content
    readfile = file_read.read()
    # checking condition for num plate found or not
    if plate_num not in readfile:
        file_read.writelines(plate_num + '1' + "\n")
        file_read.close()
        return entry
    else :
        file_read.close()
        return getCountandUpdate(plate_num)

def local_store(plate_num, current_date, week_day, entry_time, exit_time, EntryOrExit, whose):
    file_name = "assets/EntryExitDetails.txt"
    
    with open(file_name, 'a') as f:
        f.writelines(''.join(str(plate_num + "\t" + current_date + "\t" + week_day + "\t" + entry_time + "\t" + exit_time + "\t" + EntryOrExit + "\t" + whose + "\n")))

def getCountandUpdate(plate_num):

    entry = "entry"
    exit = "exit"
    file_name = "assets/TodaysEntryExitDetails.txt"

    with fileinput.FileInput(file_name, inplace = True) as f:
        for line in f:
            if plate_num in line:
                count = int(line.replace(plate_num,'').replace(' ','')) + 1
                print(plate_num + str(count), end = '\n')
            else:
                print(line, end ='')
    if(count%2 == 0): return exit
    else : return entry

def get_predicted_values():
    def search(time):
        with open('assets/dataset.csv') as file_obj:
            reader_obj = csv.reader(file_obj)
            sum = 0
            count = 0
            for row in reader_obj:
                if str(row[2])[11:]==time:
                    sum += (1-(int(row[1])/int(row[0])))*100
                    count+=1
                    a = sum//count
                    a = max(0,a)
                    a = min(100,a)
                    return round(a,2)
                    break
            else:
                return 0

    l = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    res = list(map(search, l))
    res.append(max(res))
    print(res)
    return res

def clearTodaysEntryExitDetails():
    with open("assets/TodaysEntryExitDetails.txt", 'r+') as f1:
        f1.truncate(0)

def testt():
    print("Hello")
    # folder path
    # dir_path = r'assets'
    # print(os.listdir(dir_path))


def updateCSV(vehicle_count, date_and_time):
    List = ['200', vehicle_count, date_and_time]
    print(List)
    with open('assets/dataset.csv', 'a', encoding='UTF8',newline='') as f:
        writer = csv.writer(f)
        # write the header  
        writer.writerow(List)
        f.close()


