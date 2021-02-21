import 'package:client/models/Orderable.dart';
import 'package:flutter/material.dart';

/// -------------------------------------------------------------------------------
/// Stores all relevant data, such as the different meals and the price of a menu.
/// -------------------------------------------------------------------------------
class Menu implements Orderable {
    String _name;
    String get getName => this._name;
    set setName(final String name) => this._name = name;

    List<String> _entries = new List<String>();
    List<String> get getEntries => this._entries;
    set setEntries(final List<String> entries) => this._entries = entries;

    double _price;
    double get getPrice => this._price;
    set setPrice(final double price) => this._price = price;

    AssetImage _image;
    AssetImage get getImage => this._image;
    set setImage(final AssetImage image) => this._image = image;

    Menu(final String name, final List<String> entries, 
            final AssetImage image, final double price) {
        this._name = name;
        this._entries = entries;
        this._image = image;
        this._price = price;
    }
}