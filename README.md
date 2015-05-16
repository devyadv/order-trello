# order-trello
Displays and  supports drag and drop for  list of orders.Order lists are sorted on the basis of their priority.
##installation instructions :
Clone the repo into your web directory using the following command: git clone
https://github.com/devyadv/order-trello.git 
##How it works
It uses angular-drag-drop-lists directive to drag and drop particular order from tray of one delivery boy to another.
Upon completion of drop dropCallback function is called where the desired post call can be placed to send the latest order list to server.
Also another get call can be made on clicking the plus sign present in each order row.This call will fetch the details of a particular order
using its order id.


