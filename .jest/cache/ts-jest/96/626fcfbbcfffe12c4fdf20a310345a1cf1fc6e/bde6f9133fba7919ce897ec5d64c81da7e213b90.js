"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_navigation_1 = require("react-navigation");
const Home_1 = __importDefault(require("./screens/Home"));
const Details_1 = __importDefault(require("./screens/Details"));
const AppNavigator = react_navigation_1.createStackNavigator({
    Home: { screen: Home_1.default },
    Details: { screen: Details_1.default }
}, { initialRouteName: 'Home' });
const AppContainer = react_navigation_1.createAppContainer(AppNavigator);
class App extends react_1.default.Component {
    render() {
        return react_1.default.createElement(AppContainer, null);
    }
}
exports.default = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL05laWxEYWZ0YXJ5L1JOVHlwZXNjcmlwdC9BcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLHVEQUE0RTtBQUM1RSwwREFBd0M7QUFDeEMsZ0VBQXdDO0FBRXhDLE1BQU0sWUFBWSxHQUFHLHVDQUFvQixDQUN2QztJQUNFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFVLEVBQUU7SUFDNUIsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLGlCQUFPLEVBQUU7Q0FDN0IsRUFDRCxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxDQUM3QixDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQUcscUNBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFdEQsTUFBcUIsR0FBSSxTQUFRLGVBQUssQ0FBQyxTQUFTO0lBQzlDLE1BQU07UUFDSixPQUFPLDhCQUFDLFlBQVksT0FBRyxDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQUpELHNCQUlDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9OZWlsRGFmdGFyeS9STlR5cGVzY3JpcHQvQXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVmlldywgVGV4dCB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgeyBjcmVhdGVTdGFja05hdmlnYXRvciwgY3JlYXRlQXBwQ29udGFpbmVyIH0gZnJvbSAncmVhY3QtbmF2aWdhdGlvbic7XG5pbXBvcnQgSG9tZVNjcmVlbiBmcm9tICcuL3NjcmVlbnMvSG9tZSc7XG5pbXBvcnQgRGV0YWlscyBmcm9tICcuL3NjcmVlbnMvRGV0YWlscyc7XG5cbmNvbnN0IEFwcE5hdmlnYXRvciA9IGNyZWF0ZVN0YWNrTmF2aWdhdG9yKFxuICB7XG4gICAgSG9tZTogeyBzY3JlZW46IEhvbWVTY3JlZW4gfSxcbiAgICBEZXRhaWxzOiB7IHNjcmVlbjogRGV0YWlscyB9XG4gIH0sXG4gIHsgaW5pdGlhbFJvdXRlTmFtZTogJ0hvbWUnIH1cbik7XG5cbmNvbnN0IEFwcENvbnRhaW5lciA9IGNyZWF0ZUFwcENvbnRhaW5lcihBcHBOYXZpZ2F0b3IpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxBcHBDb250YWluZXIgLz47XG4gIH1cbn1cbiJdLCJ2ZXJzaW9uIjozfQ==