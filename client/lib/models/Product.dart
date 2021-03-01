import 'package:client/models/Orderable.dart';
import 'package:flutter/material.dart';

class Product implements Orderable {
    int _productID;
    int get getID => this._productID;
    set setID(final int id) => this._productID = id;

    String _name;
    String get getName => this._name;
    set setName(final String name) =>this._name = name;

    NetworkImage _image;
    NetworkImage get getImage => this._image;
    set setImage(final NetworkImage image) => this._image = image;

    double _price;
    double get getPrice => this._price;
    set setPrice(final double price) => this._price = price;

    bool _isHidden;
    bool get isHidden => this._isHidden;
    set setIsHidden(final bool isHidden) => this._isHidden = isHidden;

    Product({ final int productID, final String name, final double price, final NetworkImage image,
            bool isHidden = false }) {
        this._productID = productID;
        this._name = name;
        this._image = image;
        this._price = price;
        this._isHidden = isHidden;
    }
}