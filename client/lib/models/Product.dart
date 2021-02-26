import 'package:client/models/Orderable.dart';
import 'package:flutter/material.dart';

class Product implements Orderable {
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

    String toString() {
        return 'Product: { name: ${this._name}, price: ${this._price}, isHidden: ${this._isHidden} }';
    }

    Product({ final String name, final double price, final NetworkImage image,
            bool isHidden = false }) {
        this._name = name;
        this._image = image;
        this._price = price;
        this._isHidden = isHidden;
    }
}