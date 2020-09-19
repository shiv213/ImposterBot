from tkinter import *

root = Tk()
root.title("Test Window")

# Setup window widgets and place on window
l1 = Label(root, text='Hello World!', font=("Verdana", 18))
l2 = Label(root, text='Hello World!', font=("Times New Roman", 9))
b1 = Button(root, text='Button 1', font=("Verdana", 12), state=DISABLED)
b1.pack()
b1.place(x=220, y=180)

l1.pack()
l1.place(x=170, y=10)
l2.place(x=200, y=60)

root.mainloop()