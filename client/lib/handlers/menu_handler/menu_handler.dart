import 'package:client/models/menu.dart';

class MenuHandler {
    static MenuHandler _instance;
    List<Menu> _menus;

    MenuHandler() {
        if (MenuHandler._instance != null) {
            throw new Exception('Handler has already been instantiated!');
        }
        _instance = this;
        this._menus = [
            new Menu(0, false, 'Veggie', 'Green salad', 'Spring rolls', 'Vanilla muffin', 4.50),
            new Menu(1, false, 'Meat Love', 'Chicken soup with croutons', 'Meat loaf', 'Chocolate molten lava cake', 5.50),
        ];
    }

    static MenuHandler getInstance() {
        if (MenuHandler._instance != null) {
            return MenuHandler._instance;
        }
        MenuHandler._instance = new MenuHandler();
        return MenuHandler._instance;
    }

    List<Menu> getMenus() {
        return this._menus;
    }

    /// Appends a single menu to the hopper
    void appendToMenus(final Menu menu) {
        this._menus.add(menu);
    }

    /// Appends an iterable to the hopper
    void appendIterableToMenus(final List<Menu> menus) {
        this._menus.addAll(menus);
    }

    /// Remove menu at passed index
    void removeFromMenusAt(final int index) {
        this._menus.removeAt(index);
    }

    /// Remove first menu of the hopper
    void removeFirstFromMenus() {
        this._menus.removeAt(0);
    }    

    /// remove last menu of the hopper
    void removeLastFromMenus() {
        this._menus.removeLast();
    }

    /// Clear the entire hopper
    void resetMenus() {
        this._menus.clear();
    }
}
