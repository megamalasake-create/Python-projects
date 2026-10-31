balance=10000
def check_balance():
    print(f"Your current balance is: {balance}")
def deposit(amount):
    global balance
    if amount > 0:
        balance += amount
        print(f"Deposited: {amount}. New balance: {balance}")
    else:
        print("Deposit amount must be morethan 0.")
def withdraw(amount):
    global balance
    if amount>0:
        if amount<=balance:
            balance-=amount
            print(f"Withdrew: {amount}. New balance: {balance}")
        else:
            print("Insufficient funds.")
def show_menu():
    print("\n")
    print("Welcome to the Bank")
    print("1. Check Balance")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Exit")

while True:
    show_menu()
    option = int(input("Choose an option: "))
    if option==1:
        check_balance()
    elif option==2:
        amount = float(input("Enter amount to deposit: "))
        deposit(amount)
    elif option==3:
        amount = float(input("Enter amount to withdraw: "))
        withdraw(amount)
    elif option==4:
        print("Thank you for using the Bank. Goodbye!")
        break
    else:
        print("Invalid option. Please try again.")