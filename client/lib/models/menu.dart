import 'package:client/models/Orderable.dart';

/// -------------------------------------------------------------------------------
/// Stores all relevant data, such as the different meals and the price of a menu.
/// -------------------------------------------------------------------------------
class Menu implements Orderable {
    int _menuIndex;
    int get getIndex => this._menuIndex;

    bool _expanded;
    bool get getExpanded => this._expanded;
    set setExpanded(final bool expanded) => this._expanded = expanded;

    String name;
    String get getTitle => this.name;
    set setTitle(final String name) => this.name = name;

    String _appetizer;
    String get getAppetizer => this._appetizer;
    set setAppetizer(final String appetizer) => this._appetizer = appetizer;

    String _mainCourse;
    String get getMainCourse => this._mainCourse;
    set setMainCourse(final String mainCourse) => this._mainCourse = mainCourse;

    String _dessert;
    String get getDessert => this._dessert;
    set setDessert(final String dessert) => this._dessert = dessert;

    double _price;
    double get getPrice => this._price;
    set setPrice(final double price) => this._price = price;

    Menu(final int menuIndex, final bool expanded, final String name, final String appetizer, final String mainCourse, final String dessert,
            final double price) {
        this._menuIndex = menuIndex;
        this._expanded = expanded;
        this.name = name;
        this._appetizer = appetizer;
        this._mainCourse = mainCourse;
        this._dessert = dessert;
        this._price = price;
    }
}