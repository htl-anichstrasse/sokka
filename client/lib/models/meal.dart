class Meal {
    int _mealIndex;
    int get getMealIndex => _mealIndex;

    String _title;
    String get getTitle => _title;
    set setTitle(final String title) => _title = title;

    double _price;
    double get getPrice => _price;
    set setPrice(final double price) => _price = price;

    Meal(final int mealIndex, final String title, final double price) {
        this._mealIndex = mealIndex;
        this._title = title;
        this._price = price;
    }
}