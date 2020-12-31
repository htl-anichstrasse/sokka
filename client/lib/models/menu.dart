import 'package:client/models/Product.dart';

/// -------------------------------------------------------------------------------
/// Stores all relevant data, such as the different meals and the price of a menu.
/// -------------------------------------------------------------------------------
class Menu implements Product {
    int _menuIndex;
    int get getIndex => _menuIndex;

    bool _expanded;
    bool get getExpanded => _expanded;
    set setExpanded(final bool expanded) => _expanded = expanded;

    String _title;
    String get getTitle => _title;
    set setTitle(final String title) => _title = title;

    String _appetizer;
    String get getAppetizer => _appetizer;
    set setAppetizer(final String appetizer) => _appetizer = appetizer;

    String _mainCourse;
    String get getMainCourse => _mainCourse;
    set setMainCourse(final String mainCourse) => _mainCourse = mainCourse;

    String _dessert;
    String get getDessert => _dessert;
    set setDessert(final String dessert) => _dessert = dessert;

    double _price;
    double get getPrice => _price;
    set setPrice(final double price) => _price = price;

    Menu(final int menuIndex, final bool expanded, final String title, final String appetizer, final String mainCourse, final String dessert,
            final double price) {
        this._menuIndex = menuIndex;
        this._expanded = expanded;
        this._title = title;
        this._appetizer = appetizer;
        this._mainCourse = mainCourse;
        this._dessert = dessert;
        this._price = price;
    }
}