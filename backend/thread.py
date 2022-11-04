# Python program to illustrate the concept
# of threading
import threading
import os

def task1():
	print("Task 1 assigned to thread: {}".format(threading.current_thread().name))
	print("ID of process running task 1: {}".format(os.getpid()))

def task2():
	print("Task 2 assigned to thread: {}".format(threading.current_thread().name))
	print("ID of process running task 2: {}".format(os.getpid()))


