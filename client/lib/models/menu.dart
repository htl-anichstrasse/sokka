import 'package:client/models/Orderable.dart';
import 'package:client/models/MenuEntry.dart';
import 'package:flutter/material.dart';

/// -------------------------------------------------------------------------------
/// Stores all relevant data, such as the different meals and the price of a menu.
/// -------------------------------------------------------------------------------
class Menu implements Orderable {
    String _name;
    String get getName => this._name;
    set setName(final String name) => this._name = name;

    List<MenuEntry> _entries = new List<MenuEntry>();
    List<MenuEntry> get getEntries => this._entries;
    set setEntries(final List<MenuEntry> entries) => this._entries = entries;

    double _price;
    double get getPrice => this._price;
    set setPrice(final double price) => this._price = price;

    NetworkImage _image;
    NetworkImage get getImage => this._image;
    set setImage(final NetworkImage image) => this._image = image;

    bool _isHidden;
    bool get isHidden => this._isHidden;
    set setIsHidden(final bool isHidden) => this._isHidden = isHidden;

    Menu({ final String name, final List<MenuEntry> entries, 
            final NetworkImage image, final double price, bool isHidden = false }) {
        this._name = name;
        this._entries = entries;
        this._image = image;
        this._price = price;
    }
}