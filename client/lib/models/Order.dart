class Order {
    int _orderID;
    int get getOrderID => this._orderID;
    set setOrderID(final int orderID) => this._orderID = orderID;

    int _userID;
    int get getUserID => this._userID;
    set setUserID(final int userID) => this._userID = userID;

    String _timestamp;
    String get getTimestamp => this._timestamp;
    set setTimestamp(final String timestamp) => this._timestamp = timestamp;

    int _rebate;
    int get getRebate => this._rebate;
    set setRebate(final int rebate) => this._rebate = rebate;

    double _subTotal;
    double get getSubTotal => this._subTotal;
    set setSubTotal(final double subTotal) => this._subTotal = subTotal;

    double _total;
    double get getTotal => this._total;
    set setTotal(final double total) => this._total = total;

    Map<String, int> _menuOrders;
    Map<String, int> get getMenuOrders => this._menuOrders;
    set setMenuOrders(final Map<String, int> menuOrders) => this._menuOrders = menuOrders;

    Map<String, int> _productOrders;
    Map<String, int> get getProductOrders => this._productOrders;
    set setProductOrders(final Map<String, int> productOrders) => this._productOrders = productOrders;

    String _qrData;
    String get getQRData => this._qrData;
    set setQRData(final String qrData) => this._qrData = qrData;

    Order({ final int orderID, final int userID, final String timestamp, final int rebate, final double subTotal = 0, 
            final Map<String, int> menuOrders, final Map<String, int> productOrders }) {
        this._orderID = orderID;
        this._timestamp = timestamp;
        this._rebate = rebate;
        this._subTotal = subTotal;
        this._total = subTotal - (subTotal * rebate / 100);
        this._menuOrders = menuOrders;
        this._productOrders = productOrders;
        this._qrData = '$userID:$orderID';
    }
}