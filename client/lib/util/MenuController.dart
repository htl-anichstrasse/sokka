import 'package:client/models/Menu.dart';

class MenuController {
    static MenuController _instance = new MenuController.internal();
    factory MenuController() => _instance;
    
    List<Menu> _menus = new List<Menu>();

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

    MenuController.internal();
}
