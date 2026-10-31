d={}

def add_contact():
    global d
    name=input("Enter name: ")
    phone=int(input("Enter phone number: "))
    if name in d:
        print("Contact already exists.")
    elif len(str(phone))!=10:
        print("Phone number must be 10 digits.")
    else:
        d[name]=phone
        print("Contact added successfully.")
def search_contact():
    global d
    name=input("Enter name to search: ")
    if name in d:
        print(f"Name: {name}, Phone: {d[name]}")
    else:
        print("Contact not found.")
def update_contact():
    global d
    name=input("Enter name to update: ")
    if name in d:
        phone=int(input("Enter new phone number: "))
        if len(str(phone))!=10:
            print("Phone number must be 10 digits.")
        else:
            d[name]=phone
            print("Contact updated successfully.")
    else:
        print("Contact not found.")

def delete_contact():
    global d
    name=input("Enter name to delete: ")
    if name in d:
        d.pop(name)
        print("Contact deleted successfully.")
    else:
        print("Contact not found.")
def view_contacts():
    global d
    if d:
        for name, phone in d.items():
            print(f"Name: {name}, Phone: {phone}")
    else:
        print("No contacts found.")

while True:
    print("\n")
    print("Contact Book Menu")
    print("1. Add Contact")
    print("2. Search Contact")
    print("3. Update Contact")
    print("4. Delete Contact")
    print("5. View All Contacts")
    print("6. Exit")
    print("\n")

    option=int(input("Choose an option: "))
    if option==1:
        add_contact()
    elif option==2:
        search_contact()
    elif option==3:
        update_contact()
    elif option==4:
        delete_contact()
    elif option==5:
        view_contacts()
    elif option==6:
        print("Exiting...")
        break
    else:
        print("Invalid option. Please try again.")


# add_contact()
# print(d)
# print('\n')
# search_contact()
# print(d)
# print('\n')
# update_contact()
# print(d)
# print('\n')
# delete_contact()
# print(d)
# print('\n')