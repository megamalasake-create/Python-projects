def add(a, b):
    print("add",a+b)
    return a+b
def sub(a,b):
    print("sub",a-b)
    return a-b
def multi(a,b):
    print("multi",a*b)
    return a*b
def div(a,b):
    print("div",a/b)
    return a/b
def mod(a,b):
    print("mod",a%b)
    return a%b
a=int(input("enter first num:"))
b=int(input("enter second num:"))
add(a,b)
sub(a,b)
multi(a,b)
div(a,b)
mod(a,b)
option =input("enter your option add/sub/multi/div:")
if option==add:
    print("add=",add(a,b))
elif option==sub:
    print("sub=",sub(a,b))
elif option==multi:
    print("multi=",multi(a,b))
elif option==div:
    print("div=",div(a,b))
elif option==mod:
    print("mod=",mod(a,b))
    if b != 0:
        print("mod=", mod(a, b))
else:
    print("Cannot divide by zero")

# print("Helloworld")