import 'package:client/models/Menu.dart';
import 'package:client/models/Product.dart';
import 'package:qr_flutter/qr_flutter.dart';

class Order {
    int _id;
    int get getID => this._id;
    set setID(final int id) => this._id = id;

    DateTime _timestamp;
    DateTime get getTimestamp => this._timestamp;
    set setTimestamp(final DateTime timestamp) => this._timestamp = timestamp;

    List<Menu> _menuOrders;
    List<Menu> get getMenuOrders => this._menuOrders;
    set setMenuOrders(final List<Menu> menuOrders) => this._menuOrders = menuOrders;

    List<Product> _productOrders;
    List<Product> get getProductOrders => this._productOrders;
    set setProductOrders(final List<Product> productOrders) => this._productOrders = productOrders;

    QrImage _qrImage;
    QrImage get getQRImage => this._qrImage;
    set setQRImage(final QrImage qrImage) => this._qrImage = qrImage;

    Order({ final int id, final DateTime timestamp, final List<Menu> menuOrders,
            final List<Product> productOrders, final QrImage qrImage }) {
        this._id = id;
        this._timestamp = timestamp;
        this._menuOrders = menuOrders;
        this._productOrders = productOrders;
        this._qrImage = qrImage;
    }
}