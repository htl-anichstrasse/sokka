import 'package:client/models/Orderable.dart';

/// -------------------------------------------------------------------------------
/// Stores all relevant data, such as the different meals and the price of a menu.
/// -------------------------------------------------------------------------------
class Menu implements Orderable {
    int _menuIndex;
    int get getIndex => this._menuIndex;

    String name;
    String get getTitle => this.name;
    set setTitle(final String name) => this.name = name;

    List<String> _entries = new List<String>();
    List<String> get getEntries => this._entries;
    set setEtnries(final List<String> entries) => this._entries = entries;

    double _price;
    double get getPrice => this._price;
    set setPrice(final double price) => this._price = price;

    Menu(final int menuIndex, final String name, final List<String> entries, 
            final double price) {
        this._menuIndex = menuIndex;
        this.name = name;
        this._entries = entries;
        this._price = price;
    }
}