import 'package:client/models/Orderable.dart';
import 'package:flutter/material.dart';

class Product implements Orderable {
    int _productIndex;
    int get getIndex => this._productIndex;

    String _name;
    String get getTitle => this._name;
    set setTitle(final String name) =>this._name = name;

    AssetImage _image;
    AssetImage get getImage => this._image;
    set setImage(final AssetImage image) => this._image = image;

    double _price;
    double get getPrice => this._price;
    set setPrice(final double price) => this._price = price;

    bool _isHidden;
    bool get getIsHidden => this._isHidden;
    set setIsHidden(final bool isHidden) => this._isHidden = isHidden;

    Product(final int productIndex, final String name, final AssetImage image,
            final double price, { bool isHidden = false }) {
        this._productIndex = productIndex;
        this._name = name;
        this._image = image;
        this._price = price;
        this._isHidden = isHidden;
    }
}